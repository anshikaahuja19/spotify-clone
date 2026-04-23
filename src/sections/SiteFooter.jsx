import React from 'react';
import styles from './SiteFooter.module.css';

function SiteFooter() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.linksGrid}>
        <div className={styles.column}>
          <h3>Company</h3>
          <a href="#">About</a>
          <a href="#">Jobs</a>
          <a href="#">For the Record</a>
        </div>
        <div className={styles.column}>
          <h3>Communities</h3>
          <a href="#">For Artists</a>
          <a href="#">Developers</a>
          <a href="#">Advertising</a>
          <a href="#">Investors</a>
          <a href="#">Vendors</a>
        </div>
        <div className={styles.column}>
          <h3>Useful links</h3>
          <a href="#">Support</a>
          <a href="#">Free Mobile App</a>
        </div>
        <div className={styles.socials}>
          <div className={styles.socialIcon}><i className="fa-brands fa-instagram"></i></div>
          <div className={styles.socialIcon}><i className="fa-brands fa-twitter"></i></div>
          <div className={styles.socialIcon}><i className="fa-brands fa-facebook"></i></div>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.legal}>
        <div className={styles.legalLinks}>
          <a href="#">Legal</a>
          <a href="#">Safety & Privacy Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies</a>
          <a href="#">About Ads</a>
          <a href="#">Accessibility</a>
        </div>
        <p>© 2026 Spotify AB</p>
      </div>
    </div>
  );
}

export default SiteFooter;