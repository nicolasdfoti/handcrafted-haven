import { Header } from '@/app/ui/header.jsx';
import { Footer } from "@/app/ui/footer";
import { pool } from '@/app/lib/db';
import { redirect } from "next/navigation";
import styles from "@/app/styles/page.module.css"

type DetailPageProps = {
  params: {
    id: string;
  }
}

export default async function Page({ params }: DetailPageProps) {

  const { id } = params;
  const res = await pool.query("SELECT * FROM account WHERE account_id = $1", [id]);
  // const resProducts = await pool.query(
  //   "SELECT * FROM products WHERE account_id = $1",
  //   [id]
  // );
  // const products = resProducts.rows;

  if (res.rows.length === 0) {
    redirect( 'not-found.tsx')
  }

  const account = res.rows[0];

  return (
    <div>
      <Header />

      <div>
        <div className={styles.detail}>
          <h1>{account.account_firstname} {account.account_lastname}</h1>
        </div>

        <div className={styles.contact}>
          <p>Contact info:</p>
          <p>Email: {account.account_email}</p>
        </div>
      </div>

      <h2>Products:</h2>

      {/* <div className={styles.cards_container}>
        {products.length === 0 && <p>No products yet.</p>}

        {products.map((product) => (
          <div key={product.product_id} className={styles.card}>
            <section className={styles.card_title}>
              <h2>{product.product_name}</h2>
            </section>
            <section className={styles.card_body}>
              <p>{product.product_description}</p>
              <p>Price: ${product.product_price}</p>
            </section>
          </div>
        ))}
      </div> */}

      <Footer />
    </div>
  )
}