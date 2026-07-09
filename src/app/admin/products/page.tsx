import ProductsPage from "@/src/@modules/admin/components/content/products/ProductsPage";
import AdminHeader from "@/src/@modules/admin/components/layout/AdminHeader";

const page = () => {
  return (
    <>
      <AdminHeader pageTitle="PRODUCTS DATA" />
      <ProductsPage />
    </>
  );
};

export default page;
