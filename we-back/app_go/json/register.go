package json

// Register 計画登録時のレスポンス構造体
type Register struct {
	Summary []PlanSummary `json:"summary"`
	NewItem Item          `json:"newItem"`
}
