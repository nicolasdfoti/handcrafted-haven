import styles from "../styles/info.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-regular-svg-icons";

export function Information() {
  return (
    <section className={`${styles["information-section"]}`}>
      <div
        className={`${styles["site-exploration-card"]} ${styles["artisan-brown"]}`}
      >
        <div className={`${styles["svg-wrapper"]}`}>
          <FontAwesomeIcon icon={faHeadphones} />
        </div>
        <h2>Artisan Crafts</h2>
        <a className={`${styles["button-styles"]}`} href="#">
          Explore
        </a>
      </div>
      <div
        className={`${styles["site-exploration-card"]} ${styles["tech-blue"]}`}
      >
        <div className={`${styles["svg-wrapper"]}`}>
          <FontAwesomeIcon icon={faHeadphones} />
        </div>
        <h2>Technology</h2>
        <a className={`${styles["button-styles"]}`} href="#">
          Explore
        </a>
      </div>
      <div
        className={`${styles["site-exploration-card"]} ${styles["raspberry-red"]}`}
      >
        <div className={`${styles["svg-wrapper"]}`}>
          <FontAwesomeIcon icon={faHeadphones} />
        </div>
        <h2>Baked Goods</h2>
        <a className={`${styles["button-styles"]}`} href="#">
          Explore
        </a>
      </div>
    </section>
  );
}
