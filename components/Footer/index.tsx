import styles from './Footer.module.scss'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/PottyZA"
        target="_blank"
        rel="noopener noreferrer"
      >
        Built by Charl Potgieter
      </a>
    </footer>)
}

export default Footer