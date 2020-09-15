/** Date型をハイフン無しの日付文字列に変換する */
export const convertToPlaneDate = (date) => {
  return (
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2)
  );
};

/** 日付文字列をハイフンつきに変換する */
export const convertToHyphenDate = (planDate) => {
  if (!planDate) {
    return "";
  }
  const year = planDate.slice(0, 4);
  const month = planDate.slice(4, 6);
  const date = planDate.slice(-2);
  return [year, month, date].join("-");
};

/** サマリリストをオブジェクトに変換する */
export const convertSummaryListToObject = (summaryList) => {
  const summary = {};
  summaryList.forEach((plan) => {
    summary[plan.planDate] = { count: plan.count };
  });
  return summary;
};
