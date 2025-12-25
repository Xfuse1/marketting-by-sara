import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primary pointer-events-none z-50 hidden md:block mix-blend-difference"
      animate={{
        x: mousePos.x - 12,
        y: mousePos.y - 12,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(15, 148, 185, 0.3)' : 'transparent'
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  );
};

export default CustomCursor;
