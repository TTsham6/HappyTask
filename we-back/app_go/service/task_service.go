package service

import (
	"fmt"
	"strconv"
	"time"

	"app_go/db"
	"app_go/entity"
	"app_go/json"
	"app_go/logic"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

// TaskService タスクに関するサービス
type TaskService struct{}

// GetTasksByUserID ユーザーIDに合致したタスクを取得する
func (s TaskService) GetTasksByUserID(userID string, category string) ([]json.Item, error) {
	db := db.GetDB()
	var items []json.Item

	// SELECT
	if err := db.Table("tasks").
		Select("tasks.*,plans.plan_date").
		Joins("LEFT JOIN plans ON tasks.plan_id = plans.plan_id").
		Where("tasks.user_id = ? AND tasks.category=?", userID, category).
		Scan(&items).Error; err != nil {
		return nil, err
	}

	return items, nil
}

// CreateTask タスクをDBに登録する
func (s TaskService) CreateTask(userID string, c *gin.Context) (json.Item, error) {
	db := db.GetDB()
	var item json.Item
	var task entity.Task
	var newTaskID string

	// タスクIDが最新のレコードを取得
	err := db.Where("user_id = ?", userID).Order("task_id desc").First(&task).Error

	if err != nil && gorm.IsRecordNotFoundError(err) {
		// ユーザーIDが見つからなかった場合
		newTaskID = "0000"
	} else if err != nil {
		// 上記以外のエラーの場合
		return item, err
	} else {
		// 正常時
		// 最新のIDを採番
		IDNum, _ := strconv.Atoi(task.TaskID)
		newTaskID = fmt.Sprintf("%04d", IDNum+1)
	}

	// ContextからItemを読み込む
	if err := c.BindJSON(&item); err != nil {
		return item, err
	}

	// Item ⇒ Task変換
	task = logic.ConvertItemToTask(item)
	task.TaskID = newTaskID
	task.RegisteredDate = time.Now()
	task.UpdateDate = time.Now()

	// INSSERT
	if err := db.Create(&task).Error; err != nil {
		return item, err
	}

	item.TaskID = newTaskID

	return item, nil
}

// UpdateTask ユーザーID、タスクIDに合致したタスクを更新する
func (s TaskService) UpdateTask(userID string, taskID string, c *gin.Context) (json.Item, error) {
	db := db.GetDB()
	var task entity.Task
	var item json.Item

	// SELECT ユーザーID、タスクIDに合致するレコードを取得
	if err := db.Where("user_id = ? AND task_id=?", userID, taskID).
		First(&task).Error; err != nil {
		return item, err
	}

	// ContextからItemを読み込む
	if err := c.BindJSON(&item); err != nil {
		return item, err
	}

	// UPDATE タスクを更新する
	if err := db.Model(&task).
		Where("user_id=? AND task_id=?", userID, taskID).
		Updates(map[string]interface{}{
			"taskName":    item.TaskName,
			"taskUrl":     item.TaskURL,
			"taskMemo":    item.TaskMemo,
			"update_date": time.Now()}).
		Error; err != nil {
		return item, err
	}

	return item, nil
}

// DeleteTask ユーザーID、タスクIDに合致したタスクを削除する
func (s TaskService) DeleteTask(userID string, taskID string) error {
	db := db.GetDB()
	var task entity.Task

	// DELETE
	if err := db.Where("user_id =? AND task_id=?", userID, taskID).
		Delete(&task).Error; err != nil {
		return err
	}

	return nil
}
