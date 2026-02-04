import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

// Brand colors with good contrast
const colors = {
  blue: '#2D4BFF',
  orange: '#FF8C00',
  purple: '#9B59B6',
  yellow: '#F4D03F',
  slate: '#5E6B7C',
  navy: '#1a237e',
  // Text colors for each background
  textOnBlue: '#FFFFFF',
  textOnOrange: '#FFFFFF',
  textOnPurple: '#FFFFFF',
  textOnYellow: '#1a1a1a',
  textOnSlate: '#FFFFFF',
};

// Animated counter hook
const useCounter = (end, duration = 2000, inView) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, inView]);

  return count;
};

// Logo Component - uses official SVG
const Logo = ({ className = "h-8", dark = false }) => (
  <img
    src="/sandbox/logo.svg"
    alt="Logo"
    className={className}
    style={dark ? {} : { filter: 'brightness(0) saturate(100%) invert(24%) sepia(95%) saturate(4997%) hue-rotate(230deg) brightness(102%) contrast(103%)' }}
  />
);

// Circle decoration component with bounce animation
const CircleDecor = ({ size, className, style, delay = 0 }) => {
  // Random values for unique animation per circle
  const duration = 3 + Math.random() * 2; // 3-5 seconds
  const yOffset = 15 + Math.random() * 20; // 15-35px bounce

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 0 }}
      animate={{
        scale: 1,
        opacity: 0.9,
        y: [0, -yOffset, 0, yOffset * 0.5, 0],
      }}
      transition={{
        scale: { duration: 0.8, delay: delay },
        opacity: { duration: 0.8, delay: delay },
        y: {
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + Math.random() * 2,
        }
      }}
      className={`absolute rounded-full bg-white ${className}`}
      style={{ width: size, height: size, ...style }}
    />
  );
};

// Navigation
const Navigation = ({ activeSection }) => {
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'intro', label: 'Introduction' },
    { id: 'trend1', label: 'Time to Optimize' },
    { id: 'trend2', label: 'Anticipation Default' },
    { id: 'trend3', label: 'Unplugged & Present' },
    { id: 'trend4', label: 'Personalized Storytelling' },
    { id: 'scenarios', label: 'Scenarios' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo className="h-8" />
          <div className="hidden lg:flex gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-3 py-2 text-sm rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => (
  <section id="hero" className="relative min-h-screen overflow-hidden bg-[#2D4BFF]">
    <CircleDecor size={400} style={{ top: -100, right: -50 }} delay={0} />
    <CircleDecor size={200} style={{ bottom: 100, right: 200 }} delay={0.2} />
    <CircleDecor size={300} style={{ bottom: -100, right: -100 }} delay={0.4} />
    <CircleDecor size={150} style={{ top: 200, right: 400 }} delay={0.6} />

    <div className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl md:text-8xl font-light text-white mb-4">Decoding</h1>
        <h1 className="text-6xl md:text-8xl font-light text-white mb-8">Digital Life</h1>
        <p className="text-xl text-white font-medium tracking-wider">4 LOTTERY TRENDS FOR 2026</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <div className="flex items-center gap-4 text-white/80">
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-3 bg-white/80 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>

    <div className="absolute bottom-8 left-8 flex items-center gap-3">
      <span className="text-white/70 text-sm">Powered by</span>
      <img
        src="https://www.foresightfactory.co/wp-content/themes/foresight-factory/images/foresight-factory-logo.svg"
        alt="Foresight Factory"
        className="h-6 brightness-0 invert opacity-90"
      />
    </div>
  </section>
);

