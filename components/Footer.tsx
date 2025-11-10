export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "About Us": [
      { label: "About Chase", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Investor Relations", href: "#" },
      { label: "Media Center", href: "#" },
    ],
    "Support": [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Branch Locator", href: "#" },
      { label: "Security Tips", href: "#" },
    ],
    "Legal": [
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
    "Resources": [
      { label: "Financial Education", href: "#" },
      { label: "Mobile App", href: "#" },
      { label: "Digital Banking Guide", href: "#" },
      { label: "Fraud Protection", href: "#" },
    ],
  };

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t mb-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CB</span>
            </div>
            <span className="text-sm text-muted-foreground">
              © {currentYear} Chase Bank. All rights reserved.
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span>FDIC Insured</span>
            <span>•</span>
            <span>Equal Housing Lender</span>
            <span>•</span>
            <span>NMLS ID: 12345</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-xs text-muted-foreground text-center md:text-left">
          <p>
            Chase Bank is a member FDIC and an Equal Housing Lender. Deposit products are provided by Chase Bank.
          </p>
        </div>
      </div>
    </footer>
  );
};