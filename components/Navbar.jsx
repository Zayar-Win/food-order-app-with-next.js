import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const orderCount = useSelector(state => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
          <a className={styles.listItem}>Homepage</a>
          </Link>
          <Link href="/" passHref>
          <a className={styles.listItem}>Products</a>
          </Link>
          <Link href="/" passHref>
          <a className={styles.listItem}>Menu</a>
          </Link>
          <Image src="/img/logo.png" alt="" width="160px" height="69px" />
          <Link href="/adamin" passHref>
          <a className={styles.listItem}>Admin</a>
          </Link>
          <Link href="/" passHref>
          <a className={styles.listItem}>Blogs</a>
          </Link>
          <Link href="/" passHref>
          <a className={styles.listItem}>Contact</a>
          </Link>
        </ul>
      </div>
      <div className={styles.item}>
        <Link href="/cart" passHref>
        <div className={styles.cart}>
          <Image src="/img/cart.png" alt="" width="30px" height="30px" />
          <div className={styles.counter}>{orderCount}</div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
