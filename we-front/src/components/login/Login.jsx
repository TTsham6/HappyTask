import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import User from "../../router/User";
import { Redirect } from "react-router-dom";

/**
 * ログイン画面スタイル
 */
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/**
 * ログイン画面描画コンポーネント
 */
export default function Login(props) {
  const { sendRequest, changeType } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  if (User.isLoggedIn()) {
    // ログイン済みの場合;
    return <Redirect to={"/"} />;
  } else {
    return (
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン画面
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              required
              margin="normal"
              fullWidth
              id="userName"
              label="ユーザー名"
              name="userName"
              autoComplete="userName"
              autoFocus
              onChange={(event) => setUserName(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              margin="normal"
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => sendRequest(userName, password)}
            >
              ログイン
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => changeType("regist")}
            >
              新規登録
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}
