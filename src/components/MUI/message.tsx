//@ts-nocheck
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { containerMessage } from "../motion";
import { makeStyles } from "@material-ui/core";

export interface MesaageProps {
  message: string;
  color: string;
}
const useStyles = makeStyles((theme) => ({
  root: {
    background: (props) => (props.color === "primary" ? theme.palette.primary.main : theme.palette.secondary.main),
    display: "inline-block",
    padding: ".5em 2em",
    color: "white",
    position: "absolute",
    bottom: "30px",
    left: "67.5vw",
    fontSize: "0.7rem",
    fontWeight: "bold",
    zIndex: "2",
  },
}));
const Mesaage: React.SFC<MesaageProps> = (props) => {
  const { message } = props;
  const classes = useStyles(props);
  return (
    <div>
      <motion.p
        key={props.color}
        variants={containerMessage}
        exit={{ opacity: 0, transition: { delay: 5, duration: 5 } }}
        initial="hidden"
        animate="visible"
        className={classes.root}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default Mesaage;
