"use client"

import { useFormStatus } from "react-dom";
import styles from "@styles/crud-form.module.scss"

export function CrudSubmitBtn({ text = "Create Product" }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.crud_submit_btn} disabled={pending}>
      {pending ? "Creating..." : text}
    </button>
  );
}