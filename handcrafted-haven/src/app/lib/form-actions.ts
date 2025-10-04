// app/(routes)/sellers/actions.server.ts
"use server";

import { pool } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerSeller(
  _prevState: { ok: boolean; message?: string | null },
  formData: FormData
): Promise<{ ok: boolean; message?: string | null }> {
  try {
    const account_firstname = (formData.get("account_firstname") as string)?.trim();
    const account_lastname  = (formData.get("account_lastname") as string)?.trim();
    const account_email     = (formData.get("account_email") as string)?.trim().toLowerCase();
    const account_password  = (formData.get("account_password") as string) || "";

    const account_company_name = (formData.get("account_company_name") as string)?.trim();
    
    const rawWebsite = (formData.get("account_website") as string) || "";
    const account_website = rawWebsite.trim() ? rawWebsite.trim() : null;

    const account_phone = (formData.get("account_phone") as string)?.trim();

    
    if (!account_firstname || !account_lastname) return { ok: false, message: "First and last name are required." };
    if (!account_email) return { ok: false, message: "Email is required." };
    if (!account_password || account_password.length < 8) return { ok: false, message: "Password must be at least 8 characters." };
    if (!account_company_name) return { ok: false, message: "Company/Brand name is required." };
    if (!account_phone) return { ok: false, message: "Contact phone is required." };

   
    const check = await pool.query(
      "SELECT account_id FROM account WHERE account_email = $1",
      [account_email]
    );
    if (check.rows.length > 0) {
      return { ok: false, message: "That email is already registered." };
    }

    
    const passwordHash = await bcrypt.hash(account_password, 10);

    await pool.query(
      `INSERT INTO account
        (account_firstname, account_lastname, account_email, account_password,
         account_company_name, account_website, account_phone)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        account_firstname,
        account_lastname,
        account_email,
        passwordHash,
        account_company_name,
        account_website, 
        account_phone,
      ]
    );

  } catch (err: unknown) {
    const isPgError = (e: unknown): e is { code?: string; message?: string } =>
      typeof e === "object" && e !== null && ("code" in e || "message" in e);

    if (isPgError(err) && err.code === "23505") {
      return { ok: false, message: "That email is already registered." };
    }

    const msg = err instanceof Error ? err.message : undefined;
    const looksDuplicate = typeof msg === "string" && /unique|duplicate/i.test(msg);
    return {
      ok: false,
      message: looksDuplicate ? "That email is already registered." : "Something went wrong. Please try again.",
    };
  }

  redirect("/sellers/thankyou");
}
