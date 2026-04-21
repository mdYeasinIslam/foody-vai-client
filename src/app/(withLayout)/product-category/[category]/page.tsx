interface IProps {
  params: Promise<{ category: string }>;
}

const CategoryPage:React.FC<IProps> = async ({ params }) => {
  const { category } = await params;
console.log(category)
  return (
    <div>
      <h1>Category: {category}</h1>
      {/* product list will go here */}
    </div>
  );
};

export default CategoryPage;
