package routes

import (
	"kendaraan/handlers"
	"kendaraan/pkg/mysql"
	"kendaraan/repositories"

	"github.com/gorilla/mux"
)

func MotorRoutes(r *mux.Router) {
	MotorRespository := repositories.RepositoryMotor(mysql.DB)
	h := handlers.HandlerMotor(MotorRespository)

	r.HandleFunc("/motors", h.FindMotors).Methods("GET")
	r.HandleFunc("/motor/{id}", h.GetMotor).Methods("GET")
	r.HandleFunc("/motor", h.CreateMotor).Methods("POST")
	r.HandleFunc("/motor/{id}", h.DeleteMotor).Methods("DELETE")
	r.HandleFunc("/motor/{id}", h.UpdateMotor).Methods("PATCH")
	r.HandleFunc("/filter", h.FilterMotor).Methods("POST")
}
