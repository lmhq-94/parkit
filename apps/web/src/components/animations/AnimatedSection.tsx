import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { useScrollAnimation, useDirectionalAnimation, useScaleAnimation, useFadeAnimation, useRotationAnimation } from '../../hooks/useScrollAnimation';

interface AnimatedSectionProps extends BoxProps {
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'stagger';
  delay?: number;
  duration?: number;
  threshold?: number;
  children: React.ReactNode;
  staggerDelay?: number;
  staggerIndex?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  animationType = 'fade',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  children,
  staggerDelay = 0,
  staggerIndex = 0,
  ...boxProps
}) => {
  const totalDelay = delay + (staggerDelay * staggerIndex);
  
  let animationHook;
  
  switch (animationType) {
    case 'slideUp':
      animationHook = useDirectionalAnimation('up');
      break;
    case 'slideDown':
      animationHook = useDirectionalAnimation('down');
      break;
    case 'slideLeft':
      animationHook = useDirectionalAnimation('left');
      break;
    case 'slideRight':
      animationHook = useDirectionalAnimation('right');
      break;
    case 'scale':
      animationHook = useScaleAnimation(0.8);
      break;
    case 'rotate':
      animationHook = useRotationAnimation(-10);
      break;
    default:
      animationHook = useFadeAnimation();
  }

  const { elementRef, isVisible } = animationHook;

  const getAnimationStyles = () => {
    const baseTransition = `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${totalDelay}s`;
    
    switch (animationType) {
      case 'fade':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'none' : 'none',
          transition: baseTransition,
        };
      
      case 'slideUp':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
          transition: baseTransition,
        };
      
      case 'slideDown':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-60px)',
          transition: baseTransition,
        };
      
      case 'slideLeft':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(60px)',
          transition: baseTransition,
        };
      
      case 'slideRight':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
          transition: baseTransition,
        };
      
      case 'scale':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
          transition: baseTransition,
        };
      
      case 'rotate':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'rotate(0deg)' : 'rotate(-10deg)',
          transition: baseTransition,
        };
      
      default:
        return {
          opacity: isVisible ? 1 : 0,
          transform: 'none',
          transition: baseTransition,
        };
    }
  };

  return (
    <Box
      ref={elementRef}
      sx={{
        ...getAnimationStyles(),
        ...boxProps.sx,
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

// Componente para animaciones en cascada (stagger)
export const StaggeredContainer: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
}> = ({ children, staggerDelay = 0.1, animationType = 'slideUp' }) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <AnimatedSection
          key={index}
          animationType={animationType}
          staggerDelay={staggerDelay}
          staggerIndex={index}
        >
          {child}
        </AnimatedSection>
      ))}
    </>
  );
};

// Componente para animaciones de entrada con efecto parallax
export const ParallaxSection: React.FC<{
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
}> = ({ children, speed = 0.5, direction = 'up' }) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <Box
      ref={elementRef}
      sx={{
        transform: isVisible 
          ? `translateY(${direction === 'up' ? '-' : ''}${window.scrollY * speed}px)`
          : 'none',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </Box>
  );
};

// Componente para animaciones de texto con efecto de escritura
export const TypewriterText: React.FC<{
  text: string;
  speed?: number;
  delay?: number;
}> = ({ text, speed = 50, delay = 0 }) => {
  const [displayText, setDisplayText] = React.useState('');
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  React.useEffect(() => {
    if (isVisible && displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [isVisible, displayText, text, speed]);

  return (
    <Box ref={elementRef}>
      {displayText}
      {displayText.length < text.length && (
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            background: 'currentColor',
            animation: 'blink 1s infinite',
            '@keyframes blink': {
              '0%, 50%': { opacity: 1 },
              '51%, 100%': { opacity: 0 },
            },
          }}
        />
      )}
    </Box>
  );
}; 