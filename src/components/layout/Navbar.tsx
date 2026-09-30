import Logo from "./Logo";
import MobileNav from "./MobileNav";
import NavbarActions from "./NavbarActions";
import NavLinks from "./NavLinks";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Logo />
          <NavLinks className="hidden md:flex" />
        </div>
        <div className="flex items-center gap-1">
          <NavbarActions />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}