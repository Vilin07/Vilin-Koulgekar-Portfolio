// Legacy/inactive camera adapter retained for the previous scene/core path.
// The live runtime mounts components/universe/CameraController directly.
import CameraController from "../../components/universe/CameraController";

export default function CameraRig() {
  return <CameraController progress={0} motionScale={1} />;
}
