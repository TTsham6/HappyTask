package controller

import (
	"app_go/json"
	"app_go/service"
	"fmt"

	"github.com/gin-gonic/gin"
)

// PlanController 計画登録に関するコントローラー
type PlanController struct{}

// GetPlanSummary ユーザーIDごとの計画のサマリを取得する
func (pc PlanController) GetPlanSummary(c *gin.Context) {
	userID := c.Query("userId")

	var ps service.PlanService
	summary, err := ps.GetPlanSummary(userID)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, summary)
	}
}

// GetPlanList 計画を取得する
func (pc PlanController) GetPlanList(c *gin.Context) {
	userID := c.Query("userId")
	planDate := c.Query("planDate")

	var ps service.PlanService
	items, err := ps.GetPlanByPlanDate(userID, planDate)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, items)
	}
}

// UpdateItemRegist タスクの計画への登録状況を更新する
func (pc PlanController) UpdateItemRegist(c *gin.Context) {
	var item json.Item

	if err := c.BindJSON(&item); err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}

	var ps service.PlanService
	res, err := ps.UpdateRegist(item)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, res)
	}
}