// Animated Donut Chart
const DonutChart = ({ percentage, label, sublabel, color, size = 160 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animatedPercent = useCounter(percentage, 1500, isInView);

  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(animatedPercent / 100) * circumference} ${circumference}`;

  return (
    <div ref={ref} className="text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size/2} cy={size/2} r={radius}
            fill="none" stroke="#e5e7eb" strokeWidth="12"
          />
          <motion.circle
            cx={size/2} cy={size/2} r={radius}
            fill="none" stroke={color} strokeWidth="12"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-gray-600">{label}</span>
          <span className="text-xs text-gray-600">{sublabel}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-3">
        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
        <span className="font-semibold text-gray-800">{animatedPercent}% Agree</span>
      </div>
    </div>
  );
};

// Animated Bar Chart
const AnimatedBarChart = ({ data, colors: barColors }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={8}>
          <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fill: '#4b5563' }} />
          <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#4b5563' }} />
          <Tooltip
            contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          />
          <Bar dataKey="players" radius={[4, 4, 0, 0]} animationDuration={1500}>
            {data.map((entry, index) => (
              <Cell key={`cell-players-${index}`} fill={barColors[0]} />
            ))}
          </Bar>
          <Bar dataKey="nonPlayers" radius={[4, 4, 0, 0]} animationDuration={1500}>
            {data.map((entry, index) => (
              <Cell key={`cell-non-${index}`} fill={barColors[1]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Big Stat Component
const BigStat = ({ value, suffix = '%', color, description }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animatedValue = useCounter(value, 1500, isInView);

  return (
    <div ref={ref} className="bg-gray-50 rounded-3xl p-8 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="text-7xl md:text-8xl font-bold mb-4"
        style={{ color }}
      >
        {animatedValue}{suffix}
      </motion.div>
      <p className="text-gray-600 text-lg">{description}</p>
      <p className="text-xs text-gray-400 mt-4">Source: Foresight Factory, April 2025</p>
    </div>
  );
};

// Introduction Section
const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="intro" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-8">
              {[colors.blue, colors.orange, colors.blue, colors.orange, colors.blue, colors.orange].map((color, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <h2 className="text-5xl font-light text-gray-900 mb-8">Introduction</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              In 2026 and beyond, lottery players operate in a world where digital systems are
              seamlessly overlaid onto physical life. AI, automation, and connected technologies
              are embedded into daily routines, decision-making, and moments of play.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              The future of the lottery is <strong className="text-gray-900">indistinguishably blended</strong>.
              Four defining trends are shaping how lottery players think, behave, and engage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-50 rounded-3xl p-8">
              <h3 className="text-blue-600 font-semibold mb-2">
                AI usage is growing among weekly lottery players
              </h3>
              <p className="text-sm text-gray-500 mb-8">% who have used generative AI for general information</p>

              <div className="flex justify-center gap-8 flex-wrap">
                <DonutChart percentage={17} label="2024" sublabel="" color={colors.blue} />
                <DonutChart percentage={23} label="2025" sublabel="" color={colors.navy} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Human vs AI preference */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-gray-50 rounded-3xl p-8"
        >
          <h3 className="text-blue-600 font-semibold mb-2">
            Lottery players would pay more for human advice
          </h3>
          <p className="text-sm text-gray-500 mb-8">
            % agreeing "I would pay more for advice guaranteed to be from a human expert, rather than AI"
          </p>

          <div className="flex justify-center gap-16 flex-wrap">
            <DonutChart
              percentage={54}
              label="Global weekly"
              sublabel="lottery players"
              color={colors.blue}
            />
            <DonutChart
              percentage={41}
              label="Global"
              sublabel="non-lottery players"
              color={colors.navy}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Trend Cover Component
const TrendCover = ({ number, title, bgColor, textColor = 'white' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      <CircleDecor size={350} style={{ top: -80, left: '40%' }} delay={0} />
      <CircleDecor size={180} style={{ bottom: 150, left: '60%' }} delay={0.3} />
      <CircleDecor size={280} style={{ bottom: -80, right: -80 }} delay={0.5} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-8"
      >
        <p className={`text-lg tracking-wider mb-4 ${textColor === 'white' ? 'text-white/80' : 'text-gray-800/80'}`}>
          TREND {number}:
        </p>
        <h2 className={`text-5xl md:text-7xl font-light ${textColor === 'white' ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>
      </motion.div>
    </div>
  );
};

