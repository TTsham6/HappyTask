package controller

import (
	"app_go/json"
	"app_go/service"
	"fmt"

	"github.com/gin-gonic/gin"
)

// RegisterController 計画登録に関するコントローラー
type RegisterController struct{}

// RegistTaskInPlan タスクを計画に登録する
func (rc RegisterController) RegistTaskInPlan(c *gin.Context) {
	var register json.Register
	c.BindJSON(&register)
	userID := register.UserID
	taskID := register.TaskID
	date := register.PlanDate

	var rs service.RegisterService
	task, err := rs.RegisTaskInPlan(userID, taskID, date)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, task)
	}
}

// UnregistTaskInPlan タスクを計画から外す
func (rc RegisterController) UnregistTaskInPlan(c *gin.Context) {
	var register json.Register
	c.BindJSON(&register)
	userID := register.UserID
	taskID := register.TaskID

	var rs service.RegisterService
	task, err := rs.UnregistTaskInPlan(userID, taskID)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, task)
	}
}
