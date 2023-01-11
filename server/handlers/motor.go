package handlers

import (
	"encoding/json"
	motorsdto "kendaraan/dto/motors"
	"kendaraan/dto/result"
	"kendaraan/models"
	"kendaraan/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type handlerMotor struct {
	MotorRepository repositories.MotorRepository
}

func HandlerMotor(MotorRepository repositories.MotorRepository) *handlerMotor {
	return &handlerMotor{MotorRepository}
}

func (h *handlerMotor) FindMotors(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	motors, err := h.MotorRepository.FindMotors()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := result.ErrorResult{Status: "Server Error", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := result.SuccessResult{Status: "Success", Data: motors}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerMotor) GetMotor(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var motor models.Motor

	motor, err := h.MotorRepository.GetMotor(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := result.ErrorResult{Status: "Server Error", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := result.SuccessResult{Status: "Success", Data: motor}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerMotor) CreateMotor(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	production_year, _ := strconv.Atoi(r.FormValue("production_year"))
	cylinder_capacity, _ := strconv.Atoi(r.FormValue("cylinder_capacity"))
	request := motorsdto.CreateMotor{
		Id_Register:       r.FormValue("id_register"),
		Name:              r.FormValue("name"),
		Address:           r.FormValue("address"),
		Brand:             r.FormValue("brand"),
		Production_year:   production_year,
		Cylinder_capacity: cylinder_capacity,
		Color:             r.FormValue("color"),
		Fuel:              r.FormValue("fuel"),
	}

	validation := validator.New()

	err := validation.Struct(request)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := result.ErrorResult{Status: "Failed Add Motor", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	motor := models.Motor{
		Id_Register:       request.Id_Register,
		Name:              request.Name,
		Address:           request.Address,
		Brand:             request.Brand,
		Production_year:   request.Production_year,
		Cylinder_capacity: request.Cylinder_capacity,
		Color:             request.Color,
		Fuel:              request.Fuel,
	}

	motor, err = h.MotorRepository.CreateMotor(motor)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := result.ErrorResult{Status: "Server Error", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	motor, _ = h.MotorRepository.GetMotor(motor.ID)

	w.WriteHeader(http.StatusOK)
	response := result.SuccessResult{Status: "Success", Data: motor}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerMotor) UpdateMotor(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	production_year, _ := strconv.Atoi(r.FormValue("production_year"))
	cylinder_capacity, _ := strconv.Atoi(r.FormValue("cylinder_capacity"))
	request := motorsdto.CreateMotor{
		Id_Register:       r.FormValue("id_register"),
		Name:              r.FormValue("name"),
		Address:           r.FormValue("address"),
		Brand:             r.FormValue("brand"),
		Production_year:   production_year,
		Cylinder_capacity: cylinder_capacity,
		Color:             r.FormValue("color"),
		Fuel:              r.FormValue("fuel"),
	}

	motor, err := h.MotorRepository.GetMotor(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := result.ErrorResult{Status: "Failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.Id_Register != "" {
		motor.Id_Register = request.Id_Register
	}

	if request.Name != "" {
		motor.Name = request.Name
	}
	if request.Address != "" {
		motor.Address = request.Address
	}
	if request.Brand != "" {
		motor.Brand = request.Brand
	}
	if request.Production_year != 0 {
		motor.Production_year = request.Production_year
	}
	if request.Cylinder_capacity != 0 {
		motor.Cylinder_capacity = request.Cylinder_capacity
	}
	if request.Color != "" {
		motor.Color = request.Color
	}
	if request.Fuel != "" {
		motor.Fuel = request.Fuel
	}

	data, err := h.MotorRepository.UpdateMotor(motor)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := result.ErrorResult{Status: "Server Error", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	w.WriteHeader(http.StatusOK)
	response := result.SuccessResult{Status: "Sucess", Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerMotor) DeleteMotor(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	motors, err := h.MotorRepository.GetMotor(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := result.ErrorResult{Status: "Failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	deleteMotor, err := h.MotorRepository.DeleteMotor(motors)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := result.ErrorResult{Status: "Failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := result.SuccessResult{Status: "Success Delete", Data: deleteMotor}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerMotor) FilterMotor(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	request := new(motorsdto.FilterMotor)

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := result.ErrorResult{Status: "Failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.MotorRepository.FilterMotor(request.Id_Register, request.Name)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := result.ErrorResult{Status: "Gagal", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := result.SuccessResult{Status: "Success", Data: data}
	json.NewEncoder(w).Encode(response)
}
