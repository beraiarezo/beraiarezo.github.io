import { useState, useEffect, FC } from "react";
import { Text, Image, Html } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { animate, MotionValue, useMotionValue } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { TPage, TImageList, TImage, TInfo, FrameState } from "~/Types";

type FaceProps = {
  page: TPage;
};

const Face: FC<FaceProps> = ({ page }) => {
  const [webUrl, setWebUrl] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const cameraPositionX: MotionValue<number> = useMotionValue(0);
  const cameraLootAtX: MotionValue<number> = useMotionValue(0);

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
    animate(cameraPositionX, webUrl || link ? 5 : 0);
    animate(cameraLootAtX, webUrl || link ? -5 : 0);
  }, [webUrl, link]);

  useFrame((state: FrameState) => {
    if (webUrl || link) {
      state.camera.position.x = cameraPositionX.get();

      state.camera.lookAt(cameraLootAtX.get(), 0, 0);
    }
  });

  const handleImageClick = (img: TImage) => {
    if (img.websiteURL) {
      setLink(null);
      setWebUrl(img.websiteURL);
    } else if (img.target) {
      window.open(img.target, "_blank");
    } else if (img.link) {
      setWebUrl(null);
      setLink(img.link);
    } else {
      setWebUrl(null);
    }
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

  return (
    <>
      {(webUrl || link) && <HtmlOverlay link={link} webUrl={webUrl} />}
      <motion.group
        initial={{
          scale: startScale,
          rotateY: rotateY || 0,
        }}
        position={pageCords.pos}
        animate={{
          scale: pageCords.scale,
        }}
        transition={{
          duration: 0.3,
          delay: 0.5,
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
                    transition={{ delay: index / 4 }}
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
};

type TOverlay<K extends string = "link" | "webUrl", T = string | null> = {
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
        <div
          style={{
            position: "absolute",
            zIndex: 0,
            top: "50%",
            left: "50%",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
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
          style={{
            height: "100%",
            width: "100%",
            zIndex: 100,
            position: "absolute",
          }}
          src={webUrl}
        />
      )}
    </Html>
  );
};

export default Face;
