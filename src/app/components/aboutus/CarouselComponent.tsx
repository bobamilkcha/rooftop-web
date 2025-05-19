'use client';

import Carousel, { DotProps, ButtonGroupProps } from 'react-multi-carousel';
import { useMediaQuery } from "react-responsive";
import 'react-multi-carousel/lib/styles.css';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faBuilding } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const CarouselComponent = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const carouselRef = useRef<Carousel>(null);

  const projects = [
    {
      image: "/aboutus/Project/project1.jpeg",
      logo: null,
      clientName: "Biofact Life Sdn Bhd",
      date: "October 2022",
      description: "Implemented a 500kWp rooftop solar solution reducing carbon footprint significantly."
    },
    {
      image: "/aboutus/Project/KBColourImage.jpeg",
      logo: null,
      clientName: "KB Colour Images Sdn Bhd",
      date: "January 2023",
      description: "Installed aground-mounted solar farm generating 1 MWh annually."
    },
    {
      image: "/aboutus/Project/2.jpg",
      logo: null,
      clientName: "Kim Sing Transport Sdn Bhd",
      date: "February 2025",
      description: "Installed ground-mounted solar farm generating 1 MWh annually."
    },
    {
      image: "/aboutus/Project/Timo.jpeg",
      logo: null,
      clientName: "Timo International Sdn Bhd",
      date: "February 2025",
      description: "Installed ground-mounted solar farm generating 1 MWh annually."
    },
    {
      image: "/aboutus/Project/Tori.jpeg",
      logo: null,
      clientName: "Tori Q Sdn Bhd",
      date: "February 2025",
      description: "Installed ground-mounted solar farm generating 1 MWh annually."
    },
    {
      image: "/aboutus/Project/Wilayah.jpg",
      logo: null,
      clientName: "Wilayah Food Trading Sdn Bhd",
      date: "February 2025",
      description: "Installed ground-mounted solar farm generating 1 MWh annually."
    },
    // ... rest of your projects data
  ];

  const CustomDot = ({ index, active, onClick }: DotProps) => {
    return (
      <button
        aria-label={`Go to slide ${(index ?? 0) + 1}`}
        className={`w-3 h-3 md:w-4 md:h-4 rounded-full mx-1 cursor-pointer transition-colors duration-200 ${
          active ? "bg-white" : "bg-rtgray-700 hover:bg-rtgray-600"
        }`}
        onClick={() => onClick?.()}
      />
    );
  };

  const CustomButtonGroup = ({ next, previous }: ButtonGroupProps) => {
    return (
      <>
        <button
          aria-label="Previous Slide"
          onClick={previous}
          className="absolute left-0 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 md:p-3 cursor-pointer hover:bg-opacity-75 focus:outline-none transition-opacity duration-200"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button
          aria-label="Next Slide"
          onClick={next}
          className="absolute right-0 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 md:p-3 cursor-pointer hover:bg-opacity-75 focus:outline-none transition-opacity duration-200"
        >
          <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </>
    );
  };

  return (
    <section className="bg-rtgray-900 py-16 md:py-24 text-white overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-semibold mb-10 md:mb-12 text-center">Our Projects</h2>

      <div className="relative w-full mx-auto px-4 md:px-8 lg:px-12">
        {/* Fade Effect Elements (Desktop Only) */}
        <div className="absolute left-0 top-0 bottom-16 w-1/6 bg-gradient-to-r from-rtgray-900 via-rtgray-900 to-transparent z-10 pointer-events-none hidden lg:block" />
        <div className="absolute right-0 top-0 bottom-16 w-1/6 bg-gradient-to-l from-rtgray-900 via-rtgray-900 to-transparent z-10 pointer-events-none hidden lg:block" />

        <div className="relative" style={{ paddingBottom: '5rem' }}>
          <Carousel
            ref={carouselRef}
            swipeable={true}
            draggable={true}
            infinite={true}
            centerMode={isDesktop}
            showDots
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            customButtonGroup={<CustomButtonGroup />}
            arrows={false}
            renderDotsOutside={true}
            customDot={<CustomDot />}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1,
                partialVisibilityGutter: 300
              },
              tablet: {
                breakpoint: { max: 1024, min: 640 },
                items: 1,
                partialVisibilityGutter: 0
              },
              mobile: {
                breakpoint: { max: 640, min: 0 },
                items: 1,
                partialVisibilityGutter: 0
              }
            }}
            slidesToSlide={1}
            itemClass="lg:px-4 md:px-2 px-1"
            containerClass="carousel-container"
            dotListClass="!absolute !bottom-8 !left-0 !right-0 !flex !justify-center gap-2"
          >
            {projects.map((project, index) => (
              <div key={index} className="relative focus:outline-none">
                <div className="relative">
                  <img
                    src={project.image}
                    className="object-cover w-full h-[330px] mx-auto"
                    alt={`${project.clientName} Project`}
                    draggable="false"
                    style={{ filter: 'brightness(83%)', borderRadius: '0' }}
                  />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 p-3 rounded-md max-w-[70%] md:max-w-[50%]">
                    <div className="flex items-start">
                      <div className="mr-2 md:mr-3 flex-shrink-0">
                        {project.logo ? (
                          <img src={project.logo} alt={`${project.clientName} Logo`} className="h-8 w-8 md:h-10 md:w-10 object-contain" />
                        ) : (
                          <FontAwesomeIcon icon={faBuilding} className="text-blue-400 h-6 w-6 md:h-8 md:w-8" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm md:text-base font-semibold text-white leading-tight mb-1">
                          {project.clientName}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-200 leading-tight">
                          {project.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CarouselComponent;