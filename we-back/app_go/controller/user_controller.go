package controller

import (
	"app_go/service"
	"fmt"

	"github.com/gin-gonic/gin"
)

// UserController ユーザーコントローラー
type UserController struct{}

// CertifyUser ユーザーを認証する
func (uc UserController) CertifyUser(c *gin.Context) {
	var service service.UserService

	user, err := service.CertifyUser(c)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, user)
	}
}

// RegistUser ユーザーを登録する
func (uc UserController) RegistUser(c *gin.Context) {
	var service service.UserService

	user, err := service.RegistUser(c)

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(201, user)
	}

}
