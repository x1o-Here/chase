import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "About Us": [
      { label: "About Chase", href: "https://www.chase.com/digital/resources/about-chase" },
      { label: "Careers", href: "https://www.jpmorganchase.com/careers" },
      { label: "JPMorganChase", href: "https://www.jpmorganchase.com/" },
      { label: "Media Center", href: "https://media.chase.com/" },
    ],
    "Legal": [
      { label: "Terms of Use", href: "https://www.chase.com/digital/resources/terms-of-use" },
      { label: "Privacy", href: "https://www.chase.com/digital/resources/privacy-security/privacy/online-privacy-policy" },
      { label: "Security", href: "https://www.chase.com/digital/resources/privacy-security" },
      { label: "Accessibility", href: "https://www.chase.com/digital/resources/accessibility" },
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
              <Image
                src="/octogon-white.avif"
                alt="Octogon Icon"
                width={32}
                height={32}
                className="rounded-lg object-cover"
              />
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