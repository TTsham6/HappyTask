package db

import (
	"os"
	
	"github.com/jinzhu/gorm"
	"github.com/lib/pq"
	_ "github.com/jinzhu/gorm/dialects/postgres" // Use PostgreSQL in gorm
)

var (
	db  *gorm.DB
	err error
)

// Init DBの初期設定を行う
// func Init() {
// 	// TODO 設定ファイルからの読み込みに変更する
// 	db, err = gorm.Open("postgres", "host=0.0.0.0 port=5432 user=we-user dbname=wefundb password=we-admin sslmode=disable")
// 	if err != nil {
// 		panic(err)
// 	}
// }

// Init DBの初期設定を行う(HEROKUのPostgreSQLアドオン用の設定)
func Init(){
	// TODO 設定ファイルからの読み込みに変更する
	url:=os.Getenv("DATABASE_URL")
	connection,err:=pq.ParseURL(url)
	if err!=nil{
		panic(err.Error())
	}
	connection += " sslmode=require"

	db,err =gorm.Open("postgres",connection)
	if err != nil {
		panic(err.Error())
	}
}




// GetDB モデルを呼び出す
func GetDB() *gorm.DB {
	return db
}

// Close DBコネクションを切断する
func Close() {
	if err := db.Close(); err != nil {
		panic(err)
	}
}
