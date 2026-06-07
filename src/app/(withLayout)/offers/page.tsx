import BaseComponentHeroBanner from "@/src/@base/components/BaseComponentHeroBanner";
import OfferPage from "@/src/@modules/offers/components/OfferPage";

const page = () => {
  return (
    <>
      <BaseComponentHeroBanner
        title="Special Offers"
        bannerImg="/images/terms-condition/term-banner.webp"
      />
      <OfferPage/>
    </>
  );
};

export default page;
