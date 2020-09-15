import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Grid, makeStyles } from "@material-ui/core";
import Calendar from "react-calendar";
import { getPlanItems } from "../../modules/ItemModule";
import PlanListModal from "../modal/PlanListModal";
import { convertToPlaneDate } from "../../util/ConvertUtil";

const useStyles = makeStyles({
  areaBox: {
    padding: "0px 10px",
    border: "medium solid #808080",
    borderRadius: 3,
    height: "100%",
    backgroundColor: "white",
  },
  container: {
    paddingBottom: 30,
  },
  titleBox: {
    display: "flex",
    justifyContent: "space-between",
    color: "black",
    margin: 3,
    textAlign: "center",
    fontSize: "30px",
  },
  button: {
    textAlign: "center",
    fontSize: "8px",
    margin: "10px",
  },
  calendar: {
    padding: "20px",
  },
});

/**
 * 計画情報を表示する
 */
export default function PlanArea(props) {
  const { planSummary, plan } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const content = planSummary.content;
  const error = planSummary.error;
  const isLoading = planSummary.isLoading;

  /** モーダルウインドウを表示する */
  const openModal = (value, event) => {
    // Date型日付を文字列に変換
    const planDate = convertToPlaneDate(value);

    // モーダル画面をオープン
    if (content[planDate]) {
      setSelectedDate(planDate);
      // 計画リストを取得
      dispatch(getPlanItems(planDate));
      setIsOpen(true);
    }
  };

  /** カレンダー表示用の日付に変換する */
  const getFormatDate = (date) => {
    return `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${(
      "0" + date.getDate()
    ).slice(-2)}`;
  };

  /** 日付ごとの内容を表示する */
  const getTileContent = ({ date, view }) => {
    if (view !== "month") {
      return null;
    }
    const day = getFormatDate(date);
    // コンテンツがある日付のみ表示する
    return (
      <p>
        <br />
        {content && content[day] && content[day].count
          ? content[day].count + "件の予定"
          : " "}
      </p>
    );
  };

  /** モーダルウインドウを閉じる */
  const closeModal = () => {
    setIsOpen(false);
  };

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
              <div>楽しい予定！</div>
              <div></div>
            </Box>
          </Grid>
          <Grid container className={classes.calendar} alignItems="center">
            <Grid item xs={12}>
              {/* 計画カレンダー */}
              <Calendar
                locale="ja-JP"
                onClickDay={openModal}
                tileContent={getTileContent}
              />
              {/* 計画表示モーダル画面 */}
              <PlanListModal
                planDate={selectedDate}
                plan={plan}
                isOpen={isOpen}
                closeModal={closeModal}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
