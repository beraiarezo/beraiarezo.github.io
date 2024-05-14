import { Experience } from "./components/Experience";
import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect, useState } from "react";
import { Menu } from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { framerMotionConfig } from "./config";
import { Cursor } from "~/components/Cursor";
import { Keyboard } from "~/components/Keyboard";
import Wrapper from "./components/Face";
import useStore from "~/context/store";

const MAX_SECTION = 4;
const MIN_SECTION = 0;

const NEXT = ["KeyW", "KeyD"];
const PREV = ["KeyS", "KeyA"];

type StoreT = {
  animationOn: boolean;
  setAnimation: (value: boolean) => void;
  sectionY: number;
  setSectionY: (y: number) => void;
};

function App() {
  const [keyStatus, setKeyStatus] = useState("");
  const [menuOpened, setMenuOpened] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > minSwipeDistance;
    if (!isSwipe) return;

    if (distance > 0) {
      setCubePosition(Math.min(cubePosition + 1, MAX_SECTION));
    } else {
      setCubePosition(Math.max(cubePosition - 1, MIN_SECTION));
    }
  };

  const minSwipeDistance = 20;

  const {
    setCubeAnimation,
    cubePosition,
    setCubePosition,
    setOverlayVisibility,
  }: any = useStore();

  const keyDown = (event: KeyboardEvent) => {
    setCubeAnimation(true);
    setKeyStatus(event.code);
    if (NEXT.includes(event.code)) {
      setCubePosition(Math.min(cubePosition + 1, MAX_SECTION));
    } else if (PREV.includes(event.code)) {
      setCubePosition(Math.max(cubePosition - 1, MIN_SECTION));
    }

    setCubeAnimation(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) =>
      NEXT.concat(PREV).includes(event.code) ? keyDown(event) : null;

    const handleKeyUp = () => setKeyStatus("");

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    setOverlayVisibility(false);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [cubePosition]);

  useEffect(() => {}, []);

  window.focus();

  const updateSection = useCallback((section: number) => {
    setCubeAnimation(true);
    setCubePosition(section);
    setCubeAnimation(false);
  }, []);

  return (
    <>
      <div
        className="w-full h-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <MotionConfig
          transition={{
            ...framerMotionConfig,
          }}
        >
          <Canvas camera={{ position: [0, -1, 8], fov: 32 }}>
            <color attach="background" args={["#000"]} />
            <Wrapper />
            <Experience menuOpened={menuOpened} />
          </Canvas>
          <Menu
            onSectionChange={updateSection}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
          <Cursor />
          <Keyboard keyStatus={keyStatus} />
        </MotionConfig>
      </div>
    </>
  );
}

export default App;
