"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useThrottledScroll } from "./hooks/useThrottledScroll";
import Terminal from "./Terminal"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ParticlesComponent from "@/components/Particles";

const PARALLAX_FACTOR = 0.5;
const BACKGROUND_SHIFT = 0.1;
const INITIAL_BACKGROUND_POSITION = 20;

const IMAGES = {
  mainBg: { 
    src: "/main-bg.webp",
    alt: "Abstract background pattern" 
  }
};

const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="relative min-h-screen flex flex-col lg:flex-row items-center"
  >
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
      style={{
        backgroundImage: `url(${IMAGES.mainBg.src})`,
        backgroundPosition: `center ${INITIAL_BACKGROUND_POSITION - scrollY * BACKGROUND_SHIFT}%`,
        transform: `translateY(${scrollY * PARALLAX_FACTOR}px)`,
      }}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-55"
        style={{
          backdropFilter: "blur(4px)",
        }}
      />
    </div>

    <div className="flex flex-col lg:flex-row items-center w-full relative z-10 px-6 py-10 lg:py-0">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="w-full lg:w-1/2 lg:pl-20 flex flex-col gap-5 mb-10 lg:mb-0"
      >
        <h1 className="text-3xl md:text-[45px] text-white font-semibold leading-tight">
          OSPC VIT, Chennai was created to spread awareness of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500 animate-gradient">
            Free and Open Source Software (FOSS)
          </span>{" "}
          and{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 animate-gradient">
            Git and GitHub
          </span>
          <FontAwesomeIcon icon={faGithub} className="text-blue-500 ml-2" />
        </h1>
      </motion.div>

      <div className="w-full lg:w-1/2 flex justify-center px-4">
        <Terminal />
      </div>
    </div>
  </motion.div>
);

const DecorativeImages = () => (
  <>
    <motion.div
      className="absolute top-0 right-0 z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4.0 }}
    ></motion.div>

    <motion.div
      initial={{ rotate: -10, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 4.0}}
      className="absolute top-0 left-0 z-10"
    ></motion.div>
  </>
);

const AboutSection = () => (
  <motion.section
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="relative text-white py-16 backdrop-blur-sm"
  >
    <div className="max-w-3xl mx-auto px-6">
      <ParticlesComponent id="particles-background" />
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        About OPSC
      </h2>
      <p className="mb-4 text-lg leading-relaxed">
        The Open Source Programming Club (OSPC) at VIT is a student-driven initiative aimed at fostering a culture of open-source development. Our mission is to empower members with practical skills, community-driven projects, and insights into collaborative software development.
      </p>
      <p className="mb-8 text-lg leading-relaxed">
        We believe in the power of open-source to bring about positive change and innovation. Whether you&apos;re an experienced developer or just getting started, join us in building a world where knowledge is freely shared, and everyone has the opportunity to contribute!
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/projects"
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
        >
          Explore OSPC
        </Link>
        <Link
          href="/events"
          className="px-6 py-3 border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
        >
          Upcoming Events
        </Link>
      </div>
    </div>
  </motion.section>
);

const EntryAnimation = ({ onComplete }: { onComplete: () => void }) => (
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-black z-50"  
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 5 }} // Animation duration is set to 5 seconds
    onAnimationComplete={onComplete}
  >
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
        Welcome to OPSC
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-2">
        Empowering Open-Source 
      </p>
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300">
        at VIT, Chennai
      </p>
    </div>
  </motion.div>
);

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true);
  const scrollY = useThrottledScroll();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowAnimation(true);
      localStorage.setItem("hasVisited", "true");
    } else {
      setShowAnimation(false);
    }
  }, []);

  if (showAnimation) {
    return <EntryAnimation onComplete={() => setShowAnimation(false)} />;
  }

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-dark-800 to-purple-400">
      <HeroSection scrollY={scrollY} />
      <DecorativeImages />
      <AboutSection />
    </main>
  );
}
