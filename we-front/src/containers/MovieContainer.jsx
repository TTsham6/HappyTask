import React, { useEffect } from "react";
import TaskArea from "../components/home/TaskArea";
import { useSelector, useDispatch } from "react-redux";
import { selectItem, getTaskItems } from "../modules/ItemModule";

/**
 * お酒情報を表示する
 */
export default function MovieContainer() {
  const dispatch = useDispatch();
  const category = 3;
  const { movie } = useSelector(selectItem);

  useEffect(() => {
    dispatch(getTaskItems(category));
  }, [dispatch]);

  return (
    <TaskArea
      isLoading={movie.isLoading}
      error={movie.error}
      items={movie.items}
      title={"見たい映画！"}
      category={category}
    />
  );
}
