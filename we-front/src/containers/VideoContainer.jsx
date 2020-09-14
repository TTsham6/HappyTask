import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectItem, getTaskItems } from "../modules/ItemModule";
import TaskArea from "../components/home/TaskArea";

/**
 * 動画を表示する
 */
export default function VideoContainer() {
  const dispatch = useDispatch();
  const category = 5;
  const { video } = useSelector(selectItem);

  useEffect(() => {
    dispatch(getTaskItems(category));
  }, [dispatch]);

  return (
    <TaskArea
      isLoading={video.isLoading}
      error={video.error}
      items={video.items}
      title={"見たいTV/YouTube！"}
      category={category}
    />
  );
}
