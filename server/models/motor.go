package models

import "time"

type Motor struct {
	ID                int       `json:"id" gorm:"primary_key:auto_increment"`
	Id_Register       string    `json:"id_register" gorm:"type:varchar(255)"`
	Name              string    `json:"name" gorm:"type: varchar(255)"`
	Address           string    `json:"address" gorm:"type: text"`
	Brand             string    `json:"brand" gorm:"type:varchar(255)"`
	Production_year   int       `json:"production_year" gorm:"int(4)"`
	Cylinder_capacity int       `json:"cylinder_capacity"`
	Color             string    `json:"color" gorm:"varchar(255)"`
	Fuel              string    `json:"fuel" gorm:"varchar(255)"`
	CreateAt          time.Time `json:"-"`
	UpdateAt          time.Time `json:"-"`
}
