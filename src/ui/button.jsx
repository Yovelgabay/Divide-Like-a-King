import React from 'react';

export const Button = React.forwardRef(
  ({ variant = 'default', size = 'default', className = '', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none';
    const variants = {
      default: 'bg-purple-500 text-white hover:bg-purple-600',
      outline: 'border border-gray-300 hover:bg-gray-50',
      ghost: 'bg-transparent hover:bg-gray-100',
    };
    const sizes = {
      default: 'px-4 py-2 rounded-md',
      icon: 'p-2 rounded-md',
    };
    const classes = [base, variants[variant] || variants.default, sizes[size] || sizes.default, className]
      .filter(Boolean)
      .join(' ');
    return <button ref={ref} className={classes} {...props} />;
  }
);
Button.displayName = 'Button';

