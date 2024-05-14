import { Experience } from "./components/Experience";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Menu } from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { framerMotionConfig } from "./config";
import { Cursor } from "~/components/Cursor";
import { Keyboard } from "~/components/Keyboard";
import { config } from "./components/config";
import Face from "./components/Face";
import useStore from "~/context/store";

const MAX_SECTION = 4;
const MIN_SECTION = 0;

const NEXT = ["KeyW", "KeyD"];
const PREV = ["KeyS", "KeyA"];

function App() {
  const [keyStatus, setKeyStatus] = useState("");
  const [sectionY, setSectionY] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  const { animationOn, setAnimation }: any = useStore();

  const keyDown = (event: KeyboardEvent) => {
    setAnimation(true);
    setKeyStatus(event.code);
    if (NEXT.includes(event.code)) {
      setSectionY((prevSectionY) => Math.min(prevSectionY + 1, MAX_SECTION));
    } else if (PREV.includes(event.code)) {
      setSectionY((prevSectionY) => Math.max(prevSectionY - 1, MIN_SECTION));
    }

    setTimeout(() => setAnimation(false), 200);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) =>
      NEXT.concat(PREV).includes(event.code) ? keyDown(event) : null;

    const handleKeyUp = () => setKeyStatus("");

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  window.focus();

  const updateSection = (section: number) => {
    setAnimation(true);
    setSectionY(() => section);
    setTimeout(() => setAnimation(false), 700);
  };

  return (
    <>
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        <Canvas camera={{ position: [0, -1, 8], fov: 32 }}>
          <color attach="background" args={["#000"]} />
          <Experience sectionY={sectionY} menuOpened={menuOpened} />
          {!animationOn &&
            config.pages.map(
              (section, index) =>
                sectionY === index && <Face key={index} page={section} />
            )}
        </Canvas>
        <Menu
          onSectionChange={updateSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
        <Cursor />
        <Keyboard keyStatus={keyStatus} />
      </MotionConfig>
    </>
  );
}

export default App;
