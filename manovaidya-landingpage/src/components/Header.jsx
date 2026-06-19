import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ChevronDown,
  Menu,
  PhoneCall,
  X,
} from "lucide-react";
import logo from "../images/manovaidya-logo (2).png";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Care Services",
    href: "#care-stages",
    hasMenu: true,
    // submenu: [
    //   { label: "Child Development Care", href: "/#children-care" },
    //   { label: "Teen Mental Health Care", href: "/#teen-care" },
    //   { label: "Adult Mental Health Care", href: "/#adult-care" },
    // ],
  },
  { label: "About Us", href: "#about" },
  { label: "Why Manovaidya", href: "#why-manovaidya" },
  { label: "Success Stories", href: "#success-stories" },
  {
    label: "Resources",
    href: "/#resources",
    hasMenu: true,
    submenu: [
      { label: "Blogs", href: "/#blog" },
      { label: "FAQs", href: "/#faqs" },
      { label: "Guides", href: "/about/approach" },
    ],
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <React.Fragment>
      <header className="sticky top-0 z-50 border-b border-[#edf1ee] bg-white shadow-[0_6px_18px_rgba(17,34,29,0.06)]">
        <div className="mx-auto flex h-[72px] items-center justify-between gap-5 px-4 sm:h-[82px] sm:px-6 lg:px-8 xl:grid xl:grid-cols-[240px_minmax(0,1fr)_240px] xl:gap-8 xl:px-10 2xl:grid-cols-[280px_minmax(0,1fr)_280px] 2xl:px-12">
          <Link
            to="/"
            className="flex min-w-0 shrink-0 items-center xl:justify-self-start"
            aria-label="ManoVaidya home"
            onClick={closeMenu}
          >
            <img
              src={logo}
              alt="ManoVaidya"
              className="h-auto w-[clamp(145px,14vw,220px)] object-contain object-left"
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-[clamp(22px,2.4vw,46px)] whitespace-nowrap text-[clamp(14px,0.95vw,17px)] font-extrabold text-[#15172f] xl:flex xl:justify-self-center">
            {navItems.map((item) =>
              item.submenu ? (
                <div key={item.label} className="group relative">
                  <a href={item.href} className="inline-flex items-center transition hover:text-[#065346]">
                    {item.label}
                    <ChevronDown className="ml-1.5 h-4 w-4 stroke-[2.8]" />
                  </a>
                  <div className="invisible absolute left-0 top-full z-50 w-56 pt-5 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-lg border border-[#e2ebe6] bg-white p-2 shadow-[0_18px_42px_rgba(16,44,37,0.14)]">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block rounded-md px-4 py-3 text-[14px] font-extrabold text-[#15172f] transition hover:bg-[#edf7f4] hover:text-[#065346]"
                      >
                        {subItem.label}
                      </a>
                    ))}
                    </div>
                  </div>
                </div>
              ) : item.href.startsWith("/") ? (
                <Link key={item.label} to={item.href} className="transition hover:text-[#065346]">
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} className="transition hover:text-[#065346]">
                  {item.label}
                </a>
              )
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-3 xl:justify-self-end">
            <a
              href="/#consultation"
              className="hidden h-[54px] items-center gap-2 whitespace-nowrap rounded-[9px] bg-[#064f43] px-8 text-[16px] font-extrabold text-white shadow-[0_12px_22px_rgba(6,79,67,0.22)] transition hover:bg-[#043f36] xl:inline-flex"
            >
              Book Consultation
            </a>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#d5e2dc] bg-[#edf7f4] text-[#064f43] shadow-sm transition hover:border-[#b8cfc6] hover:bg-[#e2f1ec] xl:hidden"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen ? (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-[60] bg-[#0f201c]/45 backdrop-blur-[2px] xl:hidden"
          onClick={closeMenu}
        />
      ) : null}

      <aside
        className={`fixed right-0 top-0 z-[70] h-dvh w-[min(86vw,380px)] transform bg-white shadow-[-24px_0_60px_rgba(16,44,37,0.22)] transition-transform duration-300 xl:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="border-b border-[#e1ebe6] bg-[#f6faf8] px-5 py-5">
            <div className="flex items-center justify-between gap-4">
              <img
                src={logo}
                alt="ManoVaidya"
                className="h-auto w-[min(56vw,210px)] object-contain object-left"
              />
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#064f43] shadow-sm ring-1 ring-[#d5e2dc]"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-2 px-5 py-5">
            {navItems.map((item) =>
              item.submenu ? (
                <div key={item.label} className="rounded-lg bg-[#edf7f4] px-3 py-2">
                  <a
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-1 py-2 text-base font-extrabold text-[#064f43]"
                    onClick={closeMenu}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </a>
                  <div className="mt-1 grid gap-1">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="rounded-lg px-4 py-2.5 text-sm font-extrabold text-[#15172f] transition hover:bg-white hover:text-[#064f43]"
                        onClick={closeMenu}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-extrabold text-[#15172f] transition hover:bg-[#edf7f4] hover:text-[#064f43]"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-extrabold text-[#15172f] transition hover:bg-[#edf7f4] hover:text-[#064f43]"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <div className="border-t border-[#e1ebe6] p-5">
            <a
              href="/#consultation"
              className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#064f43] px-5 text-sm font-extrabold text-white shadow-[0_12px_22px_rgba(6,79,67,0.22)] transition hover:bg-[#043f36]"
              onClick={closeMenu}
            >
              <CalendarDays className="h-4 w-4" />
              Book Consultation
            </a>
            <a
              href="tel:+919523435814"
              className="mt-3 flex h-12 items-center justify-center gap-2 rounded-md border border-[#d5e2dc] bg-white px-5 text-sm font-extrabold text-[#064f43] transition hover:bg-[#edf7f4]"
            >
              <PhoneCall className="h-4 w-4" />
              Call Now
            </a>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
}

export default Header;
