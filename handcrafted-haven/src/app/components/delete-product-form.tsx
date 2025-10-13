import { getUserProducts, deleteProduct } from "@/app/components/delete-product";
import { DeleteButton } from "@/app/components/delete-button";
import Image from "next/image";
import styles from "@styles/crud-form.module.scss"

export async function DeleteProductForm() {
    const products = await getUserProducts();

    if (products.length === 0) {
        return (
            <div className={styles.no_products}>
                <p>You do not have any products to manage.</p>
            </div>
        );
    }

    return (
        <div className={styles.products_grid}>
            {products.map((product) => (
                <div key={product.product_id} className={styles.product_card}>
                    {product.product_image && (
                        <Image 
                            width={200}
                            height={200}
                            src={product.product_image} 
                            alt={product.product_title}
                            className={styles.product_image}
                        />
                    )}
                    <div className={styles.product_info}>
                        <h3>{product.product_title}</h3>
                        <p className={styles.product_price}>${product.product_price}</p>
                        <p className={styles.product_price}>{product.category_name}</p>
                        <p className={styles.product_date}>{product.product_date}</p>
                        
                        <form action={deleteProduct.bind(null, product.product_id)}>
                            <DeleteButton text="Delete Product" />
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
}