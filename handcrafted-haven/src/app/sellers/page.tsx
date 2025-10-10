import { Footer } from '@/app/components/footer';
import { Header } from '../components/header';
import { Hero } from "@/app/components/hero";
import { fetchFromDB } from '@/app/components/components';
import { Account, Seller } from '@/app/lib/definitions';
import styles from '@styles/sellers.module.scss'
import { SellerCard } from '@/app/components/components';

export default async function Page() {

    const accounts = await fetchFromDB<Account>("account") as Account[] | null;
    const sellers = await fetchFromDB<Seller>("seller_info") as Seller[] | null;

    const sellerMap = new Map();
    sellers?.forEach(seller => {
        sellerMap.set(seller.account_id, seller);
    })

    return(
        <div className={styles.general_page}>
            <Header/>

            <Hero
                  image="/images/hero-artisans.jpg"
                  title="Highlited sellers"
                  subtitle="Meet the artisans who stand out for their creativity, quality, and passion."
            />

            <div className={styles.seller_page}>
                {accounts?.map((account) => {
                    const seller = sellerMap.get(account.account_id);

                    if (!seller) return null;
                        
                    return (
                        <SellerCard 
                            key={account.account_id} 
                            account={account} 
                            seller={seller}
                        />
                    );
                })}
            </div>
            <Footer />
        </div>
    )
}