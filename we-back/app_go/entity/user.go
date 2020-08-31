package entity

import "time"

// User ユーザーモデル
type User struct {
	UserID         string    `json:"user_id"`
	UserName       string    `json:"user_name"`
	UserPswd       string    `json:"user_pswd"`
	RegisteredDate time.Time `json:"registered_date"`
	UpdateDate     time.Time `json:"update_date"`
}
