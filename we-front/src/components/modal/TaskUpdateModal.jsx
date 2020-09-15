import React, { Fragment, useState } from "react";
import Modal from "react-modal";
import { Button, Typography, TextField, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateTaskItem } from "../../modules/ItemModule";

Modal.setAppElement("#root");

const useStyles = makeStyles({
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
 * タスク更新モーダルウインドウ
 */
export default function TaskUpdateModal(props) {
  const { item, isOpen, closeModal } = props;
  const classes = useStyles();
  const [updItem, setUpdItem] = useState(Object.assign({}, item));

  const dispatch = useDispatch();

  /** フォームの入力を受けてitemを更新する */
  const inputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    // itemのプロパティを更新
    updItem[key] = value;
    // オブジェクトをコピーする
    let newItem = Object.assign({}, updItem);
    // itemを更新
    setUpdItem(newItem);
  };

  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        style={customStyles}
        contentLabel="CreateItemModal"
        ariaHideApp={false}
      >
        <Typography variant="h5" conponent="h2">
          タスクを更新する
        </Typography>
        <div>
          <TextField
            label="タスク名"
            name="taskName"
            id="new-task-name"
            value={updItem.taskName}
            onChange={inputChange}
          ></TextField>
        </div>
        <div>
          <TextField
            label="メモ"
            name="taskMemo"
            id="task-memo"
            value={updItem.taskMemo}
            onChange={inputChange}
          ></TextField>
        </div>
        <div>
          <TextField
            label="URL"
            name="taskUrl"
            id="task-url"
            value={updItem.taskUrl}
            onChange={inputChange}
          ></TextField>
        </div>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => {
            dispatch(updateTaskItem(updItem));
            closeModal();
          }}
        >
          更新する
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={closeModal}
        >
          閉じる
        </Button>
      </Modal>
    </Fragment>
  );
}
