'use client'

import { useFormStatus } from "react-dom";
import styles from "@styles/crud-form.module.scss"

interface DeleteButtonProps {
    text?: string;
}

export function DeleteButton({ text = "Delete" }: DeleteButtonProps) {
    const { pending } = useFormStatus();
    
    return (
        <button 
            type="submit" 
            className={styles.delete_btn} 
            disabled={pending}
            onClick={(e) => {
                if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
                    e.preventDefault();
                }
            }}
        >
            {pending ? "Deleting..." : text}
        </button>
    );
}