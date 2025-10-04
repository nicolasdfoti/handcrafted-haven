import { Header } from '@/app/components/header';
import { Footer } from '@/app/components/footer';
import { fetchFromDB } from '@/app/components/components';
import { redirect } from 'next/navigation';
import styles from '@styles/detail.module.scss';
import { ProductCard } from '@/app/components/components';
import Image from 'next/image';
import { Account, Product } from '@/app/lib/definitions';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  try {
    
    const productId = parseInt(id);

    const product = await fetchFromDB<Product>("products", { product_id: productId }, { single: true }) as Product;
    const similar_products = await fetchFromDB<Product>(
      "products",
      { product_category: product.product_category }
    ) as Product[];
    const account = await fetchFromDB<Account>("account", { account_id: product.account_id }, { single: true }) as Account;

    if (!account) {
      redirect("/not-found");
    }

    return (
      <div className={styles.details_page}>
        <Header />

        <div className={styles.product_title}>
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

          <div className={styles.product_info}>
            <div className={styles.product_header}>
              <h2>{product.product_name}</h2>
            </div>

            <div className={styles.product_body}>
              <h3><strong>Price: </strong> ${product.product_price}</h3>
              <h3><strong>Description: </strong> {product.product_description}</h3>
            </div>

            <div className={styles.product_button}>
              <button>Buy now!</button>
            </div>
          </div>

          <div className={styles.similar_products}>
            <h2>Similar Products: </h2>
            <div className={styles.similar_products_info}>
              {similar_products.length > 0 ? (
                similar_products.map((similarProduct) => (
                  <ProductCard key={similarProduct.product_id} product={similarProduct} />
                ))
              ) : (
                <p>No similar products found in the {product.product_category} category</p>
              )}
            </div>
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
