import { Header } from '@/app/ui/header';
import { Footer } from '@/app/ui/footer';
import { fetchFromDB } from '@/app/ui/components';
import { redirect } from 'next/navigation';
import styles from '@styles/detail.module.scss'
import Image from 'next/image';
import { ProductCard } from '@/app/ui/components';
import { Account, Product } from '@/app/lib/definitions';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  try {
    
    const productId = parseInt(id);

    const product = await fetchFromDB<Product>("products", { product_id: productId }, { single: true }) as Product;
    const account = await fetchFromDB<Account>("account", { account_id: product.account_id }, { single: true }) as Account;

    if (!account) {
      redirect("/not-found");
    }

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
