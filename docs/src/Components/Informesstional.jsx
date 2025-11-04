import React from "react";
import { motion } from "framer-motion";

const Informesstional = () => {
  return (
    <section
      id="informesstional"
      className="min-h-screen w-full px-6 sm:px-16 py-20 flex flex-col items-center 
                 bg-gradient-to-b from-[#3A8D9C] via-[#2E717E] to-[#164950] text-white"
    >
      

      {/* --------------- Section 1: Column 1 (Image Left) --------------- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20 max-w-6xl w-full">
        <motion.img
          src="/FrontPageDisesPic/BacterialGillDises(BGD).webp"
          alt="Fish Disease Example"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 rounded-2xl shadow-2xl object-cover"
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-lg leading-relaxed"
        >
          <h3 className="text-2xl font-semibold mb-4 text-[#A7F3F3]">
            Bacterial Gill Disease (BGD)
          </h3>
          <p>
            Bacterial Gill Disease (BGD) is a common condition in aquaculture,
            especially in crowded or poorly oxygenated environments. The gills
            become covered with bacterial colonies that interfere with oxygen
            exchange. Infected fish may exhibit rapid gill movements, gasping at
            the water surface, and loss of appetite. Prevention involves proper
            water quality management, reducing stress, and maintaining good
            hygiene in rearing tanks.
          </p>
        </motion.div>
      </div>

      {/* --------------- Section 2: Column 2 (Image Right) --------------- */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12 mb-20 max-w-6xl w-full">
        <motion.img
          src="/FrontPageDisesPic/BacterialGillDises(BGD).webp"
          alt="Fungal Infection in Fish"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 rounded-2xl shadow-2xl object-cover"
        />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-lg leading-relaxed"
        >
          <h3 className="text-2xl font-semibold mb-4 text-[#A7F3F3]">
            Fungal Infection (Saprolegniasis)
          </h3>
          <p>
            Fungal infections are caused by water molds, mainly *Saprolegnia* species.
            These appear as cotton-like white or gray patches on the fish’s body,
            fins, or eggs. Poor water quality, handling injuries, or stress can
            increase susceptibility. Treatment includes salt baths and
            antifungal agents, but prevention through clean water and careful
            handling is most effective.
          </p>
        </motion.div>
      </div>

      {/* --------------- Section 3: Column 3 (Image Left) --------------- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl w-full">
        <motion.img
          src="/FrontPageDisesPic/BacterialGillDises(BGD).webp"
          alt="Parasitic Infection in Fish"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 rounded-2xl shadow-2xl object-cover"
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-lg leading-relaxed"
        >
          <h3 className="text-2xl font-semibold mb-4 text-[#A7F3F3]">
            Parasitic Infestation (Ichthyophthiriasis)
          </h3>
          <p>
            Commonly known as “Ich” or white spot disease, this infection is
            caused by the protozoan *Ichthyophthirius multifiliis*. Infected fish
            develop small white cysts on the skin and fins and may rub against
            surfaces due to irritation. Managing water temperature and using
            medicated treatments can help eliminate parasites. Maintaining a
            quarantine system for new stock prevents further spread.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Informesstional;
