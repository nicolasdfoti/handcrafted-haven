import { Header } from '@/app/ui/header';
import { Footer } from '@/app/ui/footer';
import { pool } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import styles from '../../styles/detail.module.css';
import Image from 'next/image';
import { ProductCard } from '@/app/lib/components';
import { Account, Product } from '@/app/lib/definitions';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  
  try {
    const [accountResult, productsResult] = await Promise.all([
      pool.query<Account>('SELECT * FROM account WHERE account_id = $1', [id]),
      pool.query<Product>('SELECT * FROM products WHERE account_id = $1', [id])
    ]);

    if (accountResult.rows.length === 0) {
      redirect('/not-found');
    }

    const account = accountResult.rows[0];
    const products = productsResult.rows[0];

    return (
      <div className={styles.details_page}>
        <Header />

        <div className={styles.details_body}>

          <div className={styles.image}>
            <Image
              src="/images/handcrafted-hero.jpg"
              alt={`Artisan products by ${account.account_company_name || account.account_firstname}`}
              width='300'
              height='300'
            />
          </div>

          <div className={styles.cards_container}>
            <ProductCard key={products.product_id} product={products} />
          </div>

        </div>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading product details:', error);
    redirect('/error');
  }
}