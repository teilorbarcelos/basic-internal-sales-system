import Link from 'next/link'
import styles from './styles.module.css'
import globals from '../../styles/globals.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Logo
        </div>
        <ul className={styles.links}>
          <li>
            <Link href={"/Login"}>
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href={"/Register"}>
              <a>Register</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}