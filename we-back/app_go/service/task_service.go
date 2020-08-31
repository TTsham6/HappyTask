package service

import (
	"app_go/db"
	"app_go/entity"

	"github.com/gin-gonic/gin"
)

// TaskService タスクに関するサービス
type TaskService struct{}

// Task タスクオブジェクト
type Task entity.Task

// GetTasksByUserID ユーザーIDに合致したタスクを取得する
func (s TaskService) GetTasksByUserID(userID string, taskType string) ([]Task, error) {
	db := db.GetDB()
	var tasks []Task

	// DB検索
	if err := db.Where("user_id=? AND task_type=?", userID, taskType).Find(&tasks).Error; err != nil {
		return nil, err
	}

	return tasks, nil
}

// CreateTask タスクをDBに登録する
func (s TaskService) CreateTask(c *gin.Context) (Task, error) {
	db := db.GetDB()
	var task Task

	if err := c.BindJSON(&task); err != nil {
		return task, err
	}

	if err := db.Create(&task).Error; err != nil {
		return task, err
	}

	return task, nil
}

// UpdateTask ユーザーID、タスクIDに合致したタスクを更新する
func (s TaskService) UpdateTask(userID string, taskID string, c *gin.Context) (Task, error) {
	db := db.GetDB()
	var task Task

	if err := db.Where("user_id = ? AND task_id=?", userID, taskID).First(&task).Error; err != nil {
		return task, err
	}

	if err := c.BindJSON(&task); err != nil {
		return task, err
	}

	db.Save(&task)

	return task, nil
}

// DeleteTask ユーザーID、タスクIDに合致したタスクを削除する
func (s TaskService) DeleteTask(userID string, taskID string) error {
	db := db.GetDB()
	var task Task

	if err := db.Where("user_id =? AND task_id=?", userID, taskID).Delete(&task).Error; err != nil {
		return err
	}

	return nil
}
