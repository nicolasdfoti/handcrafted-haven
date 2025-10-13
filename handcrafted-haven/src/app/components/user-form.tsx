import { FormControl } from "./form-control";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import styles from "@styles/sellerForm.module.scss";
import { registerUser } from "../lib/form-actions";

type RegisterState = { ok: boolean; message?: string | null };
const initialRegisterState: RegisterState = { ok: false, message: null };

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submitBtn} disabled={pending}>
      {pending ? "Creating..." : "Create Account"}
    </button>
  );
}

export default function UserForm() {
  const [state, formAction] = useActionState<RegisterState, FormData>(
    registerUser,
    initialRegisterState
  );

  return (
    <form action={formAction} id="userSignupForm" className={styles.form}>
      {state?.message && (
        <p role="alert" className={styles.errorMsg}>
          {state.message}
        </p>
      )}
      {/* Account Information */}
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
            defaultValue=""
          />
          <FormControl
            label="Last Name *"
            id="account_lastname"
            name="account_lastname"
            type="text"
            required
            autoComplete="last name"
            defaultValue=""
          />
          <FormControl
            label="Email *"
            id="account_email"
            name="account_email"
            type="email"
            required
            autoComplete="email"
            defaultValue=""
          />
          <FormControl
            label="Username *"
            id="account_username"
            name="account_username"
            type="username"
            required
            autoComplete="username"
            defaultValue=""
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
            defaultValue=""
          />
        </div>
      </fieldset>

      <div className={styles.formActions}>
        <SubmitBtn />
      </div>
    </form>
  );
}
