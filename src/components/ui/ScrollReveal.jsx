import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const ScrollReveal = ({
    children,
    className = '',
    // React Bits style props
    baseOpacity = 1,
    enableBlur = false,
    baseRotation = 0,
    blurStrength = 4,
    // Standard animation props
    delay = 0,
    duration = 0.8,
    ease = 'power3.out',
    from,
    to,
    threshold = 0.1,
    rootMargin = '0px',
    stagger = 0,
    once = true,
    disabled = false,
    // Legacy support for custom from/to
    ...props
}) => {
    const containerRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Build animation states based on React Bits style props or custom from/to
    const defaultFrom = {
        opacity: baseOpacity,
        y: 30,
        rotation: baseRotation,
        filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)'
    };

    const defaultTo = {
        opacity: 1,
        y: 0,
        rotation: 0,
        filter: 'blur(0px)'
    };

    const animationFrom = from || defaultFrom;
    const animationTo = to || defaultTo;

    useEffect(() => {
        if (disabled) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once && !hasAnimated) {
                        setHasAnimated(true);
                        animateIn();
                    } else if (!once) {
                        animateIn();
                    }
                } else if (!once && hasAnimated) {
                    setIsVisible(false);
                    animateOut();
                }
            },
            { threshold, rootMargin }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [disabled, threshold, rootMargin, once, hasAnimated]);

    const animateIn = () => {
        if (containerRef.current) {
            const elements = stagger > 0
                ? containerRef.current.children
                : [containerRef.current];

            gsap.set(elements, animationFrom);
            gsap.to(elements, {
                ...animationTo,
                delay: delay / 1000,
                duration,
                ease,
                stagger: stagger / 1000,
                overwrite: 'auto'
            });
        }
    };

    const animateOut = () => {
        if (containerRef.current) {
            const elements = stagger > 0
                ? containerRef.current.children
                : [containerRef.current];

            gsap.to(elements, {
                ...animationFrom,
                duration,
                ease,
                stagger: stagger / 1000,
                overwrite: 'auto'
            });
        }
    };

    // If disabled, just render children without animation
    if (disabled) {
        return (
            <div className={className} {...props}>
                {children}
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={className}
            {...props}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
