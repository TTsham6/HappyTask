import { createSlice } from "@reduxjs/toolkit";
import { getTasks, addTask, updateTask, deleteTask } from "../api/TaskApi";
import { getPlanSummary, getPlans, updateRegistPlan } from "../api/PlanApi";
import { convertSummaryListToObject } from "../util/Util";
import categoryMap from "../const/CategoryConst";

/**
 * サーバ側への操作を行うモジュール
 */
export const itemModule = createSlice({
  name: "item",
  // stateの初期状態
  initialState: {
    isLoading: false,
    error: null,
    planSummary: {
      isLoading: false,
      error: null,
      content: {},
    },
    plan: {
      isLoading: false,
      error: null,
      items: [],
    },
    alcohol: {
      isLoading: false,
      error: null,
      items: [],
    },
    meal: {
      isLoading: false,
      error: null,
      items: [],
    },
    movie: {
      isLoading: false,
      error: null,
      items: [],
    },
    book: {
      isLoading: false,
      error: null,
      items: [],
    },
    video: {
      isLoading: false,
      error: null,
      items: [],
    },
    other: {
      isLoading: false,
      error: null,
      items: [],
    },
  },
  // Actionを受けてstateを変更する
  // categoryで対象のstateを判定する
  reducers: {
    /** 通信開始時 */
    fetchStart(state, action) {
      const category = action.payload;
      state[categoryMap[category]].isLoading = true;
      state[categoryMap[category]].error = null;
    },
    /** 通信失敗時 */
    fetchFailure(state, action) {
      const category = action.payload.category;
      state[categoryMap[category]].isLoading = false;
      state[categoryMap[category]].error = action.payload.error;
    },
    /** 計画サマリ取得成功時 */
    getPlanSummarySuccess(state, action) {
      state.planSummary.isLoading = null;
      state.planSummary.error = null;
      state.planSummary.content = convertSummaryListToObject(action.payload);
    },
    /** 計画情報取得成功時 */
    getPlansSuccess(state, action) {
      state.plan.isLoading = false;
      state.plan.error = null;
      state.plan.items = action.payload;
    },
    /** タスクリスト取得成功時 */
    getItemsSuccess(state, action) {
      const category = action.payload.category;
      state[categoryMap[category]].isLoading = false;
      state[categoryMap[category]].error = null;
      state[categoryMap[category]].items = action.payload.result;
    },
    /** タスク追加成功時 */
    addItemSuccess(state, action) {
      const category = action.payload.category;
      const item = action.payload.result;
      state[categoryMap[category]].isLoading = false;
      state[categoryMap[category]].error = null;
      state[categoryMap[category]].items.push(item);
    },
    /** タスク更新成功時 */
    updateItemSuccess(state, action) {
      // アイテムの登録状況を更新
      const category = action.payload.category;
      state[categoryMap[category]].isLoading = false;
      state[categoryMap[category]].error = null;
      const newItem = action.payload.result;
      const items = state[categoryMap[category]].items;
      if (newItem) {
        state[categoryMap[category]].items = items.map((item) => {
          if (item.taskId === newItem.taskId) {
            // タスクIDが一致するアイテムを更新する
            return newItem;
          }
          return item;
        });
      }
    },

    /** タスク削除成功時 */
    deleteItemSuccess(state, action) {
      const category = action.payload.category;
      const delItem = action.payload.result;
      state[categoryMap[category]].isLoading = false;
      state[categoryMap[category]].error = null;

      state[categoryMap[category]].items = state[
        categoryMap[category]
      ].items.filter((item) => {
        // タスクIDが一致するアイテムを除外する
        return delItem.taskId !== item.taskId;
      });
    },
    /** 計画登録情報更新成功時 */
    updateRegistSuccess(state, action) {
      const category = action.payload.category;
      const newItem = action.payload.result.newItem;

      // 計画サマリ＋計画に登録したカテゴリーのオブジェクトに対して更新を行う
      state.planSummary.isLoading = false;
      state.planSummary.error = null;

      // 計画サマリを更新
      state.planSummary.content = convertSummaryListToObject(
        action.payload.result.summary
      );

      // 表示されている計画から外す
      state.plan.items = state.plan.items.filter((item) => {
        // タスクIDが一致するアイテムを除外する
        return newItem.taskId !== item.taskId;
      });

      // アイテムの登録状況を更新
      state[categoryMap[category]].isLoading = false;
      state[categoryMap[category]].error = null;
      const items = state[categoryMap[category]].items;
      if (newItem) {
        state[categoryMap[category]].items = items.map((item) => {
          if (item.taskId === newItem.taskId) {
            // タスクIDが一致するアイテムを更新する
            return newItem;
          }
          return item;
        });
      }
    },
  },
});

