import React, { Fragment } from "react";
import Modal from "react-modal";
import { Box, Button, Grid, makeStyles } from "@material-ui/core";
import Item from "../home/Item";
import { convertToHyphenDate } from "../../util/ConvertUtil";

Modal.setAppElement("#root");

const useStyles = makeStyles({
  button: {
    textAlign: "center",
    fontSize: "8px",
    margin: "10px",
  },
  container: {
    paddingBottom: 30,
  },
  titleBox: {
    display: "flex",
    justifyContent: "space-between",
    color: "black",
    margin: 3,
    fontSize: "30px",
  },
});

/** モーダル画面のスタイル */
const customStyles = {
  content: {
    width: "1000px",
    height: "500px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
};

/**
 * 計画リスト表示コンポーネント
 */
export default function PlanListModal(props) {
  const { planDate, plan, isOpen, closeModal } = props;
  const classes = useStyles();

  /** 計画情報のローディング状況を判定して、レンダリングする */
  const ModalContent = () => {
    if (plan.error) {
      // エラー時
      return (
        <Grid container spacing={3} className={classes.container}>
          <div>Error: {plan.error.message}</div>
        </Grid>
      );
    } else if (plan.isLoading) {
      // ローディング中
      return (
        <Grid container spacing={3} className={classes.container}>
          <div>Now Loading...</div>
        </Grid>
      );
    } else {
      // 正常時
      return (
        <Fragment>
          <Grid container alignItems="center">
            {plan.items.map((item) => (
              <Grid key={"plan-" + item.taskId} item xs={3} xm={6} md={3}>
                <Item item={item} />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            className={classes.button}
            onClick={closeModal}
          >
            閉じる
          </Button>
        </Fragment>
      );
    }
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel="PlanListModal">
      <Box className={classes.areaBox}>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12}>
            <Box className={classes.titleBox}>
              <div></div>
              <div>{convertToHyphenDate(planDate)}の予定</div>
              <div></div>
            </Box>
          </Grid>
        </Grid>
        {/* ModalContent関数で定義 */}
        <ModalContent />
      </Box>
    </Modal>
  );
}
