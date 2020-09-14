import User from "../router/User";

const API_URL = process.env.REACT_APP_API_HOST + process.env.REACT_APP_API_PORT;

/** 計画のサマリを取得する */
export async function getPlanSummary() {
  const url = new URL("http://" + API_URL + "/plan/summary");

  const params = new URLSearchParams();
  const userId = User.get("userId");
  params.append("userId", userId);
  url.search = params;

  // サーバへのGETリクエスト
  const res = await fetch(url, { mode: "cors" });
  // jsonに変換
  const json = await res.json();
  // エラー発生時に例外をスロー
  if (!res.ok) throw new Error(json.message);

  return json;
}

/** 計画に登録されたアイテムを取得する */
export async function getPlans(planDate) {
  const url = new URL("http://" + API_URL + "/plan");

  const params = new URLSearchParams();
  const userId = User.get("userId");
  params.append("userId", userId);
  params.append("planDate", planDate);
  url.search = params;

  // サーバへのGETリクエスト
  const res = await fetch(url, { mode: "cors" });
  // jsonに変換
  const json = await res.json();
  // エラー発生時に例外をスロー
  if (!res.ok) throw new Error(json.message);

  return json;
}

/** アイテムの計画状態を変更する */
export async function updateRegistPlan(item, planDate) {
  const url = new URL("http://" + API_URL + "/plan/regist");

  const reqItem = Object.assign({}, item);
  if (!reqItem.planDate) {
    reqItem.planDate = planDate;
  }

  // サーバへのポストリクエスト
  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(reqItem),
  });

  // JSONに変換
  const json = await res.json();

  // エラーの場合例外をスロー
  if (!res.ok) throw new Error(json.message);

  return json;
}
