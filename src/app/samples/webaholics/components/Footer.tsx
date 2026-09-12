import Image from "next/image";
import Link from "next/link";

const serviceLinks = [
  { href: "https://www.webaholics.ai/services/web-design", label: "Web Design" },
  { href: "https://www.webaholics.ai/services/web-development", label: "Web Development" },
  { href: "https://www.webaholics.ai/services/ecommerce", label: "E-Commerce" },
  { href: "/ai-seo-services", label: "AI SEO & AEO" },
  { href: "https://www.webaholics.ai/services/digital-marketing", label: "Digital Marketing" },
];

const companyLinks = [
  { href: "https://www.webaholics.ai/about", label: "About" },
  { href: "https://www.webaholics.ai/portfolio", label: "Portfolio" },
  { href: "https://www.webaholics.ai/clients", label: "Clients" },
  { href: "https://www.webaholics.ai/blog", label: "Blog" },
  { href: "https://www.webaholics.ai/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-6 lg:px-8 border-t border-white/5 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/samples/webaholics">
              <Image
                src="/Webaholics_text-web-white.png"
                alt="Webaholics"
                width={160}
                height={40}
                className="h-8 w-auto mb-6"
              />
            </Link>
            <p className="text-neutral-400 max-w-sm mb-6">
              AI growth for commerce. Strategy, marketing and development from a team focused on your results. Websites, ecommerce and custom applications, accelerated by AI.
            </p>
            <div className="space-y-2 text-sm text-neutral-400">
              <p>
                <span className="text-neutral-500">Address:</span>{" "}
                7633 S Main St, Midvale, UT 84047
              </p>
              <p>
                <span className="text-neutral-500">Phone:</span>{" "}
                <a href="tel:8018903839" className="hover:text-white transition-colors">(801) 890-3839</a>
              </p>
              <p>
                <span className="text-neutral-500">Email:</span>{" "}
                <a href="mailto:info@webaholics.co" className="hover:text-white transition-colors">info@webaholics.co</a>
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <div className="space-y-3">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <div className="space-y-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {currentYear} Webaholics. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-neutral-500">
            <Link href="https://www.webaholics.ai/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="https://www.webaholics.ai/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

