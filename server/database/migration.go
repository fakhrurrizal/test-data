package database

import (
	"fmt"
	"kendaraan/models"
	"kendaraan/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(&models.Motor{})

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
