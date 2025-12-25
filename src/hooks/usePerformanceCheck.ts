import { useState, useEffect } from 'react';

export function usePerformanceCheck() {
    const [isLowPower, setIsLowPower] = useState(false);

    useEffect(() => {
        const checkPerformance = () => {
            // Basic check for mobile or low memory
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            // Check for device memory if available (standard in many Android browsers)
            const memory = (navigator as any).deviceMemory;
            const cores = navigator.hardwareConcurrency;

            if (isMobile && (memory <= 4 || cores <= 4)) {
                setIsLowPower(true);
            }

            // Also check for user's preferred reduced motion
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                setIsLowPower(true);
            }
        };

        checkPerformance();
    }, []);

    return isLowPower;
}
