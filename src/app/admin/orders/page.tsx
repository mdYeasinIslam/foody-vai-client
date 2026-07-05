import OrderPage from "@/src/@modules/admin/components/content/orders/OrderPage";
import AdminHeader from "@/src/@modules/admin/components/layout/AdminHeader";

const page = () => {
  return (
    <>
      <AdminHeader pageTitle="ORDERS DATA" />
      <OrderPage />
    </>
  );
};

export default page;
