import styles from "@/app/page.module.css";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { faWpexplorer } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

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
          <a href="">
             <FontAwesomeIcon icon={faBagShopping} /> Sellers
          </a>
        </li>
        <li>
          <a href="">
            <FontAwesomeIcon icon={faWpexplorer} />Explore
          </a>
        </li>
      </ul>
    </nav>
  );
}
