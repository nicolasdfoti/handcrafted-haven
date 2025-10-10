import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Footer } from "@/app/components/footer";
import { Header } from "../../components/header";
import { fetchFromDB } from "@/app/components/components";
import { Product } from "@/app/lib/definitions";
import styles from "@styles/sellers.module.scss";
import FeaturedProducts from "@/app/components/featured-products";
import SellerPanel from "@/app/components/seller-panel";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;
  const session = await auth();
  
  const products = (await fetchFromDB<Product>(
    "products",
    {},
    { limit: 10 }
  )) as Product[];

  // If user is not logged in, redirect to login
  if (!session) {
    redirect("/login");
  }

  if (session.user?.id && session.user?.id !== id) {
    redirect(`/profile/${session.user?.id}`);
  }

  let isSeller = false;
  if (session?.user?.id) {
    isSeller = session.user?.accountType === "Seller";
  } else {
    redirect(`/login`);
  }

  return (
    <div className={styles.general_page}>
      <Header />
      <h1>User Profile</h1>
      <p>
        Welcome to your profile, {session.user?.name || session.user?.email}!
      </p>
      {isSeller && <SellerPanel />}
      {!isSeller && <a>apply to be seller</a>}
      <p>This is your personal profile page.</p>
      <FeaturedProducts products={products || []} />
      <Footer />
    </div>
  );
}