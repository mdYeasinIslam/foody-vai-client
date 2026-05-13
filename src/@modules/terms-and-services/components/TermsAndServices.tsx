import BaseComponentHeroBanner from "@/src/@base/components/BaseComponentHeroBanner";
import cn from "@/src/@libs/utils/_cn";
import React from "react";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { ClassNameValue } from "tailwind-merge";

interface IProps {
  className?: ClassNameValue;
}

// Notice items
const NOTICE_ITEMS = [
  {
    id: 1,
    text: "Customers are advised to read and understand our Privacy Policy carefully, as by accessing the website/app you agree to be bound by the terms and conditions of the Privacy Policy.",
  },
  {
    id: 2,
    text: "If you do not agree with our Privacy Policy, please do not use or access the website/app.",
  },
  {
    id: 3,
    text: "We recommend periodically reviewing our Privacy Policy as it may change without notice.",
  },
];

// Information collection items
const INFORMATION_ITEMS = [
  { id: 1, text: "Identifiers (name, email, phone number, etc.)" },
  { id: 2, text: "Protected classifications (gender, age)" },
  { id: 3, text: "Commercial information (purchase history)" },
  { id: 4, text: "Internet activity (browse/search history)" },
  { id: 5, text: "Geo-location data" },
  { id: 6, text: "Audio/visual information" },
  { id: 7, text: "Inferences about preferences" },
];

// Permitted uses items
const PERMITTED_USES = [
  {
    id: 1,
    text: "Performing services and maintaining accounts",
  },
  { id: 2, text: "Processing payments and fulfilling orders" },
  { id: 3, text: "Providing customer service and analytics" },
  { id: 4, text: "Detecting security incidents and fraud" },
  { id: 5, text: "Debugging and identifying errors" },
  { id: 6, text: "Technological development and improvement" },
  { id: 7, text: "Verifying quality and safety of services" },
];

const TermsAndServices: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn(className)}>
        <BaseComponentHeroBanner bannerImg="/images/terms-condition/term-banner.webp" className='max-w-500 mx-auto'/>
      <div className="container bg-gray-50">

        <div className=" max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xl font-semibold mb-5">
              Last updated: February 18, 2021
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              &quot;KhucraBazar&quot; is a trademark of FoodyVai Private Limited
              (&quot;Company&quot;), a company incorporated under the Companies
              Act, 2013 with its registered and corporate office at Plot 64H,
              Sector 18, Gudgeon 122001 in the course of its business. The
              domain name grocers.com is owned by the Company.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you are a California resident, the information below also
              applies to you. Certain terms used in this section have the
              meanings given to them in the California Consumer Privacy Act of
              2018 ( &quot;CCPA&quot; ).
            </p>
          </div>

          {/*  notice  section*/}
          <div className="mb-12 bg-(--primary-color-500) border-l-4 border-(--primary-color-800) p-2 md:p-6 rounded">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 md:mb-4">
              Important Notice
            </h2>
            <ul className="space-y-3 text-gray-700">
              {NOTICE_ITEMS.map((item) => (
                <li key={item.id} className="flex items-start">
                  <span className="min-h-1 min-w-1 h-fit rounded-full bg-(--primary-color-800) mr-3 font-bold mt-2.5" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* information collection section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Collection, Storage and Use of Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              We automatically track certain information about you based upon
              your behavior on the website to do internal research on our
              users&lsquo; demographics, interests, and behavior. This includes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-6">
              {INFORMATION_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start bg-white p-1 rounded border border-gray-200"
                >
                  <span className="min-h-1 min-w-1 h-fit rounded-full bg-(--primary-color-800) mr-3 font-bold mt-2.5" />
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* data protection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Data Protection & Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              The Company has appropriate physical, electronic and managerial
              procedures to protect your information. However, transmissions
              over the Internet cannot be absolutely secure.
            </p>
            <div className="bg-amber-50 border border-amber-200 p-2 md:p-6 rounded">
              <p className="flex items-center  gap-2 text-amber-900 font-semibold mb-2">
                <TbAlertTriangleFilled className="text-2xl text-yellow-500" />
                Security Alert
              </p>
              <p className="text-amber-800 text-sm">
                The Company will never ask you to share sensitive data via email
                or telephone. If you receive such a request, do not respond and
                contact us at <strong>info@foodyVai.com</strong>.
              </p>
            </div>
          </div>

          {/* permitted uses */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Permitted Uses of Your Information
            </h2>
            <ul className="space-y-3 text-gray-700">
              {PERMITTED_USES.map((item) => (
                <li key={item.id} className="flex sm:items-start ">
                  <span className="min-h-1 min-w-1 h-fit rounded-full bg-(--primary-color-800) mr-3 font-bold mt-2.5" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndServices;
