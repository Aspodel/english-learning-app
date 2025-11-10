import React from 'react';
import { Link, useLocation } from '@tanstack/react-router';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function Breadcrumbs() {
  const pathname = useLocation().pathname;
  const appPrefix = '/app';
  const cleanPath = pathname.startsWith(appPrefix)
    ? pathname.slice(appPrefix.length)
    : pathname;

  const segments = cleanPath.split('/').filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to='/app'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment: string, index: number) => {
          const href = '/app/' + segments.slice(0, index + 1).join('/');
          const label =
            segment[0].toUpperCase() + segment.slice(1, segment.length);
          const isLast = index === segments.length - 1;
          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
