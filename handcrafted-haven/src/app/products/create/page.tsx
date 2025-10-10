"use client"

import styles from "@styles/crud-form.module.scss"
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { FormControl } from "@/app/components/form-control";
import { useFormStatus } from "react-dom";

export function CrudSubmitBtn({ text = "Create Product" }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.crud_submit_btn} disabled={pending}>
      {pending ? "Creating..." : text}
    </button>
  );
}

export default function Page() {
    return(
        <div>
            <Header />
            <div>
                <form className={styles.crud_form} action="">
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
                        type="date"
                        placeholder="https://…"
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
                        required
                    />

                    <FormControl
                        label="Product Thumbnail *"
                        id="product_thumbnail"
                        name="product_thumbnail"
                        required
                    />
                    <FormControl
                        label="Product Price *"
                        id="product_price"
                        name="product_price"
                        type="number"
                        placeholder="$..."
                    />
                    <CrudSubmitBtn />
                </form>
            </div>
            <Footer />
        </div>
    )
}