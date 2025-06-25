import { ThemeSwitcher } from "@/components/theme-switcher";

export function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
