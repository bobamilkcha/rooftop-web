'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PopularFaq = () => {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const popfaqs = [
    {
      question: 'Could you elaborate on the operational principles of solar panels?',
      answer: 'Solar panels function by converting solar irradiation into electrical energy through the photovoltaic effect. Incident photons from sunlight stimulate the semiconductor material within the solar cells, generating a direct current (DC). This DC electricity is then transformed into alternating current (AC) by an inverter, making it suitable for powering residential and commercial applications.',
    },
    {
      question: 'Is it feasible to utilize solar power during electrical grid outages?',
      answer: 'For safety and regulatory compliance, grid-tied solar photovoltaic (PV) systems in Malaysia, as per Suruhanjaya Tenaga guidelines, are engineered to automatically cease operation during grid interruptions. This anti-islanding feature is crucial for preventing hazards to personnel and equipment, as well as ensuring the stability of the utility grid during power restoration.',
    },
    {
      question: 'Is the inclusion of a battery storage system mandatory for a solar power installation?',
      answer: 'A dedicated battery storage system is not a prerequisite. While batteries represent an additional capital investment that can influence the overall return on investment, Malaysia\'s Net Energy Metering (NEM 3.0) scheme allows grid-connected users to effectively utilize the utility grid as a virtual storage solution. Excess solar energy generated is exported to the grid and credited against the user\'s electricity bill.',
    },
    {
      question: 'What is the expected lifespan of a solar power system?',
      answer: 'Solar power systems are designed for longevity. Solar panels typically come with a performance warranty of 25 to 30 years and can continue to produce electricity beyond this period, albeit with a gradual decline in efficiency. Regular maintenance is essential to ensure the sustained optimal performance of the system over its operational life.',
    },
    {
      question: 'Will the installation of solar panels compromise the structural integrity or cause damage to my roof?',
      answer: 'Rooftop Energy employs specialized aluminum mounting systems that are precisely engineered to conform to the specific profile of your roof. Any necessary drilling during installation is executed with meticulous attention to detail, incorporating robust waterproofing measures to safeguard the roof\'s integrity and ensure a secure and durable installation. Furthermore, a qualified Civil Professional Engineer supervises the on-site assessment to provide additional assurance.',
    },
  ];

  const answerVariants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: "easeOut" } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <div className="w-full text-white rounded-lg p-4 md:p-6">
      <h2 className="text-3xl md:text-4xl font-semibold text-rtyellow-200 mb-6 md:mb-10 text-center md:text-left">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {popfaqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700 last:border-b-0">
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full text-left text-base md:text-lg font-medium flex items-center justify-between py-3 px-2 rounded-t-md transition-colors duration-200"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span id={`faq-question-${index}`} className="flex-1 pr-4">{faq.question}</span>
              <motion.span
                className='text-rtyellow-200 text-4xl md:text-5xl font-extralight'
                style={{
                  display: 'inline-block',
                  transformOrigin: 'center'
                }}
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  variants={answerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="overflow-hidden"
                  style={{ marginTop: '-1px' }} // Adjust to align visually with the border
                >
                  <div className="py-2 px-2 md:py-3 md:px-3 text-sm md:text-base text-rtgray-300 ">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularFaq;