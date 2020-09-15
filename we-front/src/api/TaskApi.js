import User from "../router/User";

const API_URL = process.env.REACT_APP_API_HOST + process.env.REACT_APP_API_PORT;

/** アイテムを取得する */
export async function getTasks(category) {
  const url = new URL("http://" + API_URL + "/task");

  const params = new URLSearchParams();
  const userId = User.get("userId");
  params.append("userId", userId);
  params.append("category", category);
  url.search = params;

  // サーバへGETリクエスト
  const res = await fetch(url, { mode: "cors" });

  // jsonに変換
  const json = await res.json();

  // エラー発生時に例外をスロー
  if (!res.ok) throw new Error(json.message);

  return json;
}

/** アイテムを登録する */
export async function addTask(item) {
  const url = new URL("http://" + API_URL + "/task");
  const reqItem = Object.assign({}, item);
  const userId = User.get("userId");
  reqItem.userId = userId;

  const params = new URLSearchParams();
  params.append("userId", userId);
  url.search = params;

  // サーバへリクエスト
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

/** タスクを更新する */
export async function updateTask(item) {
  const url = new URL("http://" + API_URL + "/task");
  const params = new URLSearchParams();
  const userId = User.get("userId");
  params.append("userId", userId);
  params.append("taskId", item.taskId);
  url.search = params;

  // サーバへリクエスト
  const res = await fetch(url, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(item),
  });

  // エラーの場合例外をスロー
  if (!res.ok) throw new Error("delete failure");

  return item;
}

/** アイテムを削除する */
export async function deleteTask(item) {
  const url = new URL("http://" + API_URL + "/task");
  const params = new URLSearchParams();
  const userId = User.get("userId");
  params.append("userId", userId);
  params.append("taskId", item.taskId);
  url.search = params;

  // サーバへリクエスト
  const res = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    body: JSON.stringify(item),
  });

  // エラーの場合例外をスロー
  if (!res.ok) throw new Error("delete failure");

  return item;
}
