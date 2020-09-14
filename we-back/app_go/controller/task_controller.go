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
	var service service.TaskService
	userID := c.Query("userId")
	category := c.Query("category")

	item, err := service.GetTasksByUserID(userID, category)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, item)
	}
}

// UpdateTask タスクを更新する
func (tc TaskController) UpdateTask(c *gin.Context) {
	var service service.TaskService
	userID := c.Query("userId")
	taskID := c.Query("taskId")
	item, err := service.UpdateTask(userID, taskID, c)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, item)
	}
}

// RegistTask タスクを登録する
func (tc TaskController) RegistTask(c *gin.Context) {
	userID := c.Query("userId")
	var service service.TaskService
	p, err := service.CreateTask(userID, c)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(201, p)
	}
}

// DeleteTask タスクを削除する
func (tc TaskController) DeleteTask(c *gin.Context) {
	userID := c.Query("userId")
	taskID := c.Query("taskId")

	var service service.TaskService

	if err := service.DeleteTask(userID, taskID); err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(204, gin.H{"task ID #" + taskID: "deleted"})
	}
}
