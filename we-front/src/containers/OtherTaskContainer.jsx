import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectItem, getTaskItems } from "../modules/ItemModule";
import TaskArea from "../components/home/TaskArea";

/**
 * お酒情報を表示する
 */
export default function OtherTaskContainer() {
  const dispatch = useDispatch();
  const category = 0;
  const { other } = useSelector(selectItem);

  useEffect(() => {
    dispatch(getTaskItems(category));
  }, [dispatch]);

  return (
    <TaskArea
      isLoading={other.isLoading}
      error={other.error}
      items={other.items}
      title={"他にやりたいこと！"}
      category={category}
    />
  );
}
