import { Header } from '@/app/ui/header';
import { Footer } from '@/app/ui/footer';
import { pool } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { formatPhoneNumber } from '@/app/lib/products'
import styles from '@/app/styles/detail.module.css';
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
    const products = productsResult.rows;

    return (
      <div className={styles.details_page}>
        <Header />

        {/* Hero Section */}
        <section className={styles.hero_section}>
          <div className={styles.hero_image}>
            <Image
              src="/images/handcrafted-hero.jpg"
              alt={`Artisan products by ${account.account_company_name || account.account_firstname}`}
              fill
              priority
              className={styles.hero_img}
            />
            
            <div className={styles.hero_overlay} />
            
            <div className={styles.hero_content}>
              <div className={styles.detail}>
                <h1 className={styles.company_name}>
                  {account.account_company_name}
                </h1>
                <p className={styles.artisan_name}>
                  by {account.account_firstname} {account.account_lastname}
                </p>
              </div>

              <div className={styles.contact}>
                <h3 className={styles.contact_title}>Contact Information</h3>
                <div className={styles.contact_info}>
                  <ContactItem 
                    label="Email" 
                    value={account.account_email} 
                    type="email" 
                  />
                  <ContactItem 
                    label="Phone" 
                    value={account.account_phone} 
                    type="phone" 
                  />
                  <ContactItem 
                    label="Website" 
                    value={account.account_website} 
                    type="website" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className={styles.products_section}>
          <div className={styles.container}>
            <h2 className={styles.section_title}>Featured Products</h2>
            
            {products.length === 0 ? (
              <div className={styles.empty_state}>
                <p>No products available at the moment</p>
                <p className={styles.empty_subtitle}>Check back soon for new creations</p>
              </div>
            ) : (
              <div className={styles.cards_container}>
                {products.map((product) => (
                  <ProductCard key={product.product_id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading artisan details:', error);
    redirect('/error');
  }
}

// Returns the contact component
function ContactItem({ label, value, type }: { 
  label: string; 
  value: string; 
  type: 'email' | 'phone' | 'website' 
}) {
  if (!value) return null;

  const formattedValue = type === 'phone' ? formatPhoneNumber(value) : value;
  const href = type === 'email' ? `mailto:${value}` : 
               type === 'phone' ? `tel:${value}` : 
               value;

  return (
    <div className={styles.contact_item}>
      <span className={styles.contact_label}>{label}:</span>
      <a 
        href={href} 
        className={styles.contact_link}
        target={type === 'website' ? '_blank' : undefined}
        rel={type === 'website' ? 'noopener noreferrer' : undefined}
      >
        {formattedValue}
      </a>
    </div>
  );
}

// Returns the product component
function ProductCard({ product }: { product: Product }) {
  return (
    <article className={styles.card}>
      <div className={styles.card_header}>
        <h3 className={styles.card_title}>{product.product_name}</h3>
      </div>
      <div className={styles.card_body}>
        <p className={styles.product_description}>{product.product_description}</p>
        <div className={styles.product_price}>
          ${product.product_price}
        </div>
      </div>
    </article>
  );
}