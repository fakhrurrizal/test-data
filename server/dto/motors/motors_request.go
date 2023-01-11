package motorsdto

type CreateMotor struct {
	Id_Register       string `json:"id_register" form:"id_Register" validate:"required"`
	Name              string `json:"name" form:"name" validate:"required"`
	Address           string `json:"address" form:"address" validate:"required"`
	Brand             string `json:"brand" form:"brand" validate:"required"`
	Production_year   int    `json:"production_year" form:"production_year" validate:"required"`
	Cylinder_capacity int    `json:"cylinder_capacity" form:"cylinder_capacity" validate:"required"`
	Color             string `json:"color" form:"color" validate:"required"`
	Fuel              string `json:"fuel" form:"fuel" validate:"required"`
}

type UpdateMotor struct {
	Id_Register       string `json:"id_register" form:"Id_Register" validate:"required"`
	Name              string `json:"name" form:"name" validate:"required"`
	Address           string `json:"address" form:"address" validate:"required"`
	Brand             string `json:"brand" form:"brand" validate:"required"`
	Production_year   int    `json:"production_year" form:"production_year" validate:"required"`
	Cylinder_capacity int    `json:"cylinder_capacity" form:"cylinder_capacity" validate:"required"`
	Color             string `json:"color" form:"color" validate:"required"`
	Fuel              string `json:"fuel" form:"fuel" validate:"required"`
}

type FilterMotor struct {
	Id_Register string `json:"id_register" form:"id_register"`
	Name        string `json:"name" form:"name"`
}
