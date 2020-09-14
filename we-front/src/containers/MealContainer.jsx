import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectItem, getTaskItems } from "../modules/ItemModule";
import TaskArea from "../components/home/TaskArea";

/**
 * お酒情報を表示する
 */
export default function MealContainer() {
  const dispatch = useDispatch();
  const category = 2;
  const { meal } = useSelector(selectItem);

  useEffect(() => {
    dispatch(getTaskItems(category));
  }, [dispatch]);

  return (
    <TaskArea
      isLoading={meal.isLoading}
      error={meal.error}
      items={meal.items}
      title={"食べたいご飯！"}
      category={category}
    />
  );
}
