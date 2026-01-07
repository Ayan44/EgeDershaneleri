import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SplitText = ({
    tag = 'div',
    text,
    className = '',
    delay = 0,
    duration = 0.8,
    ease = 'power3.out',
    splitType = 'chars', // 'chars', 'words', 'lines'
    from = { opacity: 0, y: 20 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = '0px',
    textAlign = 'left',
    stagger = 0.02,
    once = true,
    ...props
}) => {
    const containerRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!containerRef.current || hasAnimated) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateIn();
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [hasAnimated, threshold, rootMargin]);

    const animateIn = () => {
        if (containerRef.current) {
            const elements = containerRef.current.querySelectorAll('.split-item');

            gsap.set(elements, from);
            gsap.to(elements, {
                ...to,
                delay: delay / 1000, // Convert milliseconds to seconds
                duration,
                ease,
                stagger,
                overwrite: 'auto'
            });
        }
    };

    const splitText = (text, splitType) => {
        if (!text) return null;

        switch (splitType) {
            case 'chars':
                return text.split('').map((char, index) => (
                    <span key={index} className="split-item" style={{ display: 'inline-block' }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ));
            case 'words':
                return text.split(' ').map((word, index) => (
                    <span key={index} className="split-item" style={{ display: 'inline-block' }}>
                        {word}
                        {index < text.split(' ').length - 1 ? '\u00A0' : ''}
                    </span>
                ));
            case 'lines':
                return text.split('\n').map((line, index) => (
                    <div key={index} className="split-item" style={{ display: 'block' }}>
                        {line}
                    </div>
                ));
            default:
                return text;
        }
    };

    const Tag = tag;

    return (
        <Tag
            ref={containerRef}
            className={className}
            style={{ textAlign }}
            {...props}
        >
            {splitText(text, splitType)}
        </Tag>
    );
};

export default SplitText;
