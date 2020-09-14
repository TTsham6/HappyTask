import React from "react";
import {
  makeStyles,
  AppBar,
  Button,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "white",
    color: "black",
    positon: "fixed",
    marginBottom: "10px",
  },
  title: {
    flexGrow: 1,
    display: "none",
    fontSize: "70px",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

/**
 * ヘッダー
 */
export default function Header(props) {
  const classes = useStyles();
  const { handleLogout } = props;

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography className={classes.title} variant="h1" noWrap>
          HAPPY　TASK
        </Typography>
        <Button color="inherit" onClick={() => handleLogout()}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
