import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, WA_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300",
          "bg-background shadow-sm",
          isScrolled ? "h-20" : "h-24",
          !isScrolled && !isMobileMenuOpen && "lg:bg-transparent lg:shadow-none"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8 w-full">
          <nav className="flex items-center justify-between">
            <a href="#" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Medicina Sativa"
                draggable={false}
                className={cn(
                  "w-auto object-contain transition-all duration-300",
                  isScrolled ? "h-14" : "h-18 md:h-20"
                )}
              />
            </a>

            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="rounded-lg px-6">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  Agendar Consulta
                </a>
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 z-50 bg-background shadow-lg border-t border-border">
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <Button asChild className="rounded-lg mt-2">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    Agendar Consulta
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;