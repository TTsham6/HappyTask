import React, { useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Header from "./Header";
import PlanContainer from "../../containers/PlanContainer";
import AlcoholContainer from "../../containers/AlcoholContainer";
import MovieContainer from "../../containers/MovieContainer";
import BookContainer from "../../containers/BookContainer";
import VideoContainer from "../../containers/VideoContainer";
import MealContainer from "../../containers/MealContainer";
import OtherTaskContainer from "../../containers/OtherTaskContainer";
import User from "../../router/User";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    hieght: "100vh",
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
  containerArea: {
    margin: "30px",
    padding: "0px 10px",
  },
  box: {
    padding: "0px 10px",
    border: 1,
    borderRadius: 3,
  },
}));

/**
 * 画面構成コンポーネント
 */
export default function Layout() {
  const classes = useStyles();
  const [login, changeLogin] = useState(true);

  const handleLogout = () => {
    User.logout();
    changeLogin(false);
  };

  if (login) {
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Header handleLogout={handleLogout} />
            </Grid>
            <Container maxWidth="lg" className={classes.container}>
              {/* 週末の計画エリア */}
              <Grid item xs={12} className={classes.containerArea}>
                <PlanContainer />
              </Grid>
              {/* お酒予定エリア */}
              <Grid item xs={12} className={classes.containerArea}>
                <AlcoholContainer />
              </Grid>
              {/* 食事予定エリア */}
              <Grid item xs={12} className={classes.containerArea}>
                <MealContainer />
              </Grid>
              {/* 映画予定エリア */}
              <Grid item xs={12} className={classes.containerArea}>
                <MovieContainer />
              </Grid>
              {/* 書籍予定エリア */}
              <Grid item xs={12} className={classes.containerArea}>
                <BookContainer />
              </Grid>
              {/* 動画予定エリア */}
              <Grid item xs={12} className={classes.containerArea}>
                <VideoContainer />
              </Grid>
              {/* その他予定エリア */}
              <Grid item xs={12} className={classes.containerArea}>
                <OtherTaskContainer />
              </Grid>
            </Container>
          </Grid>
        </main>
      </div>
    );
  } else {
    return <Redirect to={"/login"} />;
  }
}
