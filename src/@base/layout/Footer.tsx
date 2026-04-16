import React from "react";

// react icons
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#E8E8E8]  shadow-md  w-full  relative mt-10 lg:mt-20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-10 pt-7.5 pb-5">
          <div className=" w-full flex flex-col gap-5 ">
            <span className="font-extrabold text-3xl lg:text-5xl text-(--primary-color-900) tracking-tight leading-none">
              🍛 Foody<span className="text-(--primary-color-800)">Vai</span>
            </span>
            <p className="lg:w-2/3 text-[0.9rem] text-(--secondary-color-800) ">
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
            <h3 className="text-[1.2rem]  font-semibold text-(--primary-color-800) mb-2">
              Get in touch
            </h3>
            <div className="w-fit  h-fit flex gap-4 text-black mt-4">
              <a className="text-[1.3rem] hover:bg-(--primary-color-800) p-1.5 cursor-pointer rounded-full bg-white text-(--primary-color-800) hover:text-(--primary-color-500) shadow-md">
                <CgFacebook />
              </a>
              <a className="text-[1.2rem] hover:bg-(--primary-color-800) p-1.5 cursor-pointer rounded-full bg-white text-(--primary-color-800) hover:text-(--primary-color-500) shadow-md">
                <BsTwitter />
              </a>
              <a className="text-[1.2rem] hover:bg-(--primary-color-800) p-1.5 cursor-pointer rounded-full bg-white text-(--primary-color-800) hover:text-(--primary-color-500) shadow-md">
                <BsInstagram />
              </a>
              <a className="text-[1.2rem] hover:bg-(--primary-color-800) p-1.5 cursor-pointer rounded-full bg-white text-(--primary-color-800) hover:text-(--primary-color-500) shadow-md">
                <BsLinkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="max-sm:grid grid-cols-1 flex  justify-between gap-5 text-(--primary-color-800)">
          <div className="">
            <h3 className="text-[1.2rem]  font-semibold  mb-2">
              About The Store
            </h3>
            <div className="flex flex-col gap-2 text-black">
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Home
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Become a customer
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  About us
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  FAQ
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Return policy
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Contact us
                </a>
              </span>
            </div>
          </div>

          <div className="">
            <h3 className="text-[1.2rem]  font-semibold  mb-2">
              Use Cases
            </h3>
            <div className="flex flex-col gap-2 text-black">
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Use Cases
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Web-designers
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Marketers
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Small Business
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Website Builder
                </a>
              </span>
            </div>
          </div>

          <div className="">
            <h3 className="text-[1.2rem]  font-semibold  mb-2">
              Resources
            </h3>
            <div className="flex flex-col gap-2 text-black">
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Resources
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Academy
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Blog
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Themes
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Hosting
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Developers
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Support
                </a>
              </span>
            </div>
          </div>

          <div className="">
            <h3 className="text-[1.2rem]  font-semibold  mb-2">
              Company
            </h3>
            <div className="flex flex-col gap-2 text-black">
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  About Us
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Careers
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  FAQs
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Teams
                </a>
              </span>
              <span>
                <a className="text-[0.9rem] text-(--secondary-color-800) cursor-pointer">
                  Contact Us
                </a>
              </span>
            </div>
          </div>
        </div>
        {/* social icon */}
        {/* <div className="flex gap-4 text-black mt-4">
          <a className="text-[1.3rem] hover:bg-(--primary-color-800) p-1.5 cursor-pointer rounded-full bg-white text-(--primary-color-800) hover:text-(--primary-color-500) shadow-md">
            <CgFacebook />
          </a>
          <a className="text-[1.2rem] hover:bg-(--primary-color-800) p-1.5 cursor-pointer rounded-full bg-white text-(--primary-color-800) hover:text-(--primary-color-500) shadow-md">
            <BsTwitter />
          </a>
          <a className="text-[1.2rem] hover:bg-(--primary-color-800) p-1.5 cursor-pointer rounded-full bg-white text-(--primary-color-800) hover:text-(--primary-color-500) shadow-md">
            <BsInstagram />
          </a>
          <a className="text-[1.2rem] hover:bg-(--primary-color-800) p-1.5 cursor-pointer rounded-full bg-white text-(--primary-color-800) hover:text-(--primary-color-500) shadow-md">
            <BsLinkedin />
          </a>
        </div> */}
      </div>
      <p className="text-gray-900 text-center text-[0.8rem] cursor-pointer ">
        © 2026 All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
