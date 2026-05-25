"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Healthy Eating: Tips for Nutritious Meals",
    excerpt:
      "Discover how to balance nutrition with taste in your daily meals. Learn practical tips for meal planning that support your wellness goals.",
    date: "Jan 15, 2024",
    author: "Sarah Ahmed",
    category: "Nutrition",
    image: "/images/blog/blog1.jpg",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Farm to Table: Supporting Local Agriculture",
    excerpt:
      "Explore the benefits of choosing locally-sourced ingredients and how it impacts both your health and community.",
    date: "Jan 10, 2024",
    author: "Md Yeasin",
    category: "Sustainability",
    image: "/images/blog/blog2.webp",
    readTime: "7 min",
  },
  {
    id: 3,
    title: "Quick & Easy Recipes for Busy Weeknights",
    excerpt:
      "Master delicious meals in 30 minutes or less. Perfect for professionals juggling work and wellness.",
    date: "Jan 5, 2024",
    author: "Chef Rahman",
    category: "Recipes",
    image: "/images/blog/blog3.jpg",
    readTime: "4 min",
  },
];
const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setFilteredPosts(
      category === "All"
        ? blogPosts
        : blogPosts.filter((post) => post.category === category)
    );
  };
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--secondary-color-500)" }}
    >
      <section
        className="py-16 px-4 md:py-24"
        style={{ backgroundColor: "var(--primary-color-500)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--primary-color-900)" }}
          >
            FoodyVai Blog
          </h1>
          <p className="text-lg" style={{ color: "var(--primary-color-800)" }}>
            Discover nutrition tips, recipes, and food stories from our
            community
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section
        className="py-8 px-4 border-b"
        style={{ borderColor: "var(--primary-color-600)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          {["All", "Nutrition", "Recipes", "Sustainability"].map((cat) => (
            <button
              key={cat}
              className="btn-primary"
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
      </section>

      {/* Blog Posts  */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
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

      {/* Newsletter Section */}
      <section
        className="py-16 px-4"
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
    </div>
  );
};

export default BlogPage;
