import { create } from "zustand";

const useStore = create((set) => ({
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
  isMobile: false,
  setIsMobile: (isMobile: boolean) =>
    set(() => {
      isMobile;
    }),
}));

export default useStore;
