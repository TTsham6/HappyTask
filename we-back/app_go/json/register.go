package json

// Register 登録情報の構造体
type Register struct {
	UserID   string `json:"user_id"`
	TaskID   string `json:"task_id"`
	PlanID   string `json:"plan_id"`
	PlanDate string `json:"plan_date"`
}
