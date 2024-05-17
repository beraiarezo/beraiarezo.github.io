import { create } from "zustand";

interface StoreState {
  cubeAnimation: boolean;
  cubePosition: number;
  facePosition: number;
  isOverlayVisible: boolean;
  isMobile: boolean;
  setCubeAnimation: (isTrue: boolean) => void;
  setCubePosition: (position: number) => void;
  setFacePosition: (position: number) => void;
  setOverlayVisibility: (isVisible: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  cubeAnimation: false,
  setCubeAnimation: (isTrue: boolean) => set(() => ({ cubeAnimation: isTrue })),
  cubePosition: 0,
  setCubePosition: (position: number) =>
    set(() => ({ cubePosition: position })),
  facePosition: 0,
  setFacePosition: (position: number) =>
    set(() => ({ facePosition: position })),
  isOverlayVisible: false,
  setOverlayVisibility: (isVisible: boolean) =>
    set(() => ({ isOverlayVisible: isVisible })),
  isMobile: window.innerWidth <= 1024,
  setIsMobile: (isMobile: boolean) => set(() => ({ isMobile })),
}));

export default useStore;
