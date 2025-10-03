import { Header } from '@/app/ui/header';
import { Footer } from '@/app/ui/footer';
import { fetchFromDB } from '@/app/ui/components';
import { redirect } from 'next/navigation';
import { ProductCard, ContactItem } from '@/app/ui/components';
import { Product, Account } from '@/app/lib/definitions';
import styles from '@styles/s';
import Image from 'next/image';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  
  try {
    const accountId = parseInt(id);

    const account = await fetchFromDB<Account>("account", { account_id: accountId }, { single: true }) as Account | null;
    const products = await fetchFromDB<Product>("products", { account_id: accountId }) as Product[];

    if (!account) {
      redirect("/not-found");
    }

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
                <h3>Contact Information</h3>
                <div>
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