import {useEffect, useState} from "react";

/**
 * Detects whether the page is currently being viewed on a mobile device.
 * @param breakpointAtWidth number - the width at which a device is no longer
 *                                   considered to be mobile.
 */
const useMobileDetect = (breakpointAtWidth: number) => {
    const [isMobile, setIsMobile] = useState(false);
    const determineIsMobile = () => setIsMobile(window.innerWidth < breakpointAtWidth)

    useEffect(() => {
        determineIsMobile();
        window.addEventListener('resize', determineIsMobile);
        return () => window.removeEventListener('resize', determineIsMobile);
    });

    return {isMobile};
};

export default useMobileDetect;
