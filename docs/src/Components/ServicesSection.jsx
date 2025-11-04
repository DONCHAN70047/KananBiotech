import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import {
  FaMicroscope,
  FaChartSimple,
  FaStore,
  FaComments,
  FaFish,
  FaCloud,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const services = [
  { key: "diagnostic", Icon: FaMicroscope, href: "/UnderConstruction" },
  { key: "aquacultureData", Icon: FaChartSimple, href: "/UnderConstruction" },
  { key: "stockSells", Icon: FaStore, href: "/UnderConstruction" },
  { key: "aquaConsult", Icon: FaComments, href: "/UnderConstruction" },
  { key: "foodPrep", Icon: FaFish, href: "/UnderConstruction" },
  { key: "WeatherDetails", Icon: FaCloud, href: "/WeatherApp" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="pt-[32rem] pb-[9rem] px-6 bg-gradient-to-br from-[#DFF9FB] via-[#E8FFFE] to-[#C8F4F9]
                 min-h-[25vh] flex flex-wrap justify-center gap-2 sm:gap-10
                 transition-all duration-700 overflow-hidden"
    >
      {services.map(({ key, Icon, href }, i) => (
        <motion.div
          key={key}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <Link
            to={href}
            className="group w-36 h-26 sm:w-40 sm:h-40 bg-white/80 backdrop-blur-md rounded-xl shadow-md
                       flex flex-col items-center justify-center text-center border border-[#A8E0E8]
                       hover:bg-gradient-to-br hover:from-[#C5F3F3] hover:to-[#E0FFF8]
                       hover:shadow-lg hover:-translate-y-1 transition-all duration-700"
          >
            <div
              className="p-3 rounded-full bg-[#E0FFF8] text-[#03738C]
                         group-hover:bg-[#00A6B4] group-hover:text-white transition-all duration-700"
            >
              <Icon size={32} />
            </div>
            <span
              className="mt-3 text-sm font-semibold text-[#046B78]
                         group-hover:text-[#024D56] transition-all duration-700"
            >
              {t(key)}
            </span>
          </Link>
        </motion.div>
      ))}
    </section>
  );
};

export default ServicesSection;
