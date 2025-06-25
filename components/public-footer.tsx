import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

/**
 * PublicFooter component for the public-facing pages
 * @returns {JSX.Element}
 */
export function PublicFooter() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Demo", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "#" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Liturgical Calendar", href: "#" },
      ],
    },
    {
      title: "Organization",
      links: [
        { label: "About Lolek Productions", href: "#" },
        { label: "Catholic Tech Partnership", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Homily.Build</span>
            </div>
            <p className="text-gray-400">
              Empowering Catholic priests with AI-powered tools for meaningful, contextual homily creation.
            </p>
          </div>
          
          {/* Dynamic Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Lolek Productions. All rights reserved. Built with ❤️ for the Catholic Church.</p>
          <div className="mt-4 md:mt-0">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
