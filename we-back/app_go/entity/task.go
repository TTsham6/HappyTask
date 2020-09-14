package entity

import "time"

// Task タスク情報モデル
type Task struct {
	UserID         string    `json:"user_id"`
	TaskID         string    `json:"task_id"`
	PlanID         string    `json:"plan_id"`
	TaskName       string    `json:"task_name"`
	TaskURL        string    `json:"task_url"`
	TaskMemo       string    `json:"task_memo"`
	Category       int       `json:"category"`
	RegisteredDate time.Time `json:"registered_date"`
	UpdateDate     time.Time `json:"update_date"`
}
