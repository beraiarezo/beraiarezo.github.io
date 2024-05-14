import { useEffect, useRef } from "react";

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

export const Cursor = () => {
  const cursorOutline = useRef<HTMLDivElement>(null);

  const animate = () => {
    console.log("animaa");
    let distX = mouseX - outlineX - 10;
    let distY = mouseY - outlineY - 10;

    if (cursorOutline.current) {
      cursorOutline.current.style.left = `${distX}px`;
      cursorOutline.current.style.top = `${distY}px`;
    }
    requestAnimationFrame(animate);
  };

  const mouseMove = (event: MouseEvent) => {
    mouseX = event.pageX;
    mouseY = event.pageY;
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => mouseMove(event);

    document.addEventListener("mousemove", handleMouseMove);

    // const animationEvent = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      // cancelAnimationFrame(animationEvent);
    };
  }, []);

  return (
    <>
      <div
        className={
          "z-50 fixed -translate-x-1/2 -translate-y-1/2 rounded-full  bg-transparent border-2 border-indigo-900 w-5 h-5 bg-indigo-500"
        }
        ref={cursorOutline}
      ></div>
    </>
  );
};
