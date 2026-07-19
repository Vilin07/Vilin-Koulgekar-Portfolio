import Constellation from "../../components/universe/Constellation";
import ProjectPlanet from "../../components/universe/ProjectPlanet";
import { CHAPTERS } from "../config/chapters";

export default function ChapterOne({ phase, scrollProgress, motionScale }) {
  const chapter = CHAPTERS.chapterOne;

  return (
    <>
      <Constellation chapter={chapter.constellation} phase={phase} scrollProgress={scrollProgress} motionScale={motionScale} />
      <ProjectPlanet chapter={chapter.planet} phase={phase} scrollProgress={scrollProgress} motionScale={motionScale} />
    </>
  );
}
