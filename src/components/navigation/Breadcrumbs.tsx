import React from 'react';
import Link from 'next/link';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 opacity-70 hover:opacity-100 transition-opacity">
      <ol className="flex items-center space-x-2 text-sm text-muted uppercase tracking-wider">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2 text-gray-600">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
