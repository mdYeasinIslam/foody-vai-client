import cn from '@/src/@libs/utils/_cn';
import React from 'react';

interface IProps {
  className?: string;
  icon: React.ReactNode;
  title: string;
  subTitle: string;
  description: string;
  href?: string;
}

const QuickContactCard: React.FC<IProps> = ({ className, icon, title, subTitle, description, href }) => {
  return (
    <>
      {href ? (
        <a
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          className={cn(className, 'block border hover:border-gray-400 rounded-xl p-5')}
        >
          <div className="flex items-center gap-2 mb-4 text-(--color-primary-900)">
            <div className="w-12 h-12 rounded-full bg-lime-100 text-lime-800 p-3 flex justify-center items-center">
              {icon}
            </div>
            <p className="text-gray-700 text-lg">{title}</p>
          </div>
          <p className="text-lg font-medium">{subTitle}</p>
          <p className="text-lg font-medium">{description}</p>
        </a>
      ) : (
        <div className={cn(className, 'block border hover:border-gray-400 rounded-xl p-5')}>
          <div className="flex items-center gap-2 mb-4 text-(--color-primary-900)">
            <div className="w-12 h-12 rounded-full bg-lime-100 text-lime-800 p-3 flex justify-center items-center">
              {icon}
            </div>
            <p className="text-gray-700 text-lg">{title}</p>
          </div>
          <p className="text-lg font-medium">{subTitle}</p>
          <p className="text-lg font-medium">{description}</p>
        </div>
      )}
    </>
  );
};

export default QuickContactCard;
