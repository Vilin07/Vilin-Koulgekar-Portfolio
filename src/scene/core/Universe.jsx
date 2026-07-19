// Legacy/inactive scene composition. The live runtime uses
// components/universe/Universe, mounted by UniverseCanvas.
import Galaxy from "../galaxy/Galaxy";
import GalaxyCore from "../galaxy/GalaxyCore";

import StarsField from "../sky/StarsField";
import FarStars from "../sky/FarStars";

import Lights from "../universe/Lights";

import CameraRig from "../camera/CameraRig";

import Effects from "../effects/Effects";

import Nebula from "../atmosphere/Nebula";

import UniverseGlow from "../atmosphere/UniverseGlow";

import CosmicDust from "../atmosphere/CosmicDust";

export default function Universe() {
  return (
    <>
      <CameraRig />

      <Lights />

      <FarStars />
  
      <Nebula />

      <GalaxyCore />

      <Galaxy />

      <StarsField />

      <CosmicDust />

      <Effects />

       <UniverseGlow />
    </>
  );
}
