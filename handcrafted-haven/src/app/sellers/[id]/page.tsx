import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { fetchFromDB } from "@/app/components/components";
import { redirect } from "next/navigation";
import { ContactItem } from "@/app/components/components";
import { Product, Account, Seller } from "@/app/lib/definitions";
import styles from "@styles/sellers.module.scss";
import Image from "next/image";
import { auth } from "@/auth";
import FeaturedProducts from "@/app/components/featured-products";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  // const session = await auth();

  // if (!session?.user) {
  //   redirect("/login");
  // }

  // if the logged-in user's ID does not match the accountId from the URL, redirect to not-authorized
  // if (String(session.user.id) !== String(accountId)) {
  //   redirect("/not-authorized");
  // }

  try {
    const accountId = parseInt(id);

    const account = (await fetchFromDB<Account>(
      "account",
      { account_id: accountId },
      { single: true }
    )) as Account | null;

    const products = (await fetchFromDB<Product>("products", {
      account_id: accountId,
    })) as Product[];

    const seller = (await fetchFromDB<Seller> (
      "seller_info",
      { account_id: accountId },
      { single: true }
    )) as Seller;

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
              alt={`Artisan products by ${
                account.account_company_name || account.account_firstname
              }`}
              fill
              priority
              className={styles.hero_img}
            />

            <div className={styles.hero_overlay} />

            <div className={styles.hero_content}>
              <div className={styles.detail}>
                <h1 className={styles.company_name}>
                  {seller.company_name}
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
                    value={seller.phone || ""}
                    type="phone"
                  />
                  <ContactItem
                    label="Website"
                    value={seller.website || ""}
                    type="website"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <FeaturedProducts products={products} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error loading artisan details:", error);
    redirect("/error");
  }
}
