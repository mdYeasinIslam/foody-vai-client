import TrackOrderPage from "@/src/@modules/order/components/TrackOrderPage";

const Page = ({ params }: { params: { orderId: string } }) => {
  return <TrackOrderPage orderId={params.orderId} />;
};

export default Page;
