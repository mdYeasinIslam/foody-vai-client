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

export const blogPosts: BlogPost[] = [
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
