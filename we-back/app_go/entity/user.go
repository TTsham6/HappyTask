package entity

import "time"

// User ユーザーモデル
type User struct {
	UserID         string    `json:"userId"`
	UserName       string    `json:"userName"`
	Password       string    `json:"password"`
	RegisteredDate time.Time `json:"registered_date"`
	UpdateDate     time.Time `json:"update_date"`
}
