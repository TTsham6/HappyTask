import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectItem, getTaskItems } from "../modules/ItemModule";
import TaskArea from "../components/home/TaskArea";

/**
 * お酒情報を表示する
 */
export default function AlcoholContainer() {
  const dispatch = useDispatch();
  const { alcohol } = useSelector(selectItem);
  const category = 1;

  useEffect(() => {
    dispatch(getTaskItems(category));
  }, [dispatch]);

  return (
    <TaskArea
      isLoading={alcohol.isLoading}
      error={alcohol.error}
      items={alcohol.items}
      title={"飲みたいお酒！"}
      category={category}
    />
  );
}
