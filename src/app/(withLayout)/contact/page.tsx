import BaseComponentHeroBanner from "@/src/@base/components/BaseComponentHeroBanner";
import FormSection from "@/src/@modules/contact/FormSection";
import QuickContactSection from "@/src/@modules/contact/QuickContactSection";
import React from "react";
// const faqData = [
//   {
//     id: 1,
//     question: 'What is Wage and how does it help me as a worker?',
//     answer:
//       'Wage is a platform that connects skilled workers with verified overseas employers, training providers, and migration services. You can assess your employability, build a digital career passport, and express interest in real jobs.',
//     defaultOpen: true,
//   },
//   {
//     id: 2,
//     question: 'What are the basic eligibility requirements?',
//     answer:
//       'Typically 2-5 years experience, relevant trade certificates, good physical health, and often basic English. Age generally 21-50.',
//     defaultOpen: false,
//   },
//   {
//     id: 3,
//     question: "What's the application process?",
//     answer:
//       'Submit CV & documents, skill assessment/interview, client interview, offer, medical & visa processing, then pre-departure briefing.',
//     defaultOpen: false,
//   },
//   {
//     id: 4,
//     question: 'What costs do candidates pay?',
//     answer:
//       'Candidates generally pay no agency service fees. You are responsible for visa fees, medical exams, PCC, and sometimes airfare (as specified in offer).',
//     defaultOpen: false,
//   },
//   {
//     id: 5,
//     question: 'Is accommodation, food, or transport provided overseas?',
//     answer:
//       'Often, yes. Many employers provide company accommodation, transportation to work, and sometimes food or an allowance. Details are in your contract.',
//     defaultOpen: false,
//   },
// ];
const page = () => {
  return (
    <React.Fragment>
      {/* <HeroSection className="bg-[#F7FEE7] py-14" /> */}
      <BaseComponentHeroBanner title="Contact Us" bannerImg="/images/terms-condition/term-banner.webp" />
      <FormSection className="py-10 md:py-20 bg-[#FBF9F5]" />
      <QuickContactSection className="py-10 md:py-20 bg-[#FBF9F5]" />
    </React.Fragment>
  );
};

export default page;
