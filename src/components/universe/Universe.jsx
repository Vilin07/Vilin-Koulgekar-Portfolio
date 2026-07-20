import Lights from "./lights/Lights";
import FarStars from "./sky/FarStars";
import StarsField from "./sky/StarsField";
import CosmicDust from "./atmosphere/CosmicDust";
import Galaxy from "./galaxy/Galaxy";
import GalaxyCore from "./galaxy/GalaxyCore";
import Effects from "./effects/Effects";
//import UniverseGlow from "./atmosphere/UniverseGlow";
import { UniverseQuality } from "./UniverseQuality";
import CameraController from "./CameraController";
import OriginStar from "./OriginStar";
import ChapterOne from "../../experience/chapters/ChapterOne";
import KnowledgeChapter from "../../experience/chapters/KnowledgeChapter";
import CosmicBackground from "./atmosphere/CosmicBackground";
import Nebula from "./atmosphere/Nebula";
import HeroStars from "./sky/HeroStars";
import GalaxyHaze from "./galaxy/GalaxyHaze";


export default function Universe({ quality, scrollProgress, phase }) {
  return (
    <UniverseQuality quality={quality}>
      <CosmicBackground />
      <CameraController progress={scrollProgress} motionScale={quality.motionScale} phase={phase} />
      <Nebula />
      <Lights />
      <FarStars count={quality.farStars} motionScale={quality.motionScale} />
      <HeroStars
        motionScale={quality.motionScale}
      />
      <GalaxyHaze />
      <GalaxyCore motionScale={quality.motionScale} />
      <Galaxy count={quality.galaxy} motionScale={quality.motionScale} />
      <StarsField count={quality.stars} motionScale={quality.motionScale} />
      <CosmicDust count={quality.dust} motionScale={quality.motionScale} />
      <OriginStar phase={phase} motionScale={quality.motionScale} />
      <ChapterOne phase={phase} scrollProgress={scrollProgress} motionScale={quality.motionScale} />
      <KnowledgeChapter phase={phase} scrollProgress={scrollProgress} motionScale={quality.motionScale} />
      {quality.effects && <Effects />}
      {/* <UniverseGlow /> */}
    </UniverseQuality>
  );
}
