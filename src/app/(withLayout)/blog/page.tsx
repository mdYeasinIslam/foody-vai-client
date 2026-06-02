import BaseComponentHeroBanner from "@/src/@base/components/BaseComponentHeroBanner";
import BlogPostSection from "@/src/@modules/blog/BlogPostSection";
import NewsletterSection from "@/src/@modules/blog/NewsletterSection";

const BlogPage = () => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--secondary-color-500)" }}
    >
      {/* <section
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
      </section> */}
      <BaseComponentHeroBanner
        title="Read Food Blogs"
        bannerImg="/images/terms-condition/term-banner.webp"
      />

      <BlogPostSection />
      <NewsletterSection />
    </div>
  );
};

export default BlogPage;
