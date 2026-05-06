import { PathName } from "@/src/@libs/constant/_paths";
import Link from "next/link";
import React from "react";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";

// Social media icons
const SOCIAL_LINKS = [
  { Icon: CgFacebook, label: "Facebook" },
  { Icon: BsTwitter, label: "Twitter" },
  { Icon: BsInstagram, label: "Instagram" },
  { Icon: BsLinkedin, label: "LinkedIn" },
];

// Footer sections
const ABOUT_STORE_LINKS = ["Home", "Become a customer", "About us", "FAQ", "Return policy", "Contact us"];

const USE_CASES_LINKS = ["Use Cases", "Web-designers", "Marketers", "Small Business", "Website Builder"];

const RESOURCES_LINKS = ["Resources", "Academy", "Blog", "Themes", "Hosting", "Developers", "Support"];

const COMPANY_LINKS = [
  { label: "About Us", href: null },
  { label: "Careers", href: null },
  { label: "FAQs", href: null },
  { label: "Terms and Services", href: PathName["terms-and-services"] },
  { label: "Contact Us", href: null },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#E8E8E8] shadow-md w-full relative mt-10 lg:mt-20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-10 pt-7.5 pb-5">
          <div className="w-full flex flex-col gap-5">
            <span className="font-extrabold text-3xl lg:text-5xl text-(--primary-color-900) tracking-tight leading-none">
              🍛 Foody<span className="text-(--primary-color-800)">Vai</span>
            </span>
            <p className="lg:w-2/3 text-[0.9rem] text-(--secondary-color-800)">
              FoodyVai is an innovative agri-tech startup based in Bangladesh
              with the vision to create a future where safe agro food is the
              standard, not the exception. We envision and inspire positive
              impact in the world where every individual has access to
              responsibly sourced, safe and nutritious products at its
              originality that support their health and the health of the
              environment.
            </p>
          </div>
          {/* social icon */}
          <div>
            <h3 className="text-[1.2rem] font-semibold text-(--primary-color-800) mb-2">
              Get in touch
            </h3>
            <div className="flex gap-4 mt-4">
              {SOCIAL_LINKS.map(({ Icon, label }) => (
                <a key={label} aria-label={label} className="text-[1.3rem] p-1.5 rounded-full bg-white text-(--primary-color-800) hover:bg-(--primary-color-800) hover:text-(--primary-color-500) shadow-md cursor-pointer transition-colors">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="max-sm:grid grid-cols-1 flex justify-between gap-5 text-(--primary-color-800)">
          <div>
            <h3 className="text-[1.2rem] font-semibold mb-2">About The Store</h3>
            <div className="flex flex-col gap-2 text-black">
              {ABOUT_STORE_LINKS.map((item) => (
                <a key={item} className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[1.2rem] font-semibold mb-2">Use Cases</h3>
            <div className="flex flex-col gap-2 text-black">
              {USE_CASES_LINKS.map((item) => (
                <a key={item} className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[1.2rem] font-semibold mb-2">Resources</h3>
            <div className="flex flex-col gap-2 text-black">
              {RESOURCES_LINKS.map((item) => (
                <a key={item} className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[1.2rem] font-semibold mb-2">Company</h3>
            <div className="flex flex-col gap-2 text-black">
              {COMPANY_LINKS.map((item) => (
                <span key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-[0.9rem] text-(--secondary-color-800) hover:underline cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                      {item.label}
                    </a>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-900 text-center text-[0.8rem] cursor-pointer">
        © 2026 All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
