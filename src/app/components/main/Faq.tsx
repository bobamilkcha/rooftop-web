'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FaqProps = {
  searchQuery?: string; // optional search query prop
};

const Faq: React.FC<FaqProps> = ({ searchQuery = "" }) => {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
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
    {
      question: 'Does Rooftop Energy provide guarantees for its solar power systems?',
      answer: 'Indeed. We offer comprehensive warranties, including a 25 to 30-year performance warranty on solar panels, a 10-year warranty on inverters, and a 5-year warranty covering the balance of system components. Additionally, Rooftop Energy provides a 12-month workmanship warranty to address any post-installation related concerns.',
    },
    {
      question: 'What government-backed initiatives are available to Malaysians considering solar energy adoption?',
      answer: 'Malaysia offers two primary solar energy schemes: Net Energy Metering (NEM) and Self-Consumption (SELCO).\nUnder the NEM scheme, self-generated solar electricity is prioritized for on-site consumption, with any surplus exported to the grid, resulting in energy credits.\nThe SELCO scheme focuses on direct on-site consumption of all generated solar power to reduce electricity expenses, without the provision for grid export.',
    },
    {
      question: 'What are the key advantages for businesses investing in a Solar PV system?',
      answer: 'Investing in a Solar PV system yields substantial benefits for businesses, including significant reductions in electricity expenditure, eligibility for fiscal incentives such as the Green Investment Tax Allowance (GITA) and Capital Allowance, and the enhancement of corporate sustainability credentials through the adoption of renewable energy. This investment fosters energy independence, mitigates exposure to fluctuating energy prices, and delivers long-term financial returns via a reliable and durable energy solution.',
    },
    {
      question: 'What are the initial steps involved in commencing a solar energy project?',
      answer: 'The initial step involves providing us with your most recent TNB electricity bills to facilitate a complimentary Return on Investment (ROI) assessment and enable us to recommend the most suitable clean energy solution tailored to your needs. We offer comprehensive support, encompassing the design of a bespoke solar PV system for your business and the management of all necessary regulatory approvals, authority liaisons, and tariff applications.',
    },
    {
      question: 'Does a Solar System necessitate frequent upkeep?',
      answer: 'Solar PV systems generally require minimal maintenance. Routine cleaning of the solar panels (typically on an annual or bi-annual basis) and periodic inspections (every 3 to 4 years) are recommended to ensure optimal performance. Rooftop Energy\'s post-installation services include scheduled solar panel cleaning and inspections to prevent the accumulation of debris and maintain peak operational efficiency.',
    },
    {
      question: 'Does Rooftop Energy offer Post-Installation Service Agreements?',
      answer: 'Indeed. Rooftop Care+ is a comprehensive maintenance program designed to ensure the sustained efficiency and reliability of your PV system. This plan includes regular cleaning, routine servicing, and repair services, providing a seamless and worry-free experience. Please contact us for further details.',
    },
    {
      question: 'What is the typical timeframe for recouping the investment in a rooftop solar system?',
      answer: 'The payback period for a rooftop solar investment is contingent upon factors such as prevailing energy tariffs, relevant government policies, and applicable tax incentives. Businesses eligible for the Green Investment Tax Allowance and Capital Allowance may realize a payback period ranging from 3 to 6 years, depending on current tariff structures.',
    },
    {
      question: 'What tax incentives are offered by the Malaysian Government to businesses adopting solar energy?',
      answer: 'Businesses transitioning to renewable energy sources, including solar power, can benefit from the Green Investment Tax Allowance (GITA) provided by the Malaysian Investment Development Authority (MIDA) and Capital Allowance (CA) offered by the Inland Revenue Board of Malaysia (LHDN). These fiscal incentives enhance the financial viability of adopting clean energy solutions.',
    },
    {
      question: 'What is the typical duration for the installation of a solar power system?',
      answer: 'The installation timeline is dependent on the scale of the system. For rooftop installations, the process typically spans 1 to 4 months, encompassing license application and approval, material procurement lead times, and the physical installation. This timeframe is applicable to systems ranging from medium to large capacities.',
    },
    {
      question: 'What regulatory permits and approvals are required before installing a solar system on my property?',
      answer: 'Key regulatory requirements typically include:\n- Approval from Suruhanjaya Tenaga for systems exceeding 72kWac\n- NEM certificate issuance from the Sustainable Energy Development Authority (SEDA)\n- Approval from Tenaga Nasional Berhad (TNB) for Bi-Directional Meter replacement/Welcome Letter or SELCO authorization\n- Engagement of a Chargeman and Visiting Engineer for systems above 72kWac',
    },
    {
      question: 'What is the maximum permissible capacity for a solar PV system on my commercial building?',
      answer: 'For Commercial and Industrial applications, the maximum allowable capacity of the installed PV system is typically limited to the lesser of 75% of the building\'s maximum electrical demand, 60% of the fuse rating, or 60% of the current transformer rating. The Rooftop Energy technical team will conduct a thorough site assessment to determine the specific allowable capacity for your property.',
    },
  ];

  // Filter FAQs by searchQuery (case-insensitive)
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
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
                    style={{ marginTop: '-1px' }}
                  >
                    <div className="py-2 px-2 md:py-3 md:px-3 text-sm md:text-base text-rtgray-300 ">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No matching questions found.</p>
        )}
      </div>
    </div>
  );
};

export default Faq;
