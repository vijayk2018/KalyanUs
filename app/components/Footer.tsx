import { ChevronDown, ChevronRight, ChevronUp, Mail, Phone } from 'lucide-react';
import { Suspense, useState, type ReactNode } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Await, Link } from 'react-router';
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

type AccordionId = 'who' | 'help' | 'policies' | 'useful' | 'connect';

const WRITE_TO_US_URL =
  'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=customercare.usa@kalyanjewellers.net';
const CALL_US_URL = 'tel:+18482009694';
const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=18482009694&text&type=phone_number&app_absent=0';

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: <FaFacebook size={18} aria-hidden className="text-[#333]" />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: <FaInstagram size={18} aria-hidden className="text-[#333]" />,
  },
  {
    label: 'X',
    href: 'https://twitter.com',
    icon: <FaXTwitter size={18} aria-hidden className="text-[#333]" />,
  },
];

function policyItemUrl(url: string) {
  return url.startsWith('http') || url.startsWith('/') ? url : `/${url}`;
}

export function Footer({
  footer: footerPromise,
  header: _header,
  publicStoreDomain: _publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => {
          const policies =
            footer?.menu?.items.length
              ? footer.menu.items
              : FALLBACK_FOOTER_MENU.items;

          return (
            <>
              <footer className=" bg-[#333333] text-[#999999]">
                {/* Mobile: accordion */}
                <div className="px-4 pb-8 pt-2 font-sans lg:hidden">
                  <MobileAccordion policies={policies} />

                  <div className="relative my-8 flex items-center justify-center">
                    <div
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dotted border-[#666666]"
                      aria-hidden
                    />
                    <span className="relative bg-[#333333] px-4 text-center text-sm text-[#999999]">
                      Follow us on:
                    </span>
                  </div>

                  <div className="flex justify-center gap-4">
                    {SOCIAL_LINKS.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition hover:opacity-90"
                        aria-label={link.label}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>

                  <form
                    className="mt-10"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      aria-label="Enter your email address"
                      className="w-full rounded-md border-0 bg-white px-4 py-3 text-sm text-[#333333] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#A30014]/40"
                    />
                    <div className="mt-3 flex justify-end">
                      <button
                        type="submit"
                        className="text-sm font-medium uppercase tracking-wide text-[#999999] transition hover:text-white"
                      >
                        <span className="border-b border-[#999999] pb-0.5">
                          Subscribe
                        </span>
                        <span className="ml-1" aria-hidden>
                          &gt;
                        </span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Desktop */}
                <div className="hidden py-12 px-20 text-white lg:block">
                  <div className="mx-auto grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <div className="col-span-2 mx-auto grid grid-cols-1 gap-10 lg:grid-cols-5">
                      <div>
                        <h3 className="mb-4 pb-2 font-serif text-lg font-semibold">
                          Who we are?
                        </h3>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <Link
                              to="/about-us"
                              className="font-serif text-[#999] transition hover:text-white"
                            >
                              About Kalyan Jewellers
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/pages/muhurat"
                              className="font-serif text-[#999] transition hover:text-white"
                            >
                              Muhurat
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/blogs"
                              className="font-serif text-[#999] transition hover:text-white"
                            >
                              Blog
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="mb-4 pb-2 font-serif text-lg font-semibold">
                          Let us help you?
                        </h3>
                        <ul className="flex flex-col space-y-2 text-sm">
                          <li>
                            <Link
                              to="/diamond-guide"
                              className="font-serif text-[#999] transition hover:text-white"
                            >
                              Diamond Guide
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/metal-guide"
                              className="font-serif text-[#999] transition hover:text-white"
                            >
                              Metal Guide
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/gemstone-guide"
                              className="font-serif text-[#999] transition hover:text-white"
                            >
                              Gemstone Guide
                            </Link>
                          </li>
                          <li>
                            <Link to="/size-guide" className="font-serif text-[#999] transition hover:text-white">
                              Size guide
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="mb-4 pb-2 font-serif text-lg font-semibold">
                          Policies
                        </h3>
                        <ul className="flex flex-col space-y-2 text-sm">
                          {/* {policies.map((item) => {
                            if (!item.url || !item.title) return null;
                            const to = policyItemUrl(item.url);
                            const isExternal = to.startsWith('http');
                            return (
                              <li key={item.id}>
                                {isExternal ? (
                                  <a
                                    href={to}
                                    className="font-serif text-[#999] transition hover:text-white"
                                  >
                                    {item.title}
                                  </a>
                                ) : (
                                  <Link
                                    to={to}
                                    className="font-serif text-[#999] transition hover:text-white"
                                  >
                                    {item.title}
                                  </Link>
                                )}
                              </li>
                            );
                          })} */}
                          <li>
                            <Link to="/privacy" className="font-serif text-[#999] transition hover:text-white">
                              Privacy
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="mb-4 pb-2 font-serif text-lg font-semibold">
                          Useful links
                        </h3>
                        <ul className="flex flex-col space-y-2 text-sm">
                          <li>
                            <Link
                              to="/book-appointment"
                              className="font-serif text-[#999] transition hover:text-white"
                            >
                              Book appointment
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/contact-us"
                              className="font-serif text-[#999] transition hover:text-white"
                            >
                              Contact Us
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-span-1">
                      <h3 className="mb-4 pb-4 font-serif text-lg font-semibold">
                        Connect now:
                      </h3>

                      <div className="mb-6 flex items-center gap-[5rem] text-sm">
                        <a
                          href={WRITE_TO_US_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col text-center transition"
                        >
                          <div className="mb-2 flex justify-center">
                            <Mail
                              size={28}
                              aria-hidden
                              className="font-medium text-white"
                            />
                          </div>
                          <p className="text-center font-serif text-[#999] hover:text-white">
                            Write to us
                          </p>
                        </a>
                        <a
                          href={CALL_US_URL}
                          className="flex flex-col items-center text-center transition"
                        >
                          <div className="mb-2 flex justify-center">
                            <Phone
                              size={28}
                              aria-hidden
                              className="font-medium text-white"
                            />
                          </div>
                          <p className="text-center font-serif text-[#999] hover:text-white">
                            Call us
                          </p>
                        </a>
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center text-center transition"
                        >
                          <div className="mb-2 flex justify-center">
                            <FaWhatsapp
                              size={28}
                              aria-hidden
                              className="font-medium text-white"
                            />
                          </div>
                          <p className="text-center font-serif text-[#999] hover:text-white">
                            Whatsapp
                          </p>
                        </a>
                      </div>

                      <div className="mb-6 max-w-[23rem] border-t-2 border-white pt-6">
                        <p className="mb-2 font-serif text-sm text-[#999]">
                          Follow us on:
                        </p>
                        <div className="mt-2 flex space-x-4">
                          {SOCIAL_LINKS.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-white p-2 text-xl transition hover:text-white"
                              aria-label={link.label}
                            >
                              <span aria-hidden className="font-serif">
                                {link.icon}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>

                      <form
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <div className="flex space-x-2">
                          <input
                            type="email"
                            placeholder="Enter your email address"
                            aria-label="Enter your email address"
                            className="flex-grow rounded-md border border-gray-600 bg-white px-3 py-2 font-serif text-sm text-black focus:outline-none focus:ring-2"
                          />
                        </div>
                        <div className="mt-2 flex justify-end">
                          <button
                            type="submit"
                            className="text-sm text-[#999] transition hover:text-white"
                          >
                            <span className="border-b border-[#999] pb-1 font-serif">
                              Subscribe{' '}
                            </span>
                            <ChevronRight
                              size={16}
                              aria-hidden
                              className="ml-1 inline-block"
                            />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </footer>
              <div className="bg-[#cf254a] py-8 text-center font-serif text-sm text-white">
                Copyright © 2026 Kalyan Jewellers. All rights reserved.
              </div>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

function MobileAccordion({
  policies,
}: {
  policies: NonNullable<FooterQuery['menu']>['items'];
}) {
  const [openId, setOpenId] = useState<AccordionId | null>('who');

  const toggle = (id: AccordionId) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const row = (id: AccordionId, title: string, children: ReactNode) => {
    const isOpen = openId === id;
    return (
      <div className="border-b border-[#444444]">
        <button
          type="button"
          onClick={() => toggle(id)}
          className="flex w-full items-center justify-between py-4 text-left text-[#999999] transition hover:text-white"
          aria-expanded={isOpen}
        >
          <span className="text-base">{title}</span>
          {isOpen ? (
            <ChevronUp size={20} strokeWidth={1.5} aria-hidden />
          ) : (
            <ChevronDown size={20} strokeWidth={1.5} aria-hidden />
          )}
        </button>
        {isOpen ? (
          <div className="pb-4 pl-1 text-sm text-[#999999]">{children}</div>
        ) : null}
      </div>
    );
  };

  return (
    <nav aria-label="Footer">
      {row(
        'who',
        'Who we are?',
        <ul className="space-y-3">
          <li>
            <Link
              to="/about-us"
              className="block py-0.5 transition hover:text-white"
            >
              About Kalyan Jewellers
            </Link>
          </li>
          <li>
            <Link
              to="/pages/muhurat"
              className="block py-0.5 transition hover:text-white"
            >
              Muhurat
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="block py-0.5 transition hover:text-white">
              Blog
            </Link>
          </li>
        </ul>,
      )}
      {row(
        'help',
        'Let us help you?',
        <ul className="space-y-3">
          <li>
            <Link to="/diamond-guide" className="block py-0.5 transition hover:text-white">
              Diamond Guide
            </Link>
          </li>
          <li>
            <Link to="/metal-guide" className="block py-0.5 transition hover:text-white">
              Metal Guide
            </Link>
          </li>
          <li>
            <Link to="/gemstone-guide" className="block py-0.5 transition hover:text-white">
              Gemstone Guide
            </Link>
          </li>
          <li>
            <Link to="/size-guide" className="block py-0.5 transition hover:text-white">
              Size guide
            </Link>
          </li>
        </ul>,
      )}
      {row(
        'policies',
        'Policies',
        <ul className="space-y-3">
          {/* {policies.map((item) => {
            if (!item.url || !item.title) return null;
            const to = policyItemUrl(item.url);
            const isExternal = to.startsWith('http');
            return (
              <li key={item.id}>
                {isExternal ? (
                  <a href={to} className="block py-0.5 transition hover:text-white">
                    {item.title}
                  </a>
                ) : (
                  <Link to={to} className="block py-0.5 transition hover:text-white">
                    {item.title}
                  </Link>
                )}
              </li>
            );
          })} */}
          <li>
            <Link to="/privacy" className="block py-0.5 transition hover:text-white">
              Privacy
            </Link>
          </li>
        </ul>,
      )}
      {row(
        'useful',
        'Useful links',
        <ul className="space-y-3">
          <li>
            <Link
              to="/book-appointment"
              className="block py-0.5 transition hover:text-white"
            >
              Book appointment
            </Link>
          </li>
          <li>
            <Link
              to="/contact-us"
              className="block py-0.5 transition hover:text-white"
            >
              Contact Us
            </Link>
          </li>
        </ul>,
      )}
      {row(
        'connect',
        'Connect now:',
        <div className="flex justify-around gap-4 pt-1">
          <a
            href={WRITE_TO_US_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
              <Mail size={22} aria-hidden />
            </span>
            <span className="text-xs">Write to us</span>
          </a>
          <a
            href={CALL_US_URL}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
              <Phone size={22} aria-hidden />
            </span>
            <span className="text-xs">Call us</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
              <FaWhatsapp size={22} aria-hidden className="text-white" />
            </span>
            <span className="text-xs">Whatsapp</span>
          </a>
        </div>,
      )}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};
