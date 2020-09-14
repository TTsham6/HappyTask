package json

// Item タスク情報JSONの構造体
type Item struct {
	UserID   string `json:"userId"`
	TaskID   string `json:"taskId"`
	PlanID   string `json:"planId"`
	PlanDate string `json:"planDate"`
	TaskName string `json:"taskName"`
	TaskURL  string `json:"taskUrl"`
	TaskMemo string `json:"taskMemo"`
	Category int    `json:"category"`
}
