"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/upload-thing/core";
import styles from "@styles/crud-form.module.scss";

export default function UploadImage({ name, label }: { name: string; label: string }) {
  return (
    <div className={styles.form_control}>
        <label><strong>{label}</strong></label>
        <UploadButton<OurFileRouter, "productImage">
            endpoint="productImage"
            onClientUploadComplete={(res) => {
                const url = res?.[0]?.url;
                if (url) {
                const hiddenInput = document.querySelector<HTMLInputElement>(`input[name="${name}"]`);
                if (hiddenInput) hiddenInput.value = url;
                }
            }}
            onUploadError={(error) => alert(`Upload failed: ${error.message}`)}
        />
        <input type="hidden" name={name} />
    </div>
  );
}