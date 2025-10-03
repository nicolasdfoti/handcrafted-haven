import { Header } from "@/app/ui/header";
import { Footer } from "@/app/ui/footer";
import { pool } from "@/app/lib/db";
import { redirect } from "next/navigation";
import styles from "@/app/styles/detail.module.css";
import Image from "next/image";
import { ProductCard } from "@/app/ui/components";
import { Account, Product } from "@/app/lib/definitions";

interface DetailPageProps {
  params: { id: string };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = params;

  try {
    // looking for the product
    const productsResult = await pool.query<Product>(
      "SELECT * FROM products WHERE product_id = $1",
      [id]
    );

    if (productsResult.rows.length === 0) {
      redirect("/not-found");
    }

    const product = productsResult.rows[0];

    // looking for the account
    const accountResult = await pool.query<Account>(
      "SELECT * FROM account WHERE account_id = $1",
      [product.account_id]
    );

    if (accountResult.rows.length === 0) {
      redirect("/not-found");
    }

    const account = accountResult.rows[0];

    return (
      <div className={styles.details_page}>
        <Header />

        <div>
          <h1>{product.product_name}</h1>
          <h3>by {account.account_company_name}</h3>
        </div>

        <div className={styles.details_body}>
          <div className={styles.image}>
            <Image
              src="/images/handcrafted-hero.jpg"
              alt={`Artisan products by ${
                account.account_company_name || account.account_firstname
              }`}
              width="400"
              height="300"
            />
          </div>

          <div className={styles.cards_container}>
            {/* <ProductCard key={product.product_id} product={product} /> */}
          </div>
        </div>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error loading product details:", error);
    redirect("/error");
  }
}
