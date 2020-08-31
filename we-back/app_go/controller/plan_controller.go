package controller

import (
	"app_go/service"
	"fmt"

	"github.com/gin-gonic/gin"
)

// PlanController 計画に関するコントローラー
type PlanController struct{}

// GetPlanList 計画リストを取得する
func (pc PlanController) GetPlanList(c *gin.Context) {
	userID := c.Params.ByName("user_id")
	var service service.PlanService
	p, err := service.GetPlanByUserID(userID)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, p)
	}
}
