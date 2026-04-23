import React from "react";

const footerData = {
  Company: ["About", "Jobs", "For the Record"],
  Communities: ["For Artists", "Developers", "Advertising", "Investors", "Vendors"],
  "Useful links": ["Support", "Free Mobile App", "Popular by Country", "Import your music"],
  "Spotify Plans": ["Premium Lite", "Premium Standard", "Premium Platinum", "Premium Student", "Spotify Free"],
};

const socialIcons = {
  Instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  Twitter: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.top}>
        {/* COLUMNS */}
        <div style={styles.columns}>
          {Object.entries(footerData).map(([heading, links]) => (
            <div key={heading} style={styles.column}>
              <p style={styles.heading}>{heading}</p>
              <ul style={styles.list}>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" style={styles.link} onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="#b3b3b3"}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SOCIAL ICONS */}
        <div style={styles.socials}>
          {Object.entries(socialIcons).map(([name, icon]) => (
            <a
              key={name}
              href="#"
              aria-label={name}
              style={styles.socialBtn}
              onMouseEnter={e => e.currentTarget.style.background="#333"}
              onMouseLeave={e => e.currentTarget.style.background="#282828"}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div style={styles.divider} />

      {/* BOTTOM BAR */}
      <div style={styles.bottom}>
        <div style={styles.legal}>
          {["Legal", "Safety & Privacy Center", "Privacy Policy", "Cookies", "About Ads", "Accessibility"].map((item, i) => (
            <a
              key={item}
              href="#"
              style={styles.legalLink}
              onMouseEnter={e => e.target.style.color="#fff"}
              onMouseLeave={e => e.target.style.color="#b3b3b3"}
            >
              {item}
            </a>
          ))}
        </div>
        <p style={styles.copyright}>© 2026 Spotify AB</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#121212",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    padding: "48px 32px 24px",
    marginTop: 48,
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 32,
    flexWrap: "wrap",
    marginBottom: 40,
  },
  columns: {
    display: "flex",
    gap: 64,
    flexWrap: "wrap",
    flex: 1,
  },
  column: {
    minWidth: 120,
  },
  heading: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    margin: "0 0 16px",
    letterSpacing: "0.5px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  link: {
    color: "#b3b3b3",
    fontSize: 13,
    textDecoration: "none",
    transition: "color 0.15s",
  },
  socials: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    flexShrink: 0,
  },
  socialBtn: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#282828",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    transition: "background 0.15s",
  },
  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.08)",
    marginBottom: 24,
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  legal: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px 20px",
  },
  legalLink: {
    color: "#b3b3b3",
    fontSize: 11,
    textDecoration: "none",
    transition: "color 0.15s",
  },
  copyright: {
    color: "#b3b3b3",
    fontSize: 11,
    margin: 0,
  },
};