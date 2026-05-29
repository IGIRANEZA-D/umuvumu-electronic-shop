'use client';

import * as Icons from 'lucide-react';
import { LucideIcon, LucideProps } from 'lucide-react';

interface CategoryIconProps extends LucideProps {
  name: string;
}

/**
 * Maps category icon strings from data.ts to Lucide components
 */
export default function CategoryIcon({ name, ...props }: CategoryIconProps) {
  // Fallback to 'Box' if the icon name is invalid or missing
  const iconMap = Icons as unknown as Record<string, LucideIcon>;
  const IconComponent = iconMap[name] || Icons.Box;

  return <IconComponent {...props} />;
}

/* 
Usage Example:
<CategoryIcon 
  name="Smartphone" 
  size={24} 
  className="text-blue-600" 
/> 
*/
