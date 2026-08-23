import { AnimatePresence, motion } from "framer-motion";
import { PORTFOLIO } from "../config/portfolio";

function getMoment(progress) {
  if (progress >= 0.82) return { id: "contact", eyebrow: "FINAL DESTINATION", title: "The journey continues.", body: "The universe continues, and this is where we can connect." };
  if (progress >= 0.7) return { id: "philosophy", eyebrow: "PHILOSOPHY", title: "Curious by nature.", body: "Committed to learning." };
  if (progress >= 0.58) return { id: "achievement", eyebrow: "ACHIEVEMENT", title: PORTFOLIO.achievement.title, body: PORTFOLIO.achievement.description, detail: PORTFOLIO.achievement.detail };
  if (progress >= 0.52) return { id: "student-stress", eyebrow: "CHAPTER III", title: PORTFOLIO.projects[2].title, body: PORTFOLIO.projects[2].description, detail: `${PORTFOLIO.projects[2].stack}\n${PORTFOLIO.projects[2].features}` };
  if (progress >= 0.46) return { id: "sakhi", eyebrow: "CHAPTER II", title: PORTFOLIO.projects[1].title, body: PORTFOLIO.projects[1].description, detail: `${PORTFOLIO.projects[1].stack}\n${PORTFOLIO.projects[1].features}` };
  if (progress >= 0.4) return { id: "hospital", eyebrow: "CHAPTER I", title: PORTFOLIO.projects[0].title, body: PORTFOLIO.projects[0].description, detail: `${PORTFOLIO.projects[0].stack}\n${PORTFOLIO.projects[0].features}` };
  if (progress >= 0.25) return { id: "knowledge", eyebrow: "KNOWLEDGE GALAXY", title: "What I am learning", body: PORTFOLIO.skills.map((skill) => `${skill.label}: ${skill.technologies.join(" · ")}`).join("\n") };
  return null;
}

export default function PortfolioOverlay({ phase, scrollProgress }) {
  const moment = phase === "journey" ? getMoment(scrollProgress) : null;
  return <AnimatePresence mode="wait">{moment && <motion.aside key={moment.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} className="pointer-events-none fixed inset-x-0 bottom-12 z-20 mx-auto w-[min(34rem,calc(100vw-3rem))] text-center sm:bottom-16">
    <p className="text-[0.55rem] font-light tracking-[0.34em] text-blue-100/45">{moment.eyebrow}</p>
    <h2 className="mt-3 font-[Cormorant_Garamond] text-2xl font-medium leading-tight tracking-[0.04em] text-white/88 sm:text-3xl">{moment.title}</h2>
    <p className="mt-3 whitespace-pre-line text-[0.68rem] font-light leading-relaxed tracking-[0.08em] text-blue-100/58 sm:text-xs">{moment.body}</p>
    {moment.detail && <p className="mt-3 whitespace-pre-line text-[0.62rem] leading-relaxed text-blue-100/42">{moment.detail}</p>}
    {moment.id === "contact" && <div className="pointer-events-auto mt-5 flex justify-center gap-5 text-[0.62rem] tracking-[0.16em] text-blue-100/75"><a className="underline decoration-blue-200/25 underline-offset-8 transition hover:text-white" href={`mailto:${PORTFOLIO.contact.email}`}>EMAIL</a><a className="underline decoration-blue-200/25 underline-offset-8 transition hover:text-white" href={PORTFOLIO.contact.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a className="underline decoration-blue-200/25 underline-offset-8 transition hover:text-white" href={PORTFOLIO.contact.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a></div>}
  </motion.aside>}</AnimatePresence>;
}
