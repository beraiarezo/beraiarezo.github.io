import { FC } from "react";
import { motion } from "framer-motion";

type KeyboardProps = {
  keyStatus: string;
};

export const Keyboard: FC<KeyboardProps> = ({ keyStatus }) => {
  return (
    <motion.div
      className="keyboard flex justify-center fixed bottom-10 right-12"
      initial={{ scale: 1 }}
      animate={{ scale: !keyStatus ? [1, 1.1, 1] : [1, 1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="key-row flex flex-col">
        <div className="flex justify-center">
          <motion.div
            className="key relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: keyStatus === "KeyW" ? 0.9 : 1 }}
          >
            <div className="text-lg absolute left-2 top-2 font-extrabold">
              W
            </div>
          </motion.div>
        </div>
        <div className="flex justify-between">
          <motion.div
            className="key relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: keyStatus === "KeyA" ? 0.9 : 1 }}
          >
            <div className="text-lg absolute left-2 top-2 font-extrabold">
              A
            </div>
          </motion.div>
          <motion.div
            className="key relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: keyStatus === "KeyS" ? 0.9 : 1 }}
          >
            <div className="text-lg absolute left-2 top-2 font-extrabold">
              S
            </div>
          </motion.div>
          <motion.div
            className="key relative"
            whileHover={{ scale: 1.1 }} // Scale up on hover
            whileTap={{ scale: 0.9 }} // Scale down on click
            animate={{ scale: keyStatus === "KeyD" ? 0.9 : 1 }}
          >
            <div className="text-lg absolute left-2 top-2 font-extrabold">
              D
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
