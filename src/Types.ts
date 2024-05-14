import { Vector3, Camera } from "three";

type TCvector = Vector3 | [x: number, y: number, z: number];

export type TPage = {
  startScale: number;
  title: string;
  titlePos: TCvector;
  titleScale: number;
  pageCords: {
    pos: TCvector;
    scale: number;
  };
  meshProps: {
    pos?: TCvector;
  };
  infos: TInfo[];
  imageList?: TImageList;
  groupPos?: TCvector;
  rotateY?: number;
};

export type TInfo = {
  text: string;
  pos: TCvector;
  scale: number;
};

export type TImageList = {
  rows: number;
  separation: number;
  leftPadding: number;
  topPadding: number;
  scale: number | [number, number];
  images: TImage[];
};

export type TImage = {
  url: string;
  zoom?: number;
  websiteURL?: string;
  link?: string;
  target?: string;
  scale?: [number, number];
  pos?: TCvector;
};

export type FrameState = {
  camera: Camera;
};
