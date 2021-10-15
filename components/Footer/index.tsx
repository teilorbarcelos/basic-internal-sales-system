import Link from 'next/link'
import styles from './styles.module.css'
import globals from '../../styles/globals.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <p>Developed by <Link href="https://teilorwebdev.vercel.app"><a target="_blank">Teilor Souza Barcelos</a></Link></p>
    </footer>
  )
}