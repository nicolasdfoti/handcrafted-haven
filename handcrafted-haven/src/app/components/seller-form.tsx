import { FormControl } from "./form-control";
import styles from "@styles/sellerForm.module.scss";

export default function SellerForm() {
  return (
    <>
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
    </>
  );
}
