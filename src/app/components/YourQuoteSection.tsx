'use client';
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

type Plan = {
  title: string;
  savings: string;
  duration: string;
  TNB: string;
  type: string;
  discounted: string;
  bullets: string[];
  cta: string;
};

const plans: Plan[] = [
  {
    title: "Power Direct",
    type: "Power Direct",
    TNB: "RM 560",
    discounted: "RM 420",
    savings: "-RM456",
    duration: "-12%",
    bullets: [
      "Immediate savings from day one",
      "Zero upfront cost",
      "Power purchasing agreement",
    ],
    cta: "Open quote",
  },
  {
    title: "Installment",
    type: "Installment",
    TNB: "RM 560",
    discounted: "RM 2000",
    savings: "-RM456",
    duration: "-12%",
    bullets: ["Return on investment at 6 years", "Zero upfront cost"],
    cta: "Open quote",
  },
  {
    title: "Upfront Purchase",
    type: "Purchase",
    TNB: "RM 560",
    discounted: "RM 85k",
    savings: "-RM456",
    duration: "-12%",
    bullets: ["Return on investment at 4 years", "Immediately own your PV system"],
    cta: "Open quote",
  },
];

const YourQuotesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // card width + gap (make sure this matches your actual CSS)
  const cardWidth = 300 + 16; // 300px width + 16px gap

  // Scroll left/right buttons for mobile
  const scrollLeft = () => {
    if (!scrollRef.current) return;
    const newScroll = Math.max(scrollRef.current.scrollLeft - cardWidth, 0);
    scrollRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (!scrollRef.current) return;
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const newScroll = Math.min(scrollRef.current.scrollLeft + cardWidth, maxScroll);
    scrollRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
  };

  // Update focusedIndex on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      // Calculate focused card index by scrollLeft / cardWidth and round to nearest
      const index = Math.round(el.scrollLeft / cardWidth);
      // Clamp to valid indices
      const clampedIndex = Math.min(Math.max(index, 0), plans.length - 1);
      setFocusedIndex(clampedIndex);
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    // Initialize focused index on mount
    onScroll();

    return () => el.removeEventListener("scroll", onScroll);
  }, [cardWidth]);

  // Mobile detection (optional for styling)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="mb-16 text-center">
      <div className="space-y-2 mb-8 w-full md:max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-white text-left">Your quotes</h2>
        <p className="text-white/70 text-left">Achieve energy independence and security.</p>
      </div>

      <div className="relative">
        {/* Scroll buttons only on mobile */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-rtyellow-200 hover:bg-rtyellow-300 text-black rounded-full p-2 z-20 md:hidden"
        >
          ◀
        </button>
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-rtyellow-200 hover:bg-rtyellow-300 text-black rounded-full p-2 z-20 md:hidden"
        >
          ▶
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-8 overflow-x-auto scroll-smooth py-4 md:justify-center scrollbar-none"
          style={{
            scrollSnapType: "x mandatory",
            paddingLeft: isMobile ? "calc(50vw - 150px)" : undefined,
            paddingRight: isMobile ? "calc(50vw - 150px)" : undefined,
          }}
        >
          {plans.map((plan, idx) => {
            const isFocused = idx === focusedIndex;

            const marginLeft = isMobile && idx === 0 ? "calc(50vw - 150px)" : undefined;
            const marginRight = isMobile && idx === plans.length - 1 ? "calc(50vw - 150px)" : undefined;

            return (
              <div
                key={idx}
                className="bg-gray-700 rounded-3xl flex-shrink-0 flex flex-col justify-between snap-center transition-transform duration-300 ease-in-out relative"
                style={{
                  scrollSnapAlign: "center",
                  minWidth: "300px",
                  marginLeft,
                  marginRight,
                  transform: isMobile && isFocused ? "scale(1.05)" : isMobile ? "scale(0.9)" : "scale(1)",
                  filter: "none",
                  zIndex: isMobile && isFocused ? 10 : "auto",
                }} 
              >

                 {/* Wave SVG absolutely positioned, full width, no padding clipping */}
                <svg
                    viewBox="0 0 400 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 left-0 w-full h-1/1 rounded-b-3xl text-rtgray-800"
                    preserveAspectRatio="none"
                    style={{ opacity: 0.9, zIndex: 0 }}
                >
                    <path d="M0 70 Q-70 52 33 50 T220 53 T420 50 V100 H0 Z" fill="currentColor" />
                </svg>

                {/* Your card content here */}
                <div className="p-6 relative z-10 rounded-3xl font-exo2">
                  <h3 className="text-rtyellow-200 text-xl font-semibold mt-1 mb-1">{plan.title}</h3>
                  <p className="text-xs text-white/70 mt-8 mb-2">Savings monthly</p>
                  <div className="inline-flex items-center justify-center rounded-tl-2xl rounded-br-2xl overflow-hidden bg-rtyellow-200 text-black font-medium text-sm w-fit mx-auto mb-2 shadow">
                    <span className="px-3 py-1">{plan.savings}</span>
                    <div className="h-6 w-px bg-black/20"></div>
                    <span className="px-3 py-1">{plan.duration}</span>
                  </div>
                  <div className="my-4 grid grid-cols-2 gap-x-6 text-center">
                    <div>
                      <p className="text-xs text-white/70 mb-2">TNB</p>
                      <p className="text-lg font-medium">{plan.TNB}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70 mb-2">{plan.type}</p>
                      <p className="text-lg font-medium">{plan.discounted}</p>
                    </div>
                  </div>
                  <ul className="pt-12 text-xs text-left text-white space-y-5">
                    {plan.bullets.map((b, i) => (
                      <li key={i}>🌟 {b}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/quotesummary"
                  className="mt-8 m-4 bg-rtyellow-200 hover:bg-rtyellow-300 text-black text-sm font-exo2 font-light py-2 px-4 rounded-full relative z-10"
                >
                  {plan.cta} <span>→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YourQuotesSection;
