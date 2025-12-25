import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button');

      if (isInteractive) {
        setIsHovering(true);
        // Check if it's a booking or special CTA
        const btnText = target.innerText?.toLowerCase() || '';
        if (btnText.includes('book') || btnText.includes('consultation') || btnText.includes('احجز')) {
          setHoverText('Consultation takes 15 minutes only');
        } else {
          setHoverText('');
        }
      } else {
        setIsHovering(false);
        setHoverText('');
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
    <>
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
      {hoverText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, x: mousePos.x + 20, y: mousePos.y + 20 }}
          className="fixed z-50 pointer-events-none bg-primary text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter"
        >
          {hoverText}
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
