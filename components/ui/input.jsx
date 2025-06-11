import React from 'react';

export const Input = React.forwardRef(({ className = '', ...props }, ref) => {
  const base = 'px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500';
  const classes = [base, className].filter(Boolean).join(' ');
  return <input ref={ref} className={classes} {...props} />;
});
Input.displayName = 'Input';

