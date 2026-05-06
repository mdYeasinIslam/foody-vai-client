import ComponentHeroBanner from "@/src/@base/components/ComponentHeroBanner";
import { PathName } from "@/src/@libs/constant/_paths";
import cn from "@/src/@libs/utils/_cn";
import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const TermsAndServices: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn(className)}>
      <div className="container bg-gray-50">
        {/* Hero Section */}
        <ComponentHeroBanner bannerImg="/images/terms-condition/term-banner.webp" />

        {/* Content Section */}
        <div className=" max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Introduction */}
          <section className="mb-12">
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
          </section>

          {/* Important Notice */}
          <section className="mb-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Important Notice
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 font-bold">•</span>
                <span>
                  Customers are advised to read and understand our Privacy
                  Policy carefully, as by accessing the website/app you agree to
                  be bound by the terms and conditions of the Privacy Policy.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 font-bold">•</span>
                <span>
                  If you do not agree with our Privacy Policy, please do not use
                  or access the website/app.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 font-bold">•</span>
                <span>
                  We recommend periodically reviewing our Privacy Policy as it
                  may change without notice.
                </span>
              </li>
            </ul>
          </section>

          {/* Information Collection */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Collection, Storage and Use of Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We automatically track certain information about you based upon
              your behavior on the website to do internal research on our
              users&lsquo; demographics, interests, and behavior. This includes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                "Identifiers (name, email, phone number, etc.)",
                "Protected classifications (gender, age)",
                "Commercial information (purchase history)",
                "Internet activity (browse/search history)",
                "Geo-location data",
                "Audio/visual information",
                "Inferences about preferences",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start bg-white p-4 rounded border border-gray-200"
                >
                  <span className="text-green-500 mr-3 font-bold">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Data Protection & Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Company has appropriate physical, electronic and managerial
              procedures to protect your information. However, transmissions
              over the Internet cannot be absolutely secure.
            </p>
            <div className="bg-amber-50 border border-amber-200 p-6 rounded">
              <p className="text-amber-900 font-semibold mb-2">
                ⚠️ Security Alert
              </p>
              <p className="text-amber-800 text-sm">
                The Company will never ask you to share sensitive data via email
                or telephone. If you receive such a request, do not respond and
                contact us at <strong>info@borobazar.com</strong>.
              </p>
            </div>
          </section>

          {/* Permitted Uses */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Permitted Uses of Your Information
            </h2>
            <ul className="space-y-3 text-gray-700">
              {[
                "Performing services and maintaining accounts",
                "Processing payments and fulfilling orders",
                "Providing customer service and analytics",
                "Detecting security incidents and fraud",
                "Debugging and identifying errors",
                "Technological development and improvement",
                "Verifying quality and safety of services",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-600 mr-3 font-bold">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-gray-100 p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Questions About Our Terms?
            </h3>
            <p className="text-gray-700 mb-4">
              Please contact us for any clarifications
            </p>
            <a
              href="mailto:info@borobazar.com"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              info@foodyVai.com
            </a>
          </section>
        </div>
      </div>
    </section>
  );
};

export default TermsAndServices;
