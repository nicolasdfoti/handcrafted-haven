import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { DeleteProductForm } from "@/app/components/delete-product-form";
import styles from "@styles/crud-form.module.scss"

export default async function DeleteProductPage() {
    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h1>Manage Your Products</h1>
                <p>Select a product to delete</p>
                <DeleteProductForm />
            </div>
            <Footer />
        </div>
    );
}