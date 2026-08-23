import FarStars from "./sky/FarStars";
import StarsField from "./sky/StarsField";
import CosmicDust from "./atmosphere/CosmicDust";
import Galaxy from "./galaxy/Galaxy";
import Effects from "./effects/Effects";
import { UniverseQuality } from "./UniverseQuality";
import CameraController from "./CameraController";
import OriginStar from "./OriginStar";
import ChapterOne from "../../experience/chapters/ChapterOne";
import KnowledgeChapter from "../../experience/chapters/KnowledgeChapter";
import CosmicBackground from "./atmosphere/CosmicBackground";
import GalaxyNucleus from "./galaxy/GalaxyNucleus";

export default function Universe({ quality, scrollProgress, phase }) {
  const hasSpace = phase !== "boot";
  const hasJourney = phase === "journey";

  return (
    <UniverseQuality quality={quality}>
      <CosmicBackground />
      <CameraController progress={scrollProgress} motionScale={quality.motionScale} phase={phase} />
      {hasSpace && <FarStars count={quality.farStars} motionScale={quality.motionScale} />}
      {phase !== "space_reveal" && <StarsField count={quality.stars} motionScale={quality.motionScale} />}
      {hasJourney && <Galaxy count={quality.galaxy} motionScale={quality.motionScale} />}
      {hasJourney && <GalaxyNucleus motionScale={quality.motionScale} />}
      {hasJourney && <CosmicDust count={quality.dust} motionScale={quality.motionScale} />}
      <OriginStar phase={phase} motionScale={quality.motionScale} />
      {hasJourney && <ChapterOne phase={phase} scrollProgress={scrollProgress} motionScale={quality.motionScale} />}
      {hasJourney && <KnowledgeChapter phase={phase} scrollProgress={scrollProgress} motionScale={quality.motionScale} />}
      {hasSpace && quality.effects && <Effects />}
    </UniverseQuality>
  );
}
