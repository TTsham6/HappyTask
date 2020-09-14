package service

import (
	"app_go/db"
	"app_go/entity"
	"fmt"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

// UserService ユーザー認証に関するサービス
type UserService struct{}

// User ユーザー情報構造体
type User entity.User

// CertifyUser ユーザー認証を行う
func (s UserService) CertifyUser(c *gin.Context) (User, error) {
	db := db.GetDB()
	var user User

	// ContextからUserを読み込み
	if err := c.BindJSON(&user); err != nil {
		return user, err
	}

	userName := user.UserName
	password := user.Password

	// SELECT ユーザーID、パスワードに合致するレコードを取得
	if err := db.Where("user_name = ? AND password = ?", userName, password).
		First(&user).Error; err != nil {
		return user, err
	}

	return user, nil
}

// RegistUser 新規ユーザーを登録する
func (s UserService) RegistUser(c *gin.Context) (User, error) {
	db := db.GetDB()
	var user User
	var newUserID string

	// ユーザーIDが最新のレコードを取得
	err := db.Order("user_id desc").First(&user).Error

	if err != nil && gorm.IsRecordNotFoundError(err) {
		// ユーザーIDが見つからなかった場合
		newUserID = "0000"
	} else if err != nil {
		// 上記以外のエラーの場合
		return user, err
	} else {
		// 正常時
		// 最新のユーザーIDを採番
		IDNum, _ := strconv.Atoi(user.UserID)
		newUserID = fmt.Sprintf("%04d", IDNum+1)
	}

	// ContextからUserを読み込み
	if err := c.BindJSON(&user); err != nil {
		return user, err
	}
	user.UserID = newUserID
	user.RegisteredDate = time.Now()
	user.UpdateDate = time.Now()

	// INSSERT ユーザーを登録する
	if err := db.Create(&user).Error; err != nil {
		return user, err
	}

	return user, nil
}
