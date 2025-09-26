import styles from "@/app/page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-regular-svg-icons";

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="">
            {/*This looks a bit out of place for now, it's just a proof of concept using FontAwesomeIcon's library you can just type in any svg from here and it will automatically work https://fontawesome.com/icons */}
            <FontAwesomeIcon icon={faHome} /> Home
          </a>
        </li>
        <li>
          <a href="">Sellers</a>
        </li>
        <li>
          <a href="">Explore</a>
        </li>
      </ul>
    </nav>
  );
}
