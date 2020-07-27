export const container = {
  hidden: { opacity: 1, scale: 0 },
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
export const containerCreateProject = {
  hidden: { y: "-100vh" },
  visible: {
    y: 0,
    transition: {
      type: "tween",
    },
  },
};
