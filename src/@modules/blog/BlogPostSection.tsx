"use client";
import { blogPosts } from "@/src/@libs/data/blogData";
import cn from "@/src/@libs/utils/_cn";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const categoryName = ["All", "Nutrition", "Recipes", "Sustainability"];
const BlogPostSection: React.FC<IProps> = ({ className }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setFilteredPosts(
      category === "All"
        ? blogPosts
        : blogPosts.filter((post) => post.category === category),
    );
  };
  return (
    <section className={cn(className)}>
      <div className="container mx-auto lg:mt-10">
        <div
          className="py-8 px-4 border-b"
          style={{ borderColor: "var(--primary-color-600)" }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categoryName?.map((cat, idx) => (
              <button
                key={idx}
                className="btn-primary "
                onClick={() => handleCategoryChange(cat)}
                style={
                  activeCategory === cat
                    ? {
                        backgroundColor: "var(--primary-color-800)",
                        color: "white",
                      }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts?.map((post) => (
            <article
              key={post.id}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src={post?.image}
                  alt={post?.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded"
                    style={{
                      backgroundColor: "var(--primary-color-500)",
                      color: "var(--primary-color-800)",
                    }}
                  >
                    {post.category}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--secondary-color-700)" }}
                  >
                    {post.readTime}
                  </span>
                </div>

                <h3
                  className="text-xl font-bold mb-2 line-clamp-2"
                  style={{ color: "var(--primary-color-900)" }}
                >
                  {post.title}
                </h3>

                <p
                  className="text-sm mb-4 line-clamp-2"
                  style={{ color: "var(--secondary-color-800)" }}
                >
                  {post.excerpt}
                </p>

                <div
                  className="flex justify-between items-center text-xs mb-4"
                  style={{ color: "var(--secondary-color-700)" }}
                >
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>

                <Link href={`/blog/${post.id}`}>
                  <button className="btn-primary w-full">Read More</button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPostSection;
