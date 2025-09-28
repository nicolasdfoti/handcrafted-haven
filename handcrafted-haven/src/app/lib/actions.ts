import bcrypt from "bcryptjs";
import { redirect } from 'next/navigation';

// Function to register seller
export async function registerSeller(formData: FormData) {
  "use server";

  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const username = ((formData.get("username") as string) || "").trim() || null;
  const password = (formData.get("password") as string) || "";
  const confirm = (formData.get("confirm") as string) || "";

  if (!email || !password) throw new Error("Email and password are required.");
  if (password !== confirm) throw new Error("Passwords do not match.");
  if (password.length < 8) throw new Error("Password must be at least 8 characters.");

  const companyName = (formData.get("company-name") as string)?.trim();
  const website = ((formData.get("website") as string) || "").trim() || undefined;

  const contactName = (formData.get("contact-name") as string)?.trim();
  const contactPhone = (formData.get("contact-phone") as string)?.trim();

  const sector = (formData.get("sector") as string)?.trim();

  const passwordHash = await bcrypt.hash(password, 10);

  // Validate duplicate by email in your DB before creating
//   await createSellerInDB({
//     email,
//     username,
//     passwordHash,
//     companyName,
//     website,
//     contactName,
//     contactPhone,
//     sector,
//   });

  redirect("/thankyou");
}
