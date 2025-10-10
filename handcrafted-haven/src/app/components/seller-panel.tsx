import Link from "next/link";
import styles from "@styles/sellers.module.scss"

export default function SellerPanel() {
  return(
    <div className={styles.profile_buttons}>
      <div className={styles.create_button}><Link href="../products/create">Upload a product</Link></div>
      <div className={styles.delete_button}><Link href="../products/delete">Delete a product</Link></div>
    </div>
  );
}
