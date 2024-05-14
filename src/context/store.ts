import { create } from "zustand";

const useStore = create((set) => ({
  animationOn: false,
  setAnimation: (isTrue: boolean) => set(() => ({ animationOn: isTrue })),
}));

export default useStore;
