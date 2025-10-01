import { Header } from '@/app/ui/header';
import { Footer } from '@/app/ui/footer';
import { pool } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import styles from '@/app/explore/styles/detail.module.css';
import Image from 'next/image';

interface Account {
  account_id: string;
  account_company_name: string;
  account_firstname: string;
  account_lastname: string;
  account_email: string;
  account_phone: string;
  account_website: string;
}

interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  product_price: number;
}

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

        <div className={styles.image}>
            <Image
                src="/images/handcrafted-hero.jpg"
                alt={`Artisan products by ${account.account_company_name || account.account_firstname}`}
                width='100'
                height='100'
            />
        </div>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading artisan details:', error);
    redirect('/error');
  }
}

// Returns the product component
function ProductCard({ product }: { product: Product }) {
  return (
    <article className={styles.card}>
        <a href={`/explore/${product.product_id}`}> 
            {/* we need to add the /view here */}
            <div className={styles.card_header}>
                <h3 className={styles.card_title}>{product.product_name}</h3>
            </div>
            <div className={styles.card_body}>
                <p className={styles.product_description}>{product.product_description}</p>
                <div className={styles.product_price}>
                ${product.product_price}
                </div>
            </div>
        </a>
    </article>
  );
}