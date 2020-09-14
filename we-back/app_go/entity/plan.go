package entity

import "time"

// Plan 計画情報構造体
type Plan struct {
	UserID         string
	PlanID         string
	PlanDate       string
	RegisteredDate time.Time
	UpdateDate     time.Time
}
