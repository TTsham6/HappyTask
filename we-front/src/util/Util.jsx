/** Date型をハイフン無しの日付文字列に変換する */
export const convertToPlaneDate = (date) => {
  return (
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2)
  );
};

/** 初期表示用の日付を取得する */
export const calcInitDate = () => {
  const today = new Date();
  const weekendDays = [0, 5, 6];
  if (weekendDays.includes(today.getDay())) {
    // 今日が金、土、日の場合、そのままリターン
    return today;
  } else {
    // 週末以外の曜日の場合、金曜日の日付に変換してリターン
    const thisFriday = today.getDate() - today.getDay() + 5;
    return new Date(today.getFullYear(), today.getMonth(), thisFriday);
  }
};

/** サマリリストをオブジェクトに変換する */
export const convertSummaryListToObject = (summaryList) => {
  const summary = {};
  summaryList.forEach((plan) => {
    summary[plan.planDate] = { count: plan.count };
  });
  return summary;
};
