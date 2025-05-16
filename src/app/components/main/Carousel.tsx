'use client';

import { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollSpeed = 50; // Adjust this value to control scrolling speed (lower = faster)

  const scrollToItem = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
    const itemWidth = clientWidth / 3;

    let newScrollLeft;
    if (direction === 'right') {
      newScrollLeft = scrollLeft + itemWidth;
      if (newScrollLeft >= scrollWidth - clientWidth) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'instant' });
        newScrollLeft = itemWidth;
      }
    } else {
      newScrollLeft = scrollLeft - itemWidth;
      if (newScrollLeft < 0) {
        carouselRef.current.scrollTo({ left: scrollWidth, behavior: 'instant' });
        newScrollLeft = scrollWidth - clientWidth - itemWidth;
      }
    }

    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const startAutoScroll = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const scroll = () => {
      if (!carouselRef.current || isHovered) return;

      carouselRef.current.scrollBy({
        left: 1,
        behavior: 'auto'
      });

      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;

      // Reset to start when reaching end
      if (scrollLeft >= scrollWidth - clientWidth) {
        carouselRef.current.scrollTo({
          left: 0,
          behavior: 'instant'
        });
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);
  };

  const stopAutoScroll = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [isHovered]);

  const projectsData = [
    { image: '/aboutus/Project/Full Solar 2.JPG' },
    { image: '/aboutus/Project/photo_2025-04-28_00-07-37.jpg' },
    { image: '/aboutus/Project/photo_2025-04-28_00-07-38.jpg' },
    { image: '/aboutus/Project/photo_2025-04-28_00-07-43.jpg' },
    { image: '/aboutus/Project/photo_2025-04-28_00-07-44.jpg' },
    { image: '/aboutus/Project/photo_2025-04-28_00-07-46 (2).jpg' },
    { image: '/aboutus/Project/photo_2025-04-28_00-07-49.jpg' },
    { image: '/aboutus/Project/photo_2025-04-28_00-07-51.jpg' },
    { image: '/aboutus/Project/photo_2025-04-28_00-07-53.jpg' },
    { image: '/aboutus/Project/photo_2025-04-28_00-07-57.jpg' },
    { image: '/aboutus/Project/Roofotp.JPG' },
    { image: '/aboutus/Project/Solar Full.JPG' },
    { image: '/aboutus/Project/Solar Hybrid.png' },
  ];

  // Duplicate items for seamless looping
  const duplicatedProjectsData = [...projectsData, ...projectsData, ...projectsData];

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => scrollToItem('left')}
        className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 z-10 cursor-pointer hidden sm:block ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}
      >
        <FaChevronLeft />
      </button>

      <div
        ref={carouselRef}
        className="flex space-x-8 overflow-x-auto scroll-smooth scrollbar-none h-[14rem] lg:h-[20rem] py-2"
      >
        {duplicatedProjectsData.map((project, index) => (
          <div key={`${project.image}-${index}`} className="flex-shrink-0 w-60 lg:w-80 rounded-md overflow-hidden">
            <div className="relative h-full">
              <div
                className="w-full h-36 lg:h-52 bg-cover bg-center rounded-t-md"
                style={{ backgroundImage: `url("${project.image}")` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollToItem('right')}
        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 z-10 cursor-pointer hidden sm:block ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}
      >
        <FaChevronRight />
      </button>
    </section>
  );
};

export default Carousel;
