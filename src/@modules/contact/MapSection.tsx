'use client';
import SectionIntro from '@base/components/SectionIntro';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
interface IProps {
  className?: string;
}
const MapSection: React.FC<IProps> = ({ className }) => {
  const address = [
    { title: 'Sydney', address: '123 Sample St, Sydney NSW 2000 AU' },
    { title: 'New York', address: '123 Sample St, Sydney NSW 2000 AU' },
    { title: 'London', address: '123 Sample St, Sydney NSW 2000 AU' },
  ];
  return (
    <section className={className}>
      {/* <div className="container">
        <div>
          {' '}
          <SectionIntro
            titlePrefix="Who We Help"
            title="Built for Everyone in the Hiring Ecosystem"
            className="text-center mb-16 max-w-3xl mx-auto"
          />
        </div>
        <div className="">
          <div className=" flex flex-col items-center justify-center gap-12">
            {address?.map((add, idx) => {
              return (
                <div key={idx}>
                  <h3 className="text-xl font-medium text-[#00442A]">{add.title}</h3>
                  <p className="text-sm ">{add.address}</p>
                </div>
              );
            })}
          </div>
          <motion.div
            className="image_wrapper md:px-14 lg:px-0 flex items-center "
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src="/images/formImg.png"
              alt="Our Purpose"
              layout="responsive"
              width={500}
              height={500}
              className=" rounded-lg"
            />
          </motion.div>
        </div>
      </div> */}

      <div className="container">
        <div>
          <SectionIntro
            titlePrefix="Who We Help"
            title="Built for Everyone in the Hiring Ecosystem"
            className="text-center mb-16 max-w-md xl:max-w-xl mx-auto"
          />
        </div>
        <div className="wrapper max-w-7xl mx-auto  grid grid-cols-1 lg:grid-cols-2  gap-y-10 lg:gap-y-0">
          <div className="   content_wrapper  ">
            <div className=" flex flex-col gap-8 xl:gap-12">
              {address?.map((add, idx) => {
                return (
                  <div
                    key={idx}
                    className={`pl-3 md:pl-8 ${idx == 0 && 'border-l-2 border-[#9AE600]'} space-y-2 md:space-y-3 xl:space-y-4`}
                  >
                    <h3 className="text-xl md:text-2xl font-medium text-[#00442A]">{add.title}</h3>
                    <p className="text-sm md:text-lg text-[#344054] ">{add.address}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* image section */}
          <motion.div
            className="w-full h-full image_wrapper  "
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src="/images/mapImage.png"
              alt="Our Purpose"
              layout="responsive"
              width={500}
              height={500}
              className="w-full h-full rounded-lg object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default MapSection;
