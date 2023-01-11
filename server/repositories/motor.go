package repositories

import (
	"kendaraan/models"

	"gorm.io/gorm"
)

type MotorRepository interface {
	FindMotors() ([]models.Motor, error)
	GetMotor(ID int) (models.Motor, error)
	CreateMotor(motor models.Motor) (models.Motor, error)
	UpdateMotor(motor models.Motor) (models.Motor, error)
	DeleteMotor(motor models.Motor) (models.Motor, error)
	FilterMotor(id_register string, name string) ([]models.Motor, error)
}

func RepositoryMotor(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindMotors() ([]models.Motor, error) {
	var motors []models.Motor
	err := r.db.Find(&motors).Error
	return motors, err
}

func (r *repository) GetMotor(ID int) (models.Motor, error) {
	var motors models.Motor
	err := r.db.First(&motors, ID).Error

	return motors, err
}

func (r *repository) CreateMotor(motor models.Motor) (models.Motor, error) {
	err := r.db.Create(&motor).Error

	return motor, err
}

func (r *repository) UpdateMotor(motor models.Motor) (models.Motor, error) {
	err := r.db.Save(&motor).Error

	return motor, err
}

func (r *repository) DeleteMotor(motor models.Motor) (models.Motor, error) {
	err := r.db.Delete(&motor).Error

	return motor, err
}
func (r *repository) FilterMotor(id_register string, name string) ([]models.Motor, error) {
	var motor []models.Motor
	err := r.db.Where("id_register = ? OR name = ?", id_register, name).Find(&motor).Error
	return motor, err
}
