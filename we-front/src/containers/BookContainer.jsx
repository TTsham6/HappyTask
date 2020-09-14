import React, { useEffect } from "react";
import TaskArea from "../components/home/TaskArea";
import { useSelector, useDispatch } from "react-redux";
import { selectItem, getTaskItems } from "../modules/ItemModule";

/**
 * お酒情報を表示する
 */
export default function BookContainer() {
  const dispatch = useDispatch();
  const category = 4;
  const { book } = useSelector(selectItem);

  useEffect(() => {
    dispatch(getTaskItems(category));
  }, [dispatch]);

  return (
    <TaskArea
      isLoading={book.isLoading}
      error={book.error}
      items={book.items}
      title={"読みたい本！"}
      category={category}
    />
  );
}
