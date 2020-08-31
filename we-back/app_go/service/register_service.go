package service

import (
	"app_go/db"
	"time"
)

// RegisterService 計画の登録に関するサービス
type RegisterService struct{}

// RegisTaskInPlan タスクを計画に登録する
func (r RegisterService) RegisTaskInPlan(userID string, taskID string, date string) (Task, error) {
	db := db.GetDB()
	var plans []Plan
	var task Task

	// 新しい計画IDを作成する
	newPlanID := userID + date

	// 既に計画IDがあるか検索する
	if err := db.Where("user_id=? AND plan_id=?", userID, newPlanID).Find(&plans).Error; err != nil {
		return task, err
	}

	// 計画が無い場合、新しく計画を作成する
	if len(plans) == 0 {
		// 新しい計画構造体を作成
		planDate, _ := time.Parse("20060102", date)
		newPlan := Plan{
			UserID:         userID,
			PlanID:         newPlanID,
			PlanDate:       planDate,
			RegisteredDate: time.Now(),
			UpdateDate:     time.Now(),
		}
		// 計画を新規作成
		if err := db.Create(&newPlan).Error; err != nil {
			return task, err
		}
	}

	// タスクを取得する
	if err := db.Where("user_id=? AND task_id=?", userID, taskID).First(&task).Error; err != nil {
		return task, err
	}

	// タスクに計画IDを紐づける
	task.PlanID = newPlanID

	// タスクを更新する
	db.Save(&task)

	return task, nil
}

// UnregistTaskInPlan タスクを計画から外す
func (r RegisterService) UnregistTaskInPlan(userID string, taskID string) (Task, error) {
	db := db.GetDB()
	var task Task

	// タスクを取得する
	if err := db.Where("user_id=? AND task_id=?", userID, taskID).First(&task).Error; err != nil {
		return task, err
	}

	// タスクから計画IDを外す
	task.PlanID = ""

	// タスクを更新する
	db.Save(&task)

	return task, nil
}
