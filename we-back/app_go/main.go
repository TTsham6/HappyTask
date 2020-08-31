package main

import (
	"app_go/db"
	"app_go/server"
)

func main() {
	db.Init()
	server.Init()
	db.Close()
}
