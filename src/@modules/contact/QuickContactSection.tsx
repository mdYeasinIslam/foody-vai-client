'use client';


import { motion } from 'framer-motion';
import React from 'react';
import QuickContactCard from './QuickContactCard';
import { PathName } from '@/src/@libs/constant/_paths';
import { TbMailBitcoin, TbMessageCircle } from 'react-icons/tb';
import cn from '@/src/@libs/utils/_cn';

interface IProps {
  className?: string;
}
const contactInfo = [
  {
    icon: <TbMailBitcoin />,
    title: "Email",
    subTitle: PathName.social.email,
    description: "Reach out to us via email.",
    href: `mailto:${PathName.social.email}`,
  },
  {
    icon: <TbMessageCircle />,
    title: "Chat",
    subTitle: "Live chat support",
    description: "Chat with our support team.",
    href: `https://wa.me/${PathName.social.whatsApp}`,
  },
];
const QuickContactSection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn(className)}>
      {/* <SectionIntro title="Quick Contact" titlePrefix="Quick" className="mb-16 text-center" /> */}
      <div className="container">
        <div className="wrapper flex flex-wrap w-full justify-evenly gap-4">
          {contactInfo.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: idx * 0.2, ease: 'easeOut' }}
            >
              <QuickContactCard
                icon={item.icon}
                title={item.title}
                subTitle={item.subTitle}
                description={item.description}
                href={item.href}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickContactSection;
