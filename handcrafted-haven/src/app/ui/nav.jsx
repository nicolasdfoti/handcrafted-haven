import styles from "@/app/styles/page.module.css";
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
            <svg
              fill="currentColor"
              width="48px"
              height="48px"
              viewBox="0 2 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19,7H16V6A4,4,0,0,0,8,6V7H5A1,1,0,0,0,4,8V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V8A1,1,0,0,0,19,7ZM10,6a2,2,0,0,1,4,0V7H10Zm8,13a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9H8v1a1,1,0,0,0,2,0V9h4v1a1,1,0,0,0,2,0V9h2Z" />
            </svg>{" "}
            Sellers
          </a>
        </li>
        <li>
          <a href="">
            <FontAwesomeIcon icon={faWpexplorer} />
            Explore
          </a>
        </li>
      </ul>
    </nav>
  );
}
