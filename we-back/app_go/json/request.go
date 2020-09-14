package json

// Request リクエストJSONの構造体
type Request struct {
	UserID   string `json:"userId"`
	TaskID   string `json:"taskId"`
	PlanDate string `json:"planDate"`
}
