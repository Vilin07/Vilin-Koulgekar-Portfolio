import KnowledgeGalaxy from "../../components/universe/KnowledgeGalaxy";
import { KNOWLEDGE_GALAXY } from "../config/knowledge";

export default function KnowledgeChapter({ phase, scrollProgress, motionScale }) {
  return <KnowledgeGalaxy galaxy={KNOWLEDGE_GALAXY} phase={phase} scrollProgress={scrollProgress} motionScale={motionScale} />;
}
