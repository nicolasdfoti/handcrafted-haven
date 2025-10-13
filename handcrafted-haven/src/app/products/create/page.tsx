"use client"

import styles from "@styles/crud-form.module.scss"
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { FormControl } from "@/app/components/form-control";
import { CrudSubmitBtn } from "@/app/components/crud-button";
import { createProduct } from "@/app/components/create-product";
import { useSession } from "next-auth/react";

export default function Page() {

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return (
            <div>
                <Header />
                <div>Please log in to create products</div>
                <Footer />
            </div>
        );
    }

    return(
        <div>
            <Header />
            <div>
                <form className={styles.crud_form} action={createProduct}>                    
                    <FormControl
                        label="Product Title *"
                        id="product_title"
                        name="product_title"
                        type="text"
                        required
                    />
                    <FormControl
                        label="Product Date *"
                        id="product_date"
                        name="product_date"
                        type="number"
                        placeholder="2025"
                        required
                    />
                    <FormControl
                        label="Product Description *"
                        id="product_description"
                        name="product_description"
                        type="text"
                        required
                    />

                    <FormControl
                        label="Product Image *"
                        id="product_image"
                        name="product_image"
                        type="file"
                        required
                    />

                    <FormControl
                        label="Product Thumbnail *"
                        id="product_thumbnail"
                        name="product_thumbnail"
                        type="file"
                        required
                    />
                    <FormControl
                        label="Product Price *"
                        id="product_price"
                        name="product_price"
                        type="number"
                        placeholder="$..."
                    />

                    <div className={styles.form_control}>
                        <label htmlFor="category_id"><strong>Category *</strong></label>
                        <select id="category_id" name="category_id" required>
                            <option value="">Select a category</option>
                            <option value="1">Home & Living</option>
                            <option value="2">Style & Accesories</option>
                            <option value="3">Art & Collectibles</option>
                            <option value="4">Gifts & Specials</option>
                        </select>
                    </div>
                    <CrudSubmitBtn />
                </form>
            </div>
            <Footer />
        </div>
    )
}