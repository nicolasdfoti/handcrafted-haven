"use client";

import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header.jsx";
import { FormControl } from "@/app/components/form-control";
import { useActionState } from "react";
import { registerSeller } from "../../lib/form-actions";
import styles from "@styles/sellerForm.module.scss";
import { useFormStatus } from "react-dom";

type RegisterState = { ok: boolean; message?: string | null };
const initialRegisterState: RegisterState = { ok: false, message: null };

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submitBtn} disabled={pending}>
      {pending ? "Creating..." : "Create account & Apply"}
    </button>
  );
}

export default function Sellers() {
  const [state, formAction] = useActionState<RegisterState, FormData>(
    registerSeller,
    initialRegisterState
  );

  return (
    <div>
      <Header />

      <main className={styles.container}>
        {/* <picture className={styles.banner}>
        <source srcSet="/images/banner-form-desktop.webp" media="(min-width: 1024px)" />
        <source srcSet="/images/banner-form-desktop.webp" media="(min-width: 768px)" />
        <img src="/images/banner-form.webp" alt="banner" className={styles.bannerImage} />
      </picture> */}

        <h1 className={styles.title}>Apply as a Seller</h1>
        <p className={styles.subtitle}>
          Create your account and tell us about your craft. We'll review and get
          back to you.
        </p>

        <form action={formAction} id="sellerSignupForm" className={styles.form}>
          {state?.message && (
            <p role="alert" className={styles.errorMsg}>
              {state.message}
            </p>
          )}
          {/* Account */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Account Information</legend>

            <div className={styles.grid2}>
              <FormControl
                label="First Name *"
                id="account_firstname"
                name="account_firstname"
                type="text"
                required
                autoComplete="first name"
              />
              <FormControl
                label="Last Name *"
                id="account_lastname"
                name="account_lastname"
                type="text"
                required
                autoComplete="last name"
              />
              <FormControl
                label="Email *"
                id="account_email"
                name="account_email"
                type="email"
                required
                autoComplete="email"
              />
              <FormControl
                label="Password *"
                id="account_password"
                name="account_password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="At least 8 characters"
                minLength={8}
              />
            </div>
          </fieldset>
          <div className={styles.formActions}>
            <SubmitBtn />
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
