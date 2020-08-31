package controller

import (
	"fmt"

	"app_go/service"

	"github.com/gin-gonic/gin"
)

// TaskController タスクコントローラー
type TaskController struct{}

// GetTaskList タスクリストを取得する
func (tc TaskController) GetTaskList(c *gin.Context) {
	userID := c.Query("user_id")
	taskType := c.Query("task_type")
	var service service.TaskService
	t, err := service.GetTasksByUserID(userID, taskType)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, t)
	}
}

// RegistTask タスクを登録する
func (tc TaskController) RegistTask(c *gin.Context) {
	var service service.TaskService
	p, err := service.CreateTask(c)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(201, p)
	}
}

// DeleteTask タスクを削除する
func (tc TaskController) DeleteTask(c *gin.Context) {
	userID := c.Params.ByName("user_id")
	taskID := c.Params.ByName("task_id")

	var service service.TaskService

	if err := service.DeleteTask(userID, taskID); err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(204, gin.H{"task ID #" + taskID: "deleted"})
	}
}
