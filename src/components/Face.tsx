import React, { useState, useEffect, FC } from "react";
import { Text, Image, Html } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { animate, MotionValue, useMotionValue } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { TPage, TImageList, TImage, TInfo, FrameState } from "~/Types";
import { config } from "./config";
import useStore from "~/context/store";

export const Wrapper = React.memo(() => {
  const { pages } = config;
  return (
    <>
      {pages.map((page, index) => (
        <Face page={page} key={index} />
      ))}
    </>
  );
});

type FaceProps = {
  page: TPage;
};

const Face: FC<FaceProps> = React.memo(({ page }) => {
  const [viewConfig, setViewConfig] = useState<{
    webUrl?: string;
    link?: string;
  }>({});

  const { webUrl, link } = viewConfig;

  const cameraPositionX: MotionValue<number> = useMotionValue(0);
  const cameraLootAtX: MotionValue<number> = useMotionValue(0);
  const {
    cubePosition,
    cubeAnimation,
    setOverlayVisibility,
    isOverlayVisible,
    isMobile,
  } = useStore();

  const {
    title,
    titlePos,
    titleScale,
    meshProps,
    pageCords,
    imageList,
    infos,
    startScale,
    groupPos,
    rotateY,
  } = page;

  useEffect(() => {
    animate(cameraPositionX, (webUrl || link) && isOverlayVisible ? 5 : 0);
    animate(cameraLootAtX, (webUrl || link) && isOverlayVisible ? -5 : 0);
  }, [webUrl, link, isOverlayVisible]);

  useFrame((state: FrameState) => {
    if ((webUrl || link) && isOverlayVisible) {
      state.camera.position.x = cameraPositionX.get();
      state.camera.lookAt(cameraLootAtX.get(), 0, 0);
    }
  });

  const handleImageClick = (img: TImage) => {
    if (img.target) {
      return window.open(img.target, "_blank");
    }

    if (isMobile) {
      window.open(img.link || img.websiteURL, "_blank");
      return;
    }
    setOverlayVisibility(true);
    setViewConfig({
      link: img.link,
      webUrl: img.websiteURL,
    });
  };

  const calculatePositions = (imageList: TImageList, index: number) => {
    const calculateAmountOfRows =
      imageList.leftPadding +
      Math.floor(index / imageList.rows) / imageList.separation;
    const calculateColumns =
      imageList.topPadding +
      Math.floor(index / imageList.rows) -
      index / imageList.rows;

    return {
      calculateAmountOfRows,
      calculateColumns,
    };
  };

  let sc = 0;
  if (!cubeAnimation) {
    if (page.page === cubePosition) {
      sc = pageCords.scale;
    }
  }

  return (
    <>
      {(webUrl || link) && isOverlayVisible && (
        <HtmlOverlay link={link} webUrl={webUrl} />
      )}
      <motion.group
        initial={{
          scale: startScale,
          rotateY: rotateY || 0,
        }}
        position={pageCords.pos}
        animate={{
          scale: sc,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <mesh position={meshProps.pos}>
          <Text position={titlePos} scale={titleScale} color={"red"}>
            {title}
          </Text>
          <group position={groupPos}>
            {imageList &&
              imageList.images.map((img: TImage, index: number) => {
                const { calculateAmountOfRows, calculateColumns } =
                  calculatePositions(imageList, index);
                return (
                  <motion.group
                    key={index}
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{ delay: index / 3 }}
                  >
                    <Image
                      onClick={() => handleImageClick(img)}
                      transparent
                      zoom={img.zoom}
                      scale={img.scale || imageList.scale}
                      position={[calculateAmountOfRows, calculateColumns, 0.4]}
                      url={img.url}
                    />
                  </motion.group>
                );
              })}
          </group>
          {infos.map((info: TInfo, index: number) => (
            <Text
              maxWidth={25}
              position={info.pos}
              key={index}
              scale={info.scale}
            >
              {info.text}
            </Text>
          ))}
        </mesh>
      </motion.group>
    </>
  );
});

type TOverlay<K extends string = "link" | "webUrl", T = string | undefined> = {
  [key in K]: T;
};

const HtmlOverlay: FC<TOverlay> = ({ link, webUrl }) => {
  return (
    <Html
      as="div"
      transform
      scale={0.3}
      rotation={[0, 1, 0]}
      position={[-10, 0, 0]}
      zIndexRange={[0, 10]}
      style={{
        height: 800,
        width: 800,
        backgroundColor: "gray",
      }}
    >
      {!link && (
        <div className="left-2/4 top-2/4 text-2xl font-bold absolute">
          {"Loading..."}
        </div>
      )}
      {link && (
        <div className="text-xl absolute top-0 left-0 w-full h-full bg-slate-200">
          <div className="absolute w-full h-1/5 bg-neutral-300 p-5">
            <p>To see please follow the link.</p>
            <h1 className="align-center text-5xl mt-5">
              Website url:
              <a
                href={link}
                target="_blank"
                className="underline text-green-500"
              >
                {link}
              </a>
            </h1>
          </div>
        </div>
      )}
      {webUrl && (
        <iframe
          title={"Description"}
          className="w-full h-full absolute z-50"
          src={webUrl}
        />
      )}
    </Html>
  );
};

export default Wrapper;
