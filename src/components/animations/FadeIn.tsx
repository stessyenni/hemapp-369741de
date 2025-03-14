
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const FadeIn = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.4,
  once = true,
  className,
  ...props
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once]);

  const getDirectionStyles = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-8';
      case 'down':
        return 'translate-y-[-8px]';
      case 'left':
        return 'translate-x-8';
      case 'right':
        return 'translate-x-[-8px]';
      default:
        return 'translate-y-8';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        isVisible
          ? 'opacity-100 transform-none'
          : `opacity-0 ${getDirectionStyles()}`,
        className
      )}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeIn;
