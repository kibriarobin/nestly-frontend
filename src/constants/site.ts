export const SITE_NAME = "Nestly";

export const SITE_CONTACT = {
  email: "support@nestly.com",
  phone: "+880 1700-000000",
  address: "House 12, Road 5, Banani, Dhaka 1213, Bangladesh",
  hours: "Sat – Thu, 9:00 AM – 6:00 PM",
} as const;

export const FOOTER_LINK_GROUPS = [
  {
    title: "Explore",
    links: [
      { title: "Properties", href: "/properties" },
      { title: "Flats", href: "/flats" },
      { title: "Rooms", href: "/rooms" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "How it works", href: "/how-it-works" },
      { title: "FAQ", href: "/faq" },
      { title: "Contact", href: "/contact" },
    ],
  },
] as const;
