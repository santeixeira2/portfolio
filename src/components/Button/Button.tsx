import { ReactNode, MouseEvent } from 'react';

export interface ButtonProps {
  /** Optional URL, if provided it renders an <a> tag instead of a <button> */
  href?: string;
  
  /** CSS classes to apply */
  className?: string;
  
  /** Contents of the button */
  children: ReactNode;
  
  /** Standard click handler */
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  
  /** CSS selector to scroll into view natively. Overrides default href jump. */
  smoothScrollTarget?: string;
}

export function Button({ 
  href, 
  className = '', 
  children, 
  onClick,
  smoothScrollTarget 
}: ButtonProps) {
  
  const handleClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    // Intercept native anchor jumps for buttery smooth scrolling
    if (smoothScrollTarget) {
      e.preventDefault();
      document.querySelector(smoothScrollTarget)?.scrollIntoView({ behavior: 'smooth' });
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  if (href) {
    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
