package service

import (
	"app_go/db"
	"app_go/entity"
	"app_go/json"
	"app_go/logic"

	"time"
)

// PlanService 計画の登録に関するサービス
type PlanService struct{}

// GetPlanSummary ユーザーIDに合致する計画を取得する
func (s PlanService) GetPlanSummary(userID string) ([]json.PlanSummary, error) {
	db := db.GetDB()
	var planDateRes []json.PlanSummary

	// DB検索
	if err := db.Table("tasks").
		Select("plans.plan_date, count(*)").
		Joins("INNER JOIN plans ON tasks.plan_id = plans.plan_id").
		Where("plans.user_id=?", userID).
		Group("plans.plan_date").Scan(&planDateRes).Error; err != nil {
		return planDateRes, err
	}

	return planDateRes, nil
}

// GetPlanByPlanDate ユーザーIDと日付に合致した計画を取得する
func (s PlanService) GetPlanByPlanDate(userID string, planDate string) ([]json.Item, error) {
	db := db.GetDB()
	var items []json.Item

	// DB検索
	if err := db.Table("tasks").
		Select("tasks.*,plans.plan_id,plans.plan_date").
		Joins("INNER JOIN plans ON tasks.plan_id = plans.plan_id").
		Where("plans.user_id = ? AND plans.plan_date=?", userID, planDate).
		Scan(&items).Error; err != nil {
		return items, err
	}
	return items, nil
}

// UpdateRegist タスクの計画への登録状況を更新する
func (s PlanService) UpdateRegist(item json.Item) (json.Register, error) {
	var register json.Register
	var newItem json.Item

	userID := item.UserID
	taskID := item.TaskID
	planDate := item.PlanDate

	// タスクの計画状況を更新する
	if item.PlanID == "" {
		// 画面で選択されたアイテムの計画IDが空の場合⇒計画に登録する
		ni, err := s.regisTaskInPlan(userID, taskID, planDate)
		if err != nil {
			return register, err
		}
		newItem = ni
	} else {
		// 画面で選択されたアイテムの計画IDではない場合⇒計画から外す
		ni, err := s.unregistTaskInPlan(userID, taskID)
		if err != nil {
			return register, err
		}
		newItem = ni
	}
	// 計画サマリを再取得する
	summary, err := s.GetPlanSummary(userID)
	if err != nil {
		return register, err
	}

	// 更新したアイテムと計画リストを戻り値に格納
	register.NewItem = newItem
	register.Summary = summary
	return register, nil
}

// RegisTaskInPlan タスクを計画に登録する
func (s PlanService) regisTaskInPlan(userID string, taskID string, planDate string) (json.Item, error) {
	db := db.GetDB()
	var plan entity.Plan
	var task entity.Task
	var item json.Item

	// 新しい計画IDを作成する
	newPlanID := userID + planDate

	// 既に計画IDがあるか検索する
	recordNotFound := db.Where("user_id=? AND plan_id=?", userID, newPlanID).First(&plan).RecordNotFound()
	// 計画が無い場合、新しく計画を作成する
	if recordNotFound {
		// 新しい計画構造体を作成
		plan.UserID = userID
		plan.PlanID = newPlanID
		plan.PlanDate = planDate
		plan.RegisteredDate = time.Now()
		plan.UpdateDate = time.Now()

		// CREATE 計画を新規作成
		if err := db.Create(&plan).Error; err != nil {
			return item, err
		}
	}

	// SELECT タスクを取得する
	if err := db.Where("user_id=? AND task_id=?", userID, taskID).First(&task).Error; err != nil {
		return item, err
	}
	// UPDATE タスクを更新する
	if err := db.Model(&task).
		Where("user_id=? AND task_id=?", userID, taskID).
		Update("plan_id", newPlanID).Scan(&item).Error; err != nil {
		return item, err
	}

	// PlanとTaskからItemを作成する
	item = logic.ConvertEntityToItem(task, plan)
	return item, nil
}

// UnregistTaskInPlan タスクを計画から外す
func (s PlanService) unregistTaskInPlan(userID string, taskID string) (json.Item, error) {
	db := db.GetDB()
	var task entity.Task
	var item json.Item

	// SELECTタスクを取得する
	if err := db.Where("user_id=? AND task_id=?", userID, taskID).First(&task).Error; err != nil {
		return item, err
	}
	// UPDATE タスクを更新する
	// 空文字はGORMに空（更新なし）とみなされるため、構造体を使用せずにカラムを直接更新する
	if err := db.Model(&task).
		Where("user_id=? AND task_id=?", userID, taskID).
		Update("plan_id", "").Error; err != nil {
		return item, err
	}

	// TaskをItemに変換する
	item = logic.ConvertTaskToItem(task)
	return item, nil
}
