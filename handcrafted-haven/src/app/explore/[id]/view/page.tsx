import { Header } from '@/app/ui/header.jsx';
import { Footer } from "@/app/ui/footer";
import { pool } from '@/app/lib/db';
import { redirect } from "next/navigation";
import styles from "@/app/styles/detail.module.css"
import Image from "next/image";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: DetailPageProps) {
  const { id } = await params;
  
  try {
    const res = await pool.query("SELECT * FROM account WHERE account_id = $1", [id]);
    
    if (res.rows.length === 0) {
      redirect('/not-found');
    }

    const resProducts = await pool.query("SELECT * FROM products WHERE account_id = $1", [id]);
    const account = res.rows[0];
    const products = resProducts.rows || [];

    return (
      <div>
        <Header />

        <div className={styles.hero_container}>
          <div className={styles.hero_image}>
            <Image
              src="/images/handcrafted-hero.jpg"
              alt="Handcrafted products"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          
            <div className={styles.detail}>
              <h1>{account.account_firstname} {account.account_lastname}</h1>
            </div>

            <div className={styles.contact}>
              <p>Contact info:</p>
              <p>Email: {account.account_email}</p>
            </div>
          </div>
        </div>

        <h2>Products:</h2>

        <div className={styles.cards_container}>
          {products.length === 0 ? (
            <p>No products yet.</p>
          ) : (
            products.map((product) => (
              <div key={product.product_id} className={styles.card}>
                <section className={styles.card_title}>
                  <h2>{product.product_name}</h2>
                </section>
                <section className={styles.card_body}>
                  <ul>
                    <li>{product.product_description}</li>
                    <li>Price: ${product.product_price}</li>
                  </ul>
                </section>
              </div>
            ))
          )}
        </div>

        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error loading page:', error);
  }
}