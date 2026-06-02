import cn from '@/src/@libs/utils/_cn'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

interface IProps{
    className?:ClassNameValue
}

const WhyChooseUs :React.FC<IProps>= ({className}) => {
  const features = [
    {
      icon: '🌿',
      title: '100% Fresh Sourcing',
      description: 'We partner directly with local farmers and haats so your food travels the shortest path from soil to plate.'
    },
    {
      icon: '⚡',
      title: 'Express Delivery',
      description: 'Our riders are always nearby. Most orders arrive within 45 minutes across Chittagong.'
    },
    {
      icon: '✅',
      title: 'Quality Guaranteed',
      description: 'Not satisfied? We offer a full refund or free replacement — no questions asked.'
    },
    {
      icon: '🔧',
      title: 'Fair Market Prices',
      description: 'We match or beat local bazaar prices. Daily deals and bundle offers save you even more.'
    }
  ]

  return (
    <div className={cn(className, 'w-full bg-[#014725] px-6 py-16 md:px-12 md:py-20')}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#E5F2E9] text-sm font-semibold mb-3 uppercase tracking-wider">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Quality You Can Taste,<br />Trust You Can Feel
          </h2>
          <p className="text-[#E5F2E9] text-lg">
            FoodyVai isn&lsquo;t just a grocery app — it&lsquo;s your daily kitchen partner.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#0e9b3b] border border-[#008129] rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-[#E5F2E9] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <button className="btn-primary p-3 rounded-full hover:opacity-80 transition-opacity">
            ↓
          </button>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs