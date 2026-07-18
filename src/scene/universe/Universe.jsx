import Galaxy from "./Galaxy";
import StarsField from "./Stars";
import Lights from "./Lights";
import Effects from "./Effects";
import CameraRig from "./CameraRig";
import Nebula from "./Nebula";
import GalaxyCore from "./GalaxyCore";

export default function Universe() {
  return (
    <>
      <CameraRig />

      <Lights />

       <Nebula />

       <GalaxyCore />

      <Galaxy />

      <StarsField />

      <Effects />
    </>
  );
}