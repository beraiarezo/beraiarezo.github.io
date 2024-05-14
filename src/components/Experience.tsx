import { useEffect, useState, FC } from "react";
import { OrbitControls, Sky, RoundedBox } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useFrame } from "@react-three/fiber";
import { animate, useMotionValue, useAnimationControls } from "framer-motion";
import * as THREE from "three";

type ExperienceProps = {
  sectionY: number;
  menuOpened: boolean;
};

export const Experience: FC<ExperienceProps> = ({ sectionY, menuOpened }) => {
  const cameraPositionX = useMotionValue(0);
  const cameraLootAtX = useMotionValue(0);

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? 3 : 8);
    animate(cameraLootAtX, menuOpened ? 1 : 0);
  }, [menuOpened]);

  const [cameraMove, setCameraMove] = useState(false);

  useEffect(() => {
    if (cameraMove) {
      animate(cameraPositionX, menuOpened ? -5 : 0);
      animate(cameraLootAtX, menuOpened ? 3 : 0);
    }
  }, [cameraMove]);

  const vec = new THREE.Vector3();
  useFrame((state) => {
    if (cameraMove) {
      state.camera.position.lerp(vec.set(8, 0, 0), 0.02);
    } else {
      state.camera.position.lerp(vec.set(0, -1, 8), 0.02);
    }

    if (menuOpened) {
      state.camera.position.lerp(vec.set(!cameraMove ? -13 : 13, 1, 5), 0.03);
    }

    state.camera.lookAt(cameraLootAtX.get(), 0, 0);
  });

  const controls = useAnimationControls();

  useEffect(() => {
    if (sectionY < 4) {
      controls.start({ rotateX: (-Math.PI / 2) * sectionY });
      setCameraMove(false);
    } else {
      setCameraMove(true);
    }
  }, [sectionY]);

  return (
    <>
      <OrbitControls />
      <Sky />
      <ambientLight intensity={1} />
      <motion.group scale={3} animate={controls}>
        <RoundedBox
          args={[1, 1, 1]}
          radius={0.05}
          smoothness={4}
          bevelSegments={4}
          creaseAngle={0.4}
        >
          <meshPhongMaterial color="royalblue" />
        </RoundedBox>
      </motion.group>
    </>
  );
};
