import Lights from "../../scene/universe/Lights";
import FarStars from "../../scene/sky/FarStars";
import StarsField from "../../scene/sky/StarsField";
import CosmicDust from "../../scene/atmosphere/CosmicDust";
import Galaxy from "../../scene/galaxy/Galaxy";
import GalaxyCore from "../../scene/galaxy/GalaxyCore";
import Effects from "../../scene/effects/Effects";
import UniverseGlow from "../../scene/atmosphere/UniverseGlow";
import { UniverseQuality } from "./UniverseQuality";
import CameraController from "./CameraController";

export default function Universe({ quality, scrollProgress }) {
  return (
    <UniverseQuality quality={quality}>
      <CameraController progress={scrollProgress} motionScale={quality.motionScale} />
      <Lights />
      <FarStars count={quality.farStars} motionScale={quality.motionScale} />
      <GalaxyCore motionScale={quality.motionScale} />
      <Galaxy count={quality.galaxy} motionScale={quality.motionScale} />
      <StarsField count={quality.stars} motionScale={quality.motionScale} />
      <CosmicDust count={quality.dust} motionScale={quality.motionScale} />
      {quality.effects && <Effects />}
      <UniverseGlow />
    </UniverseQuality>
  );
}
