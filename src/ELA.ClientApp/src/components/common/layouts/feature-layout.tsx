import React, { type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

import { Head } from '@/components/common/head';
import { cn } from '@/lib/utils';

type FeatureLayoutProps = {
  title?: string;
  description?: string;
  toolbar?: ReactNode;
  children: ReactNode;
  className?: string;
};

const FeatureLayout: React.FC<FeatureLayoutProps> = ({
  title,
  description,
  toolbar,
  children,
  className,
}) => (
  <section className={cn('flex flex-1 flex-col', className)}>
    {title && <Head title={title} description={description} />}
    <div className='flex-1'>
      <div className='flex justify-between items-center'>
        <div>
          {title && <h1 className='text-3xl font-bold'>{title}</h1>}
          {description && (
            <p className='text-muted-foreground'>{description}</p>
          )}
        </div>

        <div>{toolbar}</div>
      </div>

      {children}
    </div>

    <footer className='text-center text-sm text-muted-foreground font-semibold mt-8'>
      © {new Date().getFullYear()}{' '}
      <Link
        to='https://github.com/Aspodel'
        className='hover:underline underline-offset-4'
      >
        Aspodel
      </Link>
      . All rights reserved.
    </footer>
  </section>
);

export default FeatureLayout;
