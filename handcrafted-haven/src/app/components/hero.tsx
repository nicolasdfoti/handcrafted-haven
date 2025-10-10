'use client';

import React from "react";
import styles from "@/app/ui/styles/page.module.css";
import Image from "next/image";
import type { Hero } from "../lib/definitions";


export function Hero({
  image,
  alt = 'Hero image',
  title,
  subtitle,
  buttonText,
  buttonLink,
  children,
}: Hero) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroImage}>
        <Image
          src={image}
          alt={alt}
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.hero__title}>{title}</h1>
        {subtitle && <p className={styles.hero__subtitle}>{subtitle}</p>}

        <div className={styles.hero__actions}>
          {buttonText && buttonLink && (
            <a href={buttonLink} className={`${styles.btn} ${styles.btnPrimary}`}>
              {buttonText}
            </a>
          )}
          {children && <div className={styles.hero__extra}>{children}</div>}
        </div>
      </div>
    </section>
  );
}