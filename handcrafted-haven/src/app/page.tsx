'use client';

import styles from "./ui/styles/page.module.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header.jsx";
import { Hero } from "./components/hero";
import { Information } from "./components/information.jsx";
import { SellersCta } from "./components/sellersCta.jsx";
import { RegisterCta } from "./components/registerCta.jsx";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <Header />
      <Hero
      image="/images/handcrafted-hero.jpg"
      title="Discover Unique Handcrafted Treasures"
      subtitle="Connect with artisans and find one-of-a-kind creations made with passion."
      buttonText="Start Exploring"
      buttonLink="/explore"
    />
      <Information />
      {session ? (
        // if (user is logged in)
        <SellersCta />
      ) : (
        // If you are not logged in, show the CTA to register
        <RegisterCta />
      )}
      <Footer />
    </div>
  );
}
