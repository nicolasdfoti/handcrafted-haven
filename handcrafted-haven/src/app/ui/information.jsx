import styles from "../styles/info.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";

export function Information() {
  return (
    <section className={`${styles["information-section"]}`}>
      <div
        className={`${styles["site-exploration-card"]} ${styles["artisan-green"]}`}
      >
        <div className={`${styles["svg-wrapper"]}`}>
          <Image
            src="/images/home-icon.png"
            alt="Home and Living Icon"
            width={128}
            height={128}
          />
        </div>
        <h2>Home & Living</h2>
        <p>Pieces to decorate and bring warmth to your home.</p>
        <a className={`${styles["button-styles"]}`} href="#">
          Explore
        </a>
      </div>

      <div
        className={`${styles["site-exploration-card"]} ${styles["artisan-brown"]}`}
      >
        <div className={`${styles["svg-wrapper"]}`}>
          <Image
            src="/images/bag-icon.png"
            alt="Accesories Icon"
            width={128}
            height={128}
          />
        </div>
        <h2>Style & Accessories</h2>
        <p>Fashion, handcrafted jewelry, bags, and accessories.</p>
        <a className={`${styles["button-styles"]}`} href="#">
          Explore
        </a>
      </div>

      <div
        className={`${styles["site-exploration-card"]} ${styles["artisan-rust"]}`}
      >
        <div className={`${styles["svg-wrapper"]}`}>
          <Image
            src="/images/art-icon.png"
            alt="Art Icon"
            width={128}
            height={128}
          />
        </div>
        <h2>Art & Collectibles</h2>
        <p>Original artwork, prints, and unique collectibles.</p>
        <a className={`${styles["button-styles"]}`} href="#">
          Explore
        </a>
      </div> 
      
      <div
        className={`${styles["site-exploration-card"]} ${styles["artisan-sand"]}`} 
      >
        <div className={`${styles["svg-wrapper"]}`}>
          <Image
            src="/images/gift-icon.png"
            alt="Gift Icon"
            width={128}
            height={128}
          />
        </div>
        <h2>Gifts & Specials</h2>
        <p>Handpicked gifts for every occasion and special moments.</p>
        <a className={`${styles["button-styles"]}`} href="#">
          Explore
        </a>
      </div>
    </section>
  );
}
