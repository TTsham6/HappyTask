import React, { useState, Fragment } from "react";
import Modal from "react-modal";
import { Button, Typography, TextField, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addTaskItem } from "../../modules/ItemModule";

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
 * タスク作成モーダルウインドウ
 */
export default function TaskCreateModal(props) {
  const { isOpen, closeModal, category } = props;
  const classes = useStyles();
  const [item, setItem] = useState({
    taskName: "",
    taskMemo: "",
    taskUrl: "",
    category: category,
  });

  const dispatch = useDispatch();

  /** フォームの入力を受けてitemを更新する */
  const inputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    // itemのプロパティを更新
    item[key] = value;
    // オブジェクトをコピーする
    let newItem = Object.assign({}, item);
    // itemを更新
    setItem(newItem);
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
          タスクを作成する
        </Typography>
        <div>
          <TextField
            label="タスク名"
            name="taskName"
            id="new-task-name"
            onChange={inputChange}
          ></TextField>
        </div>
        <div>
          <TextField
            label="メモ"
            name="taskMemo"
            id="task-memo"
            onChange={inputChange}
          ></TextField>
        </div>
        <div>
          <TextField
            label="URL"
            name="taskUrl"
            id="task-url"
            onChange={inputChange}
          ></TextField>
        </div>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => {
            dispatch(addTaskItem(item));
            closeModal();
          }}
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
      </Modal>
    </Fragment>
  );
}
