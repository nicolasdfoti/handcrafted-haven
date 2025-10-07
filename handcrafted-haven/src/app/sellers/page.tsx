import { Footer } from '@/app/components/footer';
import { Header } from '../components/header';
import { fetchFromDB } from '@/app/components/components';
import { Account } from '@/app/lib/definitions';
import styles from '@styles/sellers.module.scss'
import { SellerCard } from '@/app/components/components';

export default async function Page() {

    const accounts = await fetchFromDB<Account>("account") as Account[] | null;

    return(
        <div className={styles.general_page}>
            <Header/>
            <h1>Highlited sellers</h1>
            <div className={styles.seller_page}>
            {accounts?.map((seller) => (
                <SellerCard key={seller.account_id} seller={seller} />
                ))}
            </div>
            <Footer/>
        </div>
    )
}