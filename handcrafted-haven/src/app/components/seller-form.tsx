"use client";

import { FormControl } from "./form-control";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import styles from "@styles/sellerForm.module.scss";
import { registerSeller } from "../lib/form-actions";
import { useRouter } from "next/navigation";

type RegisterState = {
  ok: boolean;
  message?: string | null;
  redirect?: string;
};
const initialRegisterState: RegisterState = { ok: false, message: null };

export function SubmitBtn({ className = ""}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submitBtn} disabled={pending}>
      {pending ? "Creating..." : "Create account & Apply"}
    </button>
  );
}

export default function SellerForm() {
  const [state, formAction] = useActionState<RegisterState, FormData>(
    registerSeller,
    initialRegisterState
  );
  const router = useRouter();

  useEffect(() => {
    if (state.ok && state.redirect) {
      router.push(state.redirect);
    }
  }, [state, router]);

  return (
    <form action={formAction} id="sellerSignupForm" className={styles.form}>
      {state?.message && (
        <p
          role="alert"
          className={state.ok ? styles.successMsg : styles.errorMsg}
        >
          {state.message}
        </p>
      )}

      {/* Business profile */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Company Information</legend>
        <div className={styles.grid3}>
          <FormControl
            label="Brand / Shop Name *"
            id="account_company_name"
            name="account_company_name"
            required
          />
          <FormControl
            label="Website or Social"
            id="account_website"
            name="account_website"
            type="url"
            placeholder="https://…"
          />
          <FormControl
            label="Contact Phone *"
            id="account_phone"
            name="account_phone"
            type="tel"
            required
          />
        </div>
      </fieldset>

      <div className={styles.formActions}>
        <SubmitBtn />
      </div>
    </form>
  );
}
