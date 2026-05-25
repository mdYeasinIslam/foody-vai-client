import cn from "@/src/@libs/utils/_cn";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const NewsletterSection: React.FC<IProps> = ({ className }) => {
  return (
    <section
      className={cn(className, " container mx-auto py-16 mt-10")}
      style={{ backgroundColor: "var(--primary-color-600)" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--primary-color-900)" }}
        >
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-6" style={{ color: "var(--primary-color-800)" }}>
          Get weekly food tips, recipes, and wellness advice delivered to your
          inbox.
        </p>
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded border"
            style={{ borderColor: "var(--primary-color-700)" }}
          />
          <button className="btn-primary">Subscribe</button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
