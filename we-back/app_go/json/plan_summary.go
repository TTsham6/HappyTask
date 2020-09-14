package json

// PlanSummary 計画日ごとの集計の構造体
type PlanSummary struct {
	UserID   string `json:"userId"`
	PlanDate string `json:"planDate"`
	Count    int    `json:"count"`
}
