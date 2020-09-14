import React, { Fragment } from "react";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateTaskRegist, deleteTaskItem } from "../../modules/ItemModule";
import PlanRegistModal from "../modal/PlanRegistModal";
import TaskUpdateModal from "../modal/TaskUpdateModal";
import { useState } from "react";
import categoryMap from "../../const/CategoryConst";

const useStyles = makeStyles({
  card: {
    height: 260,
    maxWidth: 240,
    padding: 5,
    margin: 10,
  },
  content: {
    width: "90%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  button: {
    fontSize: "12px",
    textAlign: "center",
    textOverflow: "ellipsis",
    width: "60%",
    margin: "5px",
  },
  other: {
    backgroundColor: "#CCCCCC",
  },
  alcohol: {
    backgroundColor: "#FFFF66",
  },
  meal: {
    backgroundColor: "#FF99CC",
  },
  movie: {
    backgroundColor: "#00CCFF",
  },
  book: {
    backgroundColor: "#CCFF99",
  },
  video: {
    backgroundColor: "#FFCC66",
  },
});

/**
 * 予定アイテム表示
 */
export default function Item(props) {
  const { item } = props;
  const [isTaskUpdOpen, setTaskUpdOpen] = useState(false);
  const [isPlanRegistOpen, setPlanRegistOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const cardTypeClass = classes[categoryMap[item.category]];

  // 日付をハイフンつきの文字列に変換する
  const convertToHyphenDate = (planDate) => {
    if (!planDate) {
      return "";
    }
    const year = planDate.slice(0, 4);
    const month = planDate.slice(4, 6);
    const date = planDate.slice(-2);
    return [year, month, date].join("-");
  };

  /** 計画登録モーダルウインドウを表示する */
  function openTaskUpdModal() {
    setTaskUpdOpen(true);
  }

  /** 計画登録モーダルウインドウを閉じる */
  function closeTaskUpdModal() {
    setTaskUpdOpen(false);
  }

  /** 計画登録モーダルウインドウを表示する */
  function openPlnaRegistModal() {
    setPlanRegistOpen(true);
  }

  /** 計画登録モーダルウインドウを閉じる */
  function closePlnaRegistModal() {
    setPlanRegistOpen(false);
  }

  return (
    <Card className={classes.card + " " + cardTypeClass}>
      <CardContent className={classes.content}>
        <Typography variant="h6" component="h2">
          {item.taskName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          URL:{item.taskUrl ? item.taskUrl : " "}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          計画日：
          {convertToHyphenDate(item.planDate)
            ? convertToHyphenDate(item.planDate)
            : " "}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          メモ：{item.taskMemo ? item.taskMemo : " "}
        </Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={openTaskUpdModal}
          >
            タスク編集
          </Button>
          <TaskUpdateModal
            item={item}
            isOpen={isTaskUpdOpen}
            closeModal={closeTaskUpdModal}
          />
        </div>

        {item.planId ? (
          // 計画登録済みの場合
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => dispatch(updateTaskRegist(item))}
          >
            予定から外す
          </Button>
        ) : (
          // 計画未登録の場合
          <Fragment>
            <div>
              <Button
                variant="contained"
                fullWidth
                className={classes.button}
                color="primary"
                onClick={() => dispatch(deleteTaskItem(item))}
              >
                タスク削除
              </Button>
            </div>

            <Button
              variant="contained"
              color="primary"
              onClick={openPlnaRegistModal}
              className={classes.button}
            >
              予定に追加
            </Button>
            {/* 計画登録モーダル画面 */}
            <PlanRegistModal
              item={item}
              isOpen={isPlanRegistOpen}
              closeModal={closePlnaRegistModal}
            />
          </Fragment>
        )}
      </CardContent>
    </Card>
  );
}
