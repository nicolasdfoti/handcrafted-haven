// app/(routes)/sellers/actions.server.ts
"use server";

import { pool } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function registerUser(
  _prevState: { ok: boolean; message?: string | null },
  formData: FormData
): Promise<{ ok: boolean; message?: string | null }> {
  try {
    const account_firstname = (
      formData.get("account_firstname") as string
    )?.trim();
    const account_lastname = (
      formData.get("account_lastname") as string
    )?.trim();
    const account_email = (formData.get("account_email") as string)
      ?.trim()
      .toLowerCase();
    const account_username = (
      formData.get("account_username") as string
    )?.trim();
    //disallow spaces or special characters
    const account_password = (formData.get("account_password") as string) || "";

    if (!account_firstname || !account_lastname)
      return { ok: false, message: "First and last name are required." };
    if (!account_email) return { ok: false, message: "Email is required." };
    if (!account_username)
      return { ok: false, message: "Username is required." };
    if (!account_password || account_password.length < 8)
      return { ok: false, message: "Password must be at least 8 characters." };

    //check if email is taken
    const emailCheck = await pool.query(
      "SELECT account_id FROM account WHERE account_email = $1",
      [account_email]
    );
    if (emailCheck.rows.length > 0) {
      return { ok: false, message: "Email is already registered." };
    }

    //check if username is taken
    const userCheck = await pool.query(
      "SELECT account_id FROM account WHERE account_username = $1",
      [account_username]
    );
    if (userCheck.rows.length > 0) {
      return { ok: false, message: "Username in use." };
    }

    const passwordHash = await bcrypt.hash(account_password, 10);

    await pool.query(
      `INSERT INTO account
        (account_firstname, account_lastname, account_email, account_username, account_password)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        account_firstname,
        account_lastname,
        account_email,
        account_username,
        passwordHash,
      ]
    );
  } catch (err: unknown) {
    const isPgError = (e: unknown): e is { code?: string; message?: string } =>
      typeof e === "object" && e !== null && ("code" in e || "message" in e);

    if (isPgError(err) && err.code === "23505") {
      return { ok: false, message: "That email is already registered." };
    }

    const msg = err instanceof Error ? err.message : undefined;
    const looksDuplicate =
      typeof msg === "string" && /unique|duplicate/i.test(msg);
    return {
      ok: false,
      message: looksDuplicate
        ? "That email is already registered."
        : "Something went wrong. Please try again.",
    };
  }

  redirect("/sellers/thankyou");
}

export async function registerSeller(
  prevState: { ok: boolean; message?: string | null },
  formData: FormData
): Promise<{ ok: boolean; message?: string | null; redirect?: string }> {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      ok: false,
      message: "You must be logged in to register as a seller.",
    };
  }

  const account_id = parseInt(session.user.id);
  const company_name = (formData.get("account_company_name") as string)?.trim();

  const rawWebsite = (formData.get("account_website") as string) || "";
  const account_website = rawWebsite.trim() ? rawWebsite.trim() : null;

  const account_phone = (formData.get("account_phone") as string)?.trim();

  if (!company_name)
    return { ok: false, message: "Company/Brand name is required." };
  if (!account_phone)
    return { ok: false, message: "Contact phone is required." };

  try {
    await pool.query(
      `INSERT INTO seller_info
        (account_id, company_name, phone, website)
       VALUES ($1, $2, $3, $4)`,
      [account_id, company_name, account_phone, account_website]
    );

    await pool.query(
      `UPDATE account
       SET account_type = 'Seller'
       WHERE account_id = $1`,
      [account_id]
    );

    revalidatePath("/sellers");
    return {
      ok: true,
      message: "Seller registration successful!",
      redirect: "/sellers/thankyou",
    };
  } catch (error) {
    console.error("Error registering seller:", error);
    return {
      ok: false,
      message: "Failed to register as seller. Please try again.",
    };
  }
}