/** Actions */
export const {
  fetchStart,
  fetchFailure,
  getPlanSummarySuccess,
  getPlansSuccess,
  getItemsSuccess,
  addItemSuccess,
  updateItemSuccess,
  deleteItemSuccess,
  updateRegistSuccess,
} = itemModule.actions;

/** 計画サマリを取得する */
export const getSummary = () => async (dispatch) => {
  try {
    dispatch(fetchStart(200));
    // サマリ情報取得
    dispatch(getPlanSummarySuccess(await getPlanSummary()));
  } catch (error) {
    dispatch(fetchFailure({ category: 200, result: error.stack }));
  }
};

/**
 * 指定された日付の計画のリストを取得する
 */
export const getPlanItems = (planDate) => async (dispatch) => {
  try {
    dispatch(fetchStart(100));
    dispatch(getPlansSuccess(await getPlans(planDate)));
  } catch (error) {
    dispatch(fetchFailure({ category: 100, error: error.stack }));
  }
};

/**
 * タスクのリストを取得する
 */
export const getTaskItems = (category) => async (dispatch) => {
  try {
    dispatch(fetchStart(category));
    // アイテムを取得する
    dispatch(
      getItemsSuccess({ category: category, result: await getTasks(category) })
    );
    // dispatch(getItemsSuccess(await getItemsTest(category)));
  } catch (error) {
    dispatch(fetchFailure({ category: category, error: error.stack }));
  }
};

/**
 * タスクを新規登録する
 */
export const addTaskItem = (item) => async (dispatch) => {
  try {
    dispatch(fetchStart(item.category));
    dispatch(
      addItemSuccess({ category: item.category, result: await addTask(item) })
    );
  } catch (error) {
    dispatch(fetchFailure({ category: item.category, error: error.stack }));
  }
};

/** タスクの内容を更新する */
export const updateTaskItem = (item) => async (dispatch) => {
  try {
    dispatch(fetchStart(item.category));
    dispatch(
      updateItemSuccess({
        category: item.category,
        result: await updateTask(item),
      })
    );
  } catch (error) {
    dispatch(fetchFailure({ category: item.category, error: error.stack }));
  }
};

/**
 * タスクを削除する
 */
export const deleteTaskItem = (item) => async (dispatch) => {
  try {
    dispatch(fetchStart(item.category));
    dispatch(
      deleteItemSuccess({
        category: item.category,
        result: await deleteTask(item),
      })
    );
  } catch (error) {
    dispatch(fetchFailure({ category: item.category, error: error.stack }));
  }
};

/**
 * タスクの計画への登録状況を更新する
 */
export const updateTaskRegist = (item, planDate) => async (dispatch) => {
  try {
    dispatch(fetchStart(item.category));
    dispatch(
      updateRegistSuccess({
        category: item.category,
        result: await updateRegistPlan(item, planDate),
      })
    );
  } catch (error) {
    dispatch(fetchFailure({ category: item.category, error: error.stack }));
  }
};

/** Selectors */
export const selectItem = ({ item }) => item;

/** Reducer */
export default itemModule.reducer;

/**
 * テスト用
 * @param {*} item
 */
async function getItemsTest(arg) {
  const json = [
    {
      userId: "0001",
      taskId: "0045",
      planId: "000120201008",
      planDate: "20201008",
      taskName: "キリンビール",
      taskUrl: "hoge.com",
      taskMemo: "ビールうめえ",
      category: "1",
    },
    {
      userId: "0001",
      taskId: "0046",
      planId: "",
      planDate: "20201008",
      taskName: "アサヒビール",
      taskUrl: "hoge.com",
      taskMemo: "ビールうめえ",
      category: "1",
    },
    {
      userId: "0001",
      taskId: "0047",
      planId: "",
      planDate: "20201008",
      taskName: "CLASSIC",
      taskUrl: "hoge.com",
      taskMemo: "ビールうめえ",
      category: "1",
    },
    {
      userId: "0001",
      taskId: "0048",
      planId: "",
      planDate: "20201008",
      taskName: "スミノフ",
      taskUrl: "hoge.com",
      taskMemo: "ビールじゃねえ",
      category: "1",
    },
  ];
  return json;
}
