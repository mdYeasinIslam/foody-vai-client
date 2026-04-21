interface IProps {
  params: Promise<{ category: string; id: string }>;
}

const SubcategoryPage:React.FC<IProps> = async ({ params }) => {
  const { category, id } = await params;
  const data = await params
  console.log(data);

  return (
    <div>
      <h1>Category: {category}</h1>
      <h2>Subcategory: {id}</h2>
      {/* filtered product list will go here */}
    </div>
  );
};

export default SubcategoryPage;
