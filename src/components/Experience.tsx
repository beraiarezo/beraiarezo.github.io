import { useEffect, useState, FC } from "react";
import { RoundedBox } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useFrame } from "@react-three/fiber";
import { animate, useMotionValue, useAnimationControls } from "framer-motion";
import * as THREE from "three";
import useStore from "~/context/store";

type ExperienceProps = {
  menuOpened: boolean;
};

export const Experience: FC<ExperienceProps> = ({ menuOpened }) => {
  const [cameraMove, setCameraMove] = useState(false);
  const cameraPositionX = useMotionValue(0);
  const cameraLootAtX = useMotionValue(0);
  const { cubePosition, isOverlayVisible } = useStore();

  const vec = new THREE.Vector3();

  const controls = useAnimationControls();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? 3 : 8);
    animate(cameraLootAtX, menuOpened ? 1 : 0);
  }, [menuOpened]);

  useEffect(() => {
    if (cameraMove) {
      animate(cameraPositionX, menuOpened ? -5 : 0, { duration: 5 });
      animate(cameraLootAtX, menuOpened ? 3 : 0, { duration: 5 });
    }
  }, [cameraMove]);

  useEffect(() => {
    if (cubePosition < 4) {
      controls.start({
        rotateX: (-Math.PI / 2) * cubePosition,
        transition: { duration: 0.3 },
      });
      setCameraMove(false);
    } else {
      setCameraMove(true);
    }
  }, [cubePosition]);

  useFrame((state) => {
    if (cameraMove) {
      state.camera.position.lerp(vec.set(8, 0, 0), 0.02);
    } else {
      state.camera.position.lerp(vec.set(0, -1, 8), 0.02);
    }
    if (menuOpened) {
      state.camera.position.lerp(vec.set(!cameraMove ? -13 : 13, 1, 5), 0.02);
    }

    if (!isOverlayVisible) {
      state.camera.lookAt(cameraLootAtX.get(), 0, 0);
    }
  });

  return (
    <>
      <motion.group scale={3} animate={controls}>
        <RoundedBox
          args={[1, 1, 1]}
          radius={0.05}
          smoothness={4}
          bevelSegments={4}
          creaseAngle={0.4}
        >
          {!menuOpened && (
            <meshPhongMaterial color="royalblue" wireframe={menuOpened} />
          )}
          {menuOpened && <meshNormalMaterial wireframe={menuOpened} />}
        </RoundedBox>
      </motion.group>
    </>
  );
};