// Trend 1: Time to Optimize
const Trend1 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const data = [
    { region: 'Global', players: 66, nonPlayers: 60 },
    { region: 'LatAm', players: 74, nonPlayers: 61 },
    { region: 'APAC', players: 68, nonPlayers: 69 },
    { region: 'N. America', players: 65, nonPlayers: 66 },
    { region: 'Europe', players: 60, nonPlayers: 54 },
  ];

  return (
    <section id="trend1">
      <TrendCover number="1" title="Time to Optimize" bgColor={colors.orange} />

      <div ref={ref} className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
              <h3 className="text-4xl font-light mb-6 text-orange-500">Time to Optimize</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Lottery players are managing uncertainty by taking control of what they can and staying
                curious about how they can optimize their daily life. They deploy creative solutions
                to stay ahead – in appearance, finances, fitness, and personal improvements.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Learning-centric offerings – from immersive retail environments to interactive games –
                will appeal to these curious-minded consumers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <BigStat
                value={85}
                color={colors.orange}
                description="of global weekly lottery players say they feel the need to learn more, up from 79% in 2022"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-16 bg-gray-50 rounded-3xl p-8"
          >
            <h4 className="text-blue-600 font-semibold mb-2">Players want inspiration from brands</h4>
            <p className="text-sm text-gray-500 mb-4">% agreeing "I like it when companies give me ideas of how best to use their products"</p>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.blue }} />
                <span className="text-sm text-gray-600">Weekly lottery players</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.orange }} />
                <span className="text-sm text-gray-600">Non-lottery players</span>
              </div>
            </div>

            <AnimatedBarChart data={data} colors={[colors.blue, colors.orange]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Trend 2: Anticipation Default
const Trend2 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const players = useCounter(18, 1500, isInView);
  const nonPlayers = useCounter(12, 1500, isInView);

  return (
    <section id="trend2">
      <TrendCover number="2" title="Anticipation Default" bgColor={colors.purple} />

      <div ref={ref} className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
              <h3 className="text-4xl font-light mb-6 text-purple-500">Anticipation Default</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                As AI becomes more embedded into everyday life, anticipation becomes the baseline
                expectation. Consumers will increasingly expect brands to understand their habits,
                recognize patterns, and make offers proactively.
              </p>

              <motion.blockquote
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="border-l-4 border-purple-500 pl-6 my-8"
              >
                <p className="text-xl text-gray-700 italic">
                  "In the future, AI will not just research products consumers are already thinking
                  about, but also make product suggestions"
                </p>
              </motion.blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gray-50 rounded-3xl p-8">
                <h4 className="text-purple-600 font-semibold mb-6">Using AI to research products</h4>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Weekly lottery players</span>
                      <span className="font-bold text-2xl text-purple-600">{players}%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-purple-500"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${players * 4}%` } : {}}
                        transition={{ duration: 1.5 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Non-lottery players</span>
                      <span className="font-bold text-2xl text-gray-500">{nonPlayers}%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gray-400"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${nonPlayers * 4}%` } : {}}
                        transition={{ duration: 1.5 }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-6">Surpasses 1 in 5 weekly players in APAC and LatAm</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Trend 3: Unplugged & Present
const Trend3 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="trend3">
      <TrendCover number="3" title="Unplugged & Present" bgColor={colors.yellow} textColor="dark" />

      <div ref={ref} className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
              <h3 className="text-4xl font-light mb-6 text-yellow-600">Unplugged & Present</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                The push toward digital is creating greater demand for analog. Consumers are
                looking for ways to bring themselves into the physical moment.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                The physical aspects of retail and lottery experiences are incredibly valuable.
                Differentiated designs create unique tactile experiences.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="p-6 bg-yellow-50 rounded-2xl border-l-4 border-yellow-500"
              >
                <p className="text-gray-700">
                  <strong>Only 1 in 5</strong> global weekly lottery players like stores with
                  little to no human interaction
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gray-50 rounded-3xl p-8">
                <h4 className="text-yellow-600 font-semibold mb-2">Physical activities appeal to players</h4>
                <p className="text-sm text-gray-500 mb-8">% agreeing "I find activities using my hands soothing"</p>

                <div className="flex justify-center gap-8 flex-wrap">
                  <DonutChart
                    percentage={69}
                    label="Global weekly"
                    sublabel="lottery players"
                    color={colors.blue}
                  />
                  <DonutChart
                    percentage={62}
                    label="Global"
                    sublabel="non-lottery players"
                    color={colors.yellow}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Trend 4: Personalized Storytelling
const Trend4 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const data = [
    { region: 'Global', players: 66, nonPlayers: 53 },
    { region: 'LatAm', players: 71, nonPlayers: 59 },
    { region: 'APAC', players: 66, nonPlayers: 52 },
    { region: 'N. America', players: 67, nonPlayers: 52 },
    { region: 'Europe', players: 64, nonPlayers: 52 },
  ];

  return (
    <section id="trend4">
      <TrendCover number="4" title="Personalized Storytelling" bgColor={colors.slate} />

      <div ref={ref} className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
              <h3 className="text-4xl font-light mb-6 text-slate-600">Personalized Storytelling</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                In an AI-saturated world, human originality and storytelling are at a premium.
                Consumers look for storytelling that feels crafted for one, not broadcast to many.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Lotteries that show up with warmth, clear purpose, and visible contributions to
                communities build trust and long-term loyalty.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <BigStat
                value={66}
                color={colors.slate}
                description="of weekly lottery players want to buy from brands that reflect their personal values (vs. 58% globally)"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <h4 className="text-slate-600 font-semibold mb-2">Players seek value reflection in brands</h4>
            <p className="text-sm text-gray-500 mb-4">% expressing need to buy from brands reflecting personal values</p>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.blue }} />
                <span className="text-sm text-gray-600">Weekly lottery players</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.slate }} />
                <span className="text-sm text-gray-600">Non-lottery players</span>
              </div>
            </div>

            <AnimatedBarChart data={data} colors={[colors.blue, colors.slate]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Scenarios Section
const ScenariosSection = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const scenarios = [
    {
      number: 1,
      title: "Optimized Play Moments",
      color: colors.orange,
      description: "AI detects downtime and fandom engagement to send personalized notifications. Digital delivery enables immediate, tailored experiences while responsible gaming tools recognize when players should take breaks.",
      highlight: "New purchasing moments unlocked through AI-detected downtime"
    },
    {
      number: 2,
      title: "AI-Enabled Assistance",
      color: colors.purple,
      description: "Players use AI-enabled glasses for assistance—locating retailers, checking results, and receiving personalized game suggestions. Geolocation data provides community impact insights.",
      highlight: "Comprehensive AI profiles maximize player potential"
    },
    {
      number: 3,
      title: "Human-AI Harmony",
      color: colors.slate,
      description: "Players turn to AI tools for lottery suggestions while human experts step in for complex scenarios. In-app chatbots and retail displays connect players with game information.",
      highlight: "Seamless blend of AI convenience and human expertise"
    }
  ];

  return (
    <section ref={ref} id="scenarios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-light text-gray-900 mb-4">Future Scenarios</h2>
          <p className="text-xl text-gray-600">Three possible futures for lottery engagement</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {scenarios.map((scenario, index) => (
            <motion.button
              key={index}
              onClick={() => setActive(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                active === index
                  ? 'text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={active === index ? { backgroundColor: scenario.color } : {}}
            >
              Scenario #{scenario.number}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div
              className="rounded-3xl p-12 text-white relative overflow-hidden"
              style={{ backgroundColor: scenarios[active].color }}
            >
              <motion.div
                animate={{ y: [0, -15, 0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-white opacity-20"
              />
              <div className="relative z-10">
                <p className="text-white/70 mb-2">POSSIBLE FUTURE</p>
                <h3 className="text-4xl font-light mb-6">Scenario #{scenarios[active].number}</h3>
                <h4 className="text-2xl font-medium">{scenarios[active].title}</h4>
              </div>
            </div>

            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {scenarios[active].description}
              </p>
              <div
                className="p-6 rounded-2xl border-l-4"
                style={{
                  backgroundColor: `${scenarios[active].color}15`,
                  borderColor: scenarios[active].color
                }}
              >
                <p className="font-medium" style={{ color: scenarios[active].color }}>
                  {scenarios[active].highlight}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// Conclusion Section
const ConclusionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const trends = [
    { name: 'Time to Optimize', color: colors.orange },
    { name: 'Anticipation Default', color: colors.purple },
    { name: 'Unplugged & Present', color: colors.yellow, textDark: true },
    { name: 'Personalized Storytelling', color: colors.slate }
  ];

  return (
    <section ref={ref} id="conclusion" className="relative overflow-hidden" style={{ backgroundColor: colors.yellow }}>
      <CircleDecor size={300} style={{ top: -80, left: '30%' }} delay={0} />
      <CircleDecor size={150} style={{ bottom: 100, right: 100 }} delay={0.3} />

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-8">
            Looking Ahead for Lotteries
          </h2>

          <p className="text-xl text-gray-800 leading-relaxed mb-12">
            To build a successful brand strategy in 2026 and beyond, balancing AI innovations
            with human connection will be key. Lotteries will need to blend digital and analog
            solutions to meet players in this new era.
          </p>

          <div className="flex flex-wrap gap-4">
            {trends.map((trend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`px-6 py-3 rounded-full font-medium cursor-default ${
                  trend.textDark ? 'text-gray-900 border-2 border-gray-900' : 'text-white'
                }`}
                style={{ backgroundColor: trend.color }}
              >
                {trend.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-gray-900/10 py-8">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap items-center justify-between gap-4">
          <Logo className="h-8" />

          <div className="flex items-center gap-4 text-gray-700 text-sm">
            <span>Powered by</span>
            <img
              src="https://www.foresightfactory.co/wp-content/themes/foresight-factory/images/foresight-factory-logo.svg"
              alt="Foresight Factory"
              className="h-5"
            />
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">© 2026 Brightstar Global Solutions</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App
export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'intro', 'trend1', 'trend2', 'trend3', 'trend4', 'scenarios', 'conclusion'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans antialiased">
      <Navigation activeSection={activeSection} />
      <HeroSection />
      <IntroSection />
      <Trend1 />
      <Trend2 />
      <Trend3 />
      <Trend4 />
      <ScenariosSection />
      <ConclusionSection />
    </div>
  );
}
