import React, { useState } from "react";
import User from "../router/User";
import Login from "../components/login/Login";
import UserRegistration from "../components/login/UserRegistration";

/**
 * ログイン画面処理コンテナ
 */
export default function LoginContainer() {
  const [error, setError] = useState("");
  const [isLoading, changeLoading] = useState(0);
  const [type, changeType] = useState("login");

  /** ユーザー認証を行う */
  const certifyUser = (userName, password) => {
    const API_URL =
      process.env.REACT_APP_API_HOST + process.env.REACT_APP_API_PORT;
    const url = new URL("http://" + API_URL + "/user/auth");

    changeLoading(1); // ローディング中

    // サーバへのポストリクエスト
    fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // 通信成功時
          changeLoading(2);
          // ブラウザのログイン情報を「ログイン済み」に変更
          User.login();
          User.set("userId", result.userId);
          // コンポーネントの情報を変更
        },
        (error) => {
          setError(error);
          changeLoading(2);
          changeType("regist");
        }
      );
  };

  /** ユーザーの新規登録を行う */
  const registerUser = (userName, password) => {
    const API_URL =
      process.env.REACT_APP_API_HOST + process.env.REACT_APP_API_PORT;
    const url = new URL("http://" + API_URL + "/user/regist");
    changeLoading(1); // ローディング中
    // サーバへのポストリクエスト
    fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // 通信成功時
          changeLoading(2);
          // ブラウザのログイン情報を「ログイン済み」に変更
          User.login();
          User.set("userId", result.userId);
          // コンポーネントの情報を変更
          changeType("login");
        },
        (error) => {
          setError(error);
          changeLoading(2);
        }
      );
  };

  if (type === "login") {
    // ログイン画面に遷移
    return (
      <Login
        error={error}
        sendRequest={certifyUser}
        isLoading={isLoading}
        changeType={changeType}
      />
    );
  } else if (type === "regist") {
    // 新規登録画面に遷移
    return (
      <UserRegistration
        sendRequest={registerUser}
        error={error}
        isLoading={isLoading}
        changeType={changeType}
      />
    );
  }
}
