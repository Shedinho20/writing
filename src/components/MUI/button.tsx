// @ts-nocheck
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    background: (props) => (props.color === "primary" ? theme.palette.secondary.main : theme.palette.primary.main),
    display: "block",
    color: theme.palette.primary.contrastText,
    width: "180px",
    borderRadius: "5px",
    padding: "10px 45px",
    margin: "2rem 0 0 0",
    border: "none",
    fontWeight: "900",
    textTransform: "capitalize",
    cursor: "pointer",
    "&:hover": {
      background: (props) => (props.color === "primary" ? theme.palette.secondary.light : theme.palette.primary.light),
    },
  },
}));

interface MYBUTTON {
  name: string;
  color?: string;
  type: string;
}

function Mybutton(props: MYBUTTON) {
  const classes = useStyles(props);
  return (
    <Button type={props.type} className={classes.root}>
      {props.name}
    </Button>
  );
}

export default Mybutton;
