import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animationDelay?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    animationDelay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasAnimated || !triggerOnce) {
            setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) {
                setHasAnimated(true);
              }
            }, animationDelay);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce, animationDelay, hasAnimated]);

  return { elementRef, isVisible };
};

// Hook específico para animaciones de entrada desde diferentes direcciones
export const useDirectionalAnimation = (direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
  const { elementRef, isVisible } = useScrollAnimation();

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(60px)';
      case 'down':
        return 'translateY(-60px)';
      case 'left':
        return 'translateX(60px)';
      case 'right':
        return 'translateX(-60px)';
      default:
        return 'translateY(60px)';
    }
  };

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(60px)';
      case 'down':
        return 'translateY(-60px)';
      case 'left':
        return 'translateX(60px)';
      case 'right':
        return 'translateX(-60px)';
      default:
        return 'translateY(60px)';
    }
  };

  return {
    elementRef,
    isVisible,
    getTransform,
    getInitialTransform
  };
};

// Hook para animaciones de escala
export const useScaleAnimation = (initialScale: number = 0.8) => {
  const { elementRef, isVisible } = useScrollAnimation();

  return {
    elementRef,
    isVisible,
    initialScale
  };
};

// Hook para animaciones de opacidad
export const useFadeAnimation = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return {
    elementRef,
    isVisible
  };
};

// Hook para animaciones de rotación
export const useRotationAnimation = (initialRotation: number = -10) => {
  const { elementRef, isVisible } = useScrollAnimation();

  return {
    elementRef,
    isVisible,
    initialRotation
  };
}; 