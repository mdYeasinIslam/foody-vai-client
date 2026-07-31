import CategoryPage from "@/src/@modules/admin/components/content/category/CategoryPage";
import AdminHeader from "@/src/@modules/admin/components/layout/AdminHeader";

const page = () => {
  return (
    <>
      <AdminHeader pageTitle="CATEGORY" />
      <CategoryPage />
    </>
  );
};

export default page;
