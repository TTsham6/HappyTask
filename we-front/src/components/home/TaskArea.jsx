import React, { Fragment, useState } from "react";
import { makeStyles, Grid, Box, Button } from "@material-ui/core";

import TaskCreateModal from "../modal/TaskCreateModal";
import Item from "../home/Item";

const useStyles = makeStyles({
  areaBox: {
    padding: "0px 10px",
    border: "medium solid #808080",
    borderRadius: 3,
    backgroundColor: "white",
  },
  container: {
    paddingBottom: 30,
  },
  button: {
    textAlign: "center",
  },
  titleBox: {
    display: "flex",
    justifyContent: "space-between",
    color: "black",
    margin: 3,
    fontSize: "30px",
  },
  cardList: {
    padding: "15px",
    margin: "10px",
  },
});

/**
 * タスクを表示するコンポーネント
 */
export default function TaskArea(props) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const { isLoading, error, items, title, category } = props;

  /** モーダルウインドウを表示する */
  function openModal() {
    setIsOpen(true);
  }

  /** モーダルウインドウを閉じる */
  function closeModal() {
    setIsOpen(false);
  }

  if (error) {
    return (
      <Box className={classes.areaBox}>
        <div>Error: {error.message}</div>
      </Box>
    );
  } else if (isLoading) {
    return (
      <Box className={classes.areaBox}>
        <div>Now Loading...</div>
      </Box>
    );
  } else {
    return (
      <Box className={classes.areaBox}>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12}>
            <Box className={classes.titleBox}>
              <div></div>
              <div>{title}</div>
              <div>
                <Fragment>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={openModal}
                    className={classes.button}
                  >
                    タスク新規作成
                  </Button>
                  {/* アイテム新規作成登録モーダル画面 */}
                  <TaskCreateModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    ariaHideApp={false}
                    category={category}
                  />
                </Fragment>
              </div>
            </Box>
          </Grid>
          {/* アイテムリスト */}
          <Grid container className={classes.cardList} alignItems="center">
            {items.map((item) => (
              <Grid key={"item-" + item.taskId} item xs={3} xm={6} md={3}>
                <Item item={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    );
  }
}
