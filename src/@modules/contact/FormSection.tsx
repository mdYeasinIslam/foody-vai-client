'use client';
import React, { useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TelegramService } from '@/src/@libs/services/telegram.service';
import toast from 'react-hot-toast';
import { Input, Select, Button, Form } from 'antd';

interface IProps {
  className?: string;
}

const FormSection: React.FC<IProps> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const handleFinishFn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const contactForm = {
      resetFields: () => {
        setName('');
        setType('');
        setEmail('');
        setMessage('');
      },
    };

    const msg = `
      <b>🆘 New Support Request</b>
      ──────────────────
      <b>🏢 Name / Individual</b>
      <i>${name}</i>

      <b>🏷 Inquiry Type</b>
      <i>${type || 'N/A'}</i>

      <b>📧 Email</b>
      <i>${email}</i>
      
      <b>📧 Message</b>
      <i>${message}</i>

    `;

    const { ok } = await TelegramService.sentMsg(msg);

    if (ok) {
      contactForm.resetFields();
      toast.success('Support request sent successfully!');
    } else {
      toast.error('Failed to send support request. Please try again.');
    }
  };

  return (
    <section className={className}>
      <div className="container">
        <div className="wrapper w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-20 ">
          <div className="w-full h-full rounded-xl bg-white  p-3 md:p-5">
            <h1 className="text-[var(--color-primary-900)] text-3xl mb-5 xl:mb-8">Contact us</h1>
            <form onSubmit={handleFinishFn} className="w-full flex flex-col gap-5">
              <div className="flex gap-6">
                <div className="w-full space-y-2 ">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    type="text"
                    className="rounded-md"
                  />
                </div>
                <div className="w-full space-y-2 ">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    type="email"
                    className="rounded-md"
                  />
                </div>
              </div>
              <div className="w-full space-y-2 ">
                <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700">
                  Inquiry Type
                </label>
                <Select
                  value={type || undefined}
                  onChange={setType}
                  placeholder="Select inquiry type"
                  className="w-full rounded-md"
                  options={[
                    { label: 'General Inquiry', value: 'General Inquiry' },
                    { label: 'Support', value: 'Support' },
                    { label: 'Partnership', value: 'Partnership' },
                    { label: 'Feedback', value: 'Feedback' },
                  ]}
                />
              </div>
              <div className="w-full space-y-2 ">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <Input.TextArea
                  required
                  className="bg-white rounded-md"
                  style={{ minHeight: '120px' }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message"
                />
              </div>
              <div>
                <Button
                  htmlType="submit"
                  className="w-full sm:w-auto font-semibold h-12"
                  style={{
                    background: 'linear-gradient(to right, var(--color-primary-500), var(--color-primary-700))',
                    color: 'white',
                  }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
          {/* image section */}
          <motion.div
            className="image_wrapper flex h-full"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src="/images/formImg.png"
              alt="Our Purpose"
              layout="responsive"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
