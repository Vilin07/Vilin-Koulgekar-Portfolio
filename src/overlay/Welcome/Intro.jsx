import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="fixed inset-0 flex items-center justify-center pointer-events-none z-20 transition-opacity duration-700">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
        className="text-center"
      >
        <p className="text-blue-300 tracking-[0.8em] text-xl mb-6">
          ॐ
        </p>

        <h1 className="text-7xl md:text-8xl font-light text-white">
          स्वागतम्
        </h1>

        <p className="mt-8 text-blue-200 text-xl tracking-[0.25em]">
          Knowledge is Infinite
        </p>

        <motion.p
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-20 text-sm tracking-[0.5em] text-blue-400"
        >
          SCROLL TO BEGIN
        </motion.p>
      </motion.div>
    </section>
  );
}