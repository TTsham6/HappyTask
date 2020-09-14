import React, { useState, Fragment } from "react";
import Modal from "react-modal";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateTaskRegist } from "../../modules/ItemModule";
import { convertToPlaneDate } from "../../util/Util";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";

const useStyles = makeStyles({
  datePicker: {
    margin: "20px",
    border: "medium solid #808080",
  },
  button: {
    textAlign: "center",
    fontSize: "8px",
    margin: "10px",
  },
});

/** モーダル画面のスタイル */
const customStyles = {
  content: {
    width: "400px",
    height: "400px",
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
 * 計画登録モーダル画面
 */
export default function PlanRegistModal(props) {
  const { item, isOpen, closeModal } = props;
  const [planDate, setPlanDate] = useState(new Date());
  const dispatch = useDispatch();
  const classes = useStyles();

  registerLocale("ja", ja);

  /** フォームの入力を受けてplanDateを更新する */
  function changeSelectedDate(date) {
    // planDateを更新
    setPlanDate(date);
  }

  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        style={customStyles}
        contentLabel="RegistPlanModal"
      >
        <Typography variant="h5" conponent="h2">
          予定に追加する
        </Typography>
        <div>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            locale="ja"
            selected={planDate}
            onChange={changeSelectedDate}
            className={classes.datePicker}
          />
        </div>
        <div>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() =>
              dispatch(updateTaskRegist(item, convertToPlaneDate(planDate)))
            }
          >
            登録する
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={closeModal}
          >
            閉じる
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
}
