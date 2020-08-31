package service

import (
	"app_go/db"
	"app_go/entity"
)

// PlanService 週末の計画に関するサービス
type PlanService struct{}

// Plan 計画オブジェクト
type Plan entity.Plan

// GetPlanByUserID ユーザーIDに合致した計画を取得する
func (s PlanService) GetPlanByUserID(userID string) ([]Plan, error) {
	db := db.GetDB()
	var plans []Plan

	// DB検索
	if err := db.Where("user_id=?", userID).Find(&plans).Error; err != nil {
		return nil, err
	}

	return plans, nil
}

// CreatePlan 計画をDBに登録する
func (s PlanService) CreatePlan(plan Plan) (Plan, error) {
	db := db.GetDB()

	if err := db.Create(&plan).Error; err != nil {
		return plan, err
	}

	return plan, nil
}

// UpdatePlan ユーザーID、計画IDに合致した計画を更新する
func (s PlanService) UpdatePlan(userID string, planID string) (Plan, error) {
	db := db.GetDB()
	var plan Plan

	if err := db.Where("user_id=? AND plan_id=?", userID, planID).First(&plan).Error; err != nil {
		return plan, err
	}

	return plan, nil
}

// DeletePlan ユーザーID、計画IDに合致した計画を削除する
func (s PlanService) DeletePlan(userID string, planID string) error {
	db := db.GetDB()
	var plan Plan

	if err := db.Where("user_id=? AND plan_id=?", userID, planID).Delete(&plan).Error; err != nil {
		return err
	}

	return nil
}
