import React, { useEffect } from "react";
import PlanArea from "../components/home/PlanArea.jsx";
import { useSelector, useDispatch } from "react-redux";
import { selectItem, getSummary } from "../modules/ItemModule";

/**
 * 週末の計画サマリに関するロジック
 */
export default function PlanContainer() {
  const dispatch = useDispatch();
  const { planSummary, plan } = useSelector(selectItem);

  useEffect(() => {
    dispatch(getSummary());
  }, [dispatch]);

  return <PlanArea planSummary={planSummary} plan={plan} />;
}
