import React from 'react'
import styles from './Logo.module.scss'

const Logo = () => (
  <div className={styles.logo}>
    <div className={styles.pawsome}>
      <div className={styles.paw}>paw</div>
      <div className={styles.some}>some</div>
    </div>
    <div className={styles.tagline}>Perfect finds for your pet</div>
  </div>
)

export default Logo
