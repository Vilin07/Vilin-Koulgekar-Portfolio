const CHAPTERS = ["ORIGIN", "KNOWLEDGE", "PROJECTS", "ACHIEVEMENT", "PHILOSOPHY", "CONTACT"];

export default function JourneyIndicator({ progress }) {
  const activeIndex = Math.min(CHAPTERS.length - 1, Math.floor(progress * CHAPTERS.length));
  const navigate = (index) => {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: distance * ((index + 0.08) / CHAPTERS.length), behavior: "smooth" });
  };

  return <nav aria-label="Journey chapters" className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 md:block"><ol className="space-y-3">{CHAPTERS.map((chapter, index) => <li key={chapter}><button type="button" onClick={() => navigate(index)} className="group flex items-center gap-3 text-left"><span className={`h-px transition-all ${activeIndex === index ? "w-5 bg-blue-100/70" : "w-2 bg-blue-100/20 group-hover:w-4"}`} /><span className={`text-[0.5rem] tracking-[0.22em] transition ${activeIndex === index ? "text-blue-100/75" : "text-blue-100/30 group-hover:text-blue-100/55"}`}>{String(index + 1).padStart(2, "0")} {chapter}</span></button></li>)}</ol></nav>;
}
