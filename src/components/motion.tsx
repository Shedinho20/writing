export const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 30,
    },
  },
};
export const containerMessage = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "tween",
      stiffness: 500,
    },
  },
};

export const containerCreateProject = {
  hidden: { y: "-100vh" },
  visible: {
    y: 0,
    transition: {
      type: "tween",
    },
  },
};
export const navmob = {
  hidden: { x: "-100vw" },
  visible: {
    x: 0,
    transition: {
      duration: 0.25,
      type: "tween",
    },
  },
};
