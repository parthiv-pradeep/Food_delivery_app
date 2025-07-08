import React, { useRef, useEffect, useState } from 'react';

const ScrollArea = ({ 
  children, 
  className = '', 
  orientation = 'vertical',
  type = 'auto',
  scrollHideDelay = 600,
  ...props 
}) => {
  const scrollRef = useRef(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      setShowScrollbar(true);
      
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      
      hideTimeoutRef.current = setTimeout(() => {
        if (!isDragging) {
          setShowScrollbar(false);
        }
      }, scrollHideDelay);
    };

    const handleMouseEnter = () => {
      setShowScrollbar(true);
    };

    const handleMouseLeave = () => {
      if (!isDragging) {
        setShowScrollbar(false);
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);
    scrollElement.addEventListener('mouseenter', handleMouseEnter);
    scrollElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      scrollElement.removeEventListener('mouseenter', handleMouseEnter);
      scrollElement.removeEventListener('mouseleave', handleMouseLeave);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isDragging, scrollHideDelay]);

  const getScrollbarSize = () => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return { size: 0, position: 0 };

    if (orientation === 'vertical') {
      const scrollHeight = scrollElement.scrollHeight;
      const clientHeight = scrollElement.clientHeight;
      const scrollTop = scrollElement.scrollTop;
      
      const size = (clientHeight / scrollHeight) * clientHeight;
      const position = (scrollTop / scrollHeight) * clientHeight;
      
      return { size: Math.max(size, 20), position };
    } else {
      const scrollWidth = scrollElement.scrollWidth;
      const clientWidth = scrollElement.clientWidth;
      const scrollLeft = scrollElement.scrollLeft;
      
      const size = (clientWidth / scrollWidth) * clientWidth;
      const position = (scrollLeft / scrollWidth) * clientWidth;
      
      return { size: Math.max(size, 20), position };
    }
  };

  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart(orientation === 'vertical' ? e.clientY : e.clientX);
    setScrollStart(orientation === 'vertical' ? scrollRef.current.scrollTop : scrollRef.current.scrollLeft);
    setShowScrollbar(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !scrollRef.current) return;

      const scrollElement = scrollRef.current;
      const delta = (orientation === 'vertical' ? e.clientY : e.clientX) - dragStart;
      
      if (orientation === 'vertical') {
        const scrollHeight = scrollElement.scrollHeight;
        const clientHeight = scrollElement.clientHeight;
        const scrollRatio = delta / clientHeight;
        const newScrollTop = scrollStart + (scrollRatio * scrollHeight);
        scrollElement.scrollTop = Math.max(0, Math.min(newScrollTop, scrollHeight - clientHeight));
      } else {
        const scrollWidth = scrollElement.scrollWidth;
        const clientWidth = scrollElement.clientWidth;
        const scrollRatio = delta / clientWidth;
        const newScrollLeft = scrollStart + (scrollRatio * scrollWidth);
        scrollElement.scrollLeft = Math.max(0, Math.min(newScrollLeft, scrollWidth - clientWidth));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, scrollStart, orientation]);

  const { size, position } = getScrollbarSize();
  const needsScrollbar = scrollRef.current && (
    orientation === 'vertical' 
      ? scrollRef.current.scrollHeight > scrollRef.current.clientHeight
      : scrollRef.current.scrollWidth > scrollRef.current.clientWidth
  );

  return (
    <div className={`relative ${className}`} {...props}>
      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`
          ${orientation === 'vertical' ? 'overflow-y-auto overflow-x-hidden' : 'overflow-x-auto overflow-y-hidden'}
          scrollbar-none h-full w-full
        `}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>

      {/* Custom Scrollbar */}
      {needsScrollbar && (
        <div
          className={`
            absolute transition-opacity duration-150 z-10
            ${orientation === 'vertical' 
              ? 'right-0 top-0 w-3 h-full' 
              : 'bottom-0 left-0 h-3 w-full'
            }
            ${showScrollbar || type === 'always' ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* Scrollbar Track */}
          <div
            className={`
              bg-gray-100 dark:bg-gray-800 rounded-full
              ${orientation === 'vertical' ? 'w-2 h-full mx-auto' : 'h-2 w-full my-auto'}
            `}
          />
          
          {/* Scrollbar Thumb */}
          <div
            className={`
              absolute bg-gray-400 dark:bg-gray-600 rounded-full cursor-pointer
              hover:bg-gray-500 dark:hover:bg-gray-500 transition-colors
              ${orientation === 'vertical' 
                ? 'w-2 left-1/2 transform -translate-x-1/2' 
                : 'h-2 top-1/2 transform -translate-y-1/2'
              }
            `}
            style={{
              [orientation === 'vertical' ? 'height' : 'width']: `${size}px`,
              [orientation === 'vertical' ? 'top' : 'left']: `${position}px`,
            }}
            onMouseDown={handleThumbMouseDown}
          />
        </div>
      )}
    </div>
  );
};

export default ScrollArea;
