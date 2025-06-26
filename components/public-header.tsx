import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { BookOpen } from "lucide-react";

/**
 * PublicHeader component for the public-facing pages
 * @param {Object} props
 * @param {string} props.currentPath - The current path for highlighting active links
 * @returns {JSX.Element}
 */
export function PublicHeader({ currentPath = "/" }) {
  const navItems = [
    { label: "How It Works", href: "/how-it-works" },
  ];

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">Homily.Build</span>
          </Link>
        </div>
        
        <div className="hidden md:flex gap-6 items-center font-medium">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`hover:text-indigo-600 transition-colors ${
                currentPath === item.href ? "text-indigo-600 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <AuthButton />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
