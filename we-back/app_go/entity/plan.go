package entity

import "time"

// Plan 計画情報構造体
type Plan struct {
	UserID         string    `json:"user_id"`
	PlanID         string    `json:"plan_id"`
	PlanDate       time.Time `json:"plan_date"`
	RegisteredDate time.Time `json:"registered_date"`
	UpdateDate     time.Time `json:"update_date"`
}
