import { Product } from '@/app/lib/definitions';
import { ProductCard } from '@/app/components/components';
import styles from '@styles/sellers.module.scss';

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  emptyMessage?: string;
  emptySubtitle?: string;
  basePath?: string;
}

export default function FeaturedProducts({
  products,
  title = "Featured Products",
  emptyMessage = "No products available at the moment",
  emptySubtitle = "Check back soon for new creations",
  basePath = "/explore"
}: FeaturedProductsProps) {
  return (
    <section className={styles.products_section}>
      <div className={styles.container}>
        <h2 className={styles.section_title}>{title}</h2>
        
        {!Array.isArray(products) || products.length === 0 ? (
          <div className={styles.empty_state}>
            <p>{emptyMessage}</p>
            <p className={styles.empty_subtitle}>{emptySubtitle}</p>
          </div>
        ) : (
          <div className={styles.cards_container}>
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} basePath={basePath} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}