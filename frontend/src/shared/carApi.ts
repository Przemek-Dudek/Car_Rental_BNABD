import axios from 'axios';
import type { CarDto } from '../components/CarAddForm/CarAddForm';

const BASE_URL = 'http://localhost:8080/api';

export const getAllCars = async () => {
  const response = await axios.get(`${BASE_URL}/rental/cars/all`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const addCar = async (car: CarDto, accessToken: string) => {
  const response = await axios.post(
    `${BASE_URL}/rental/cars`,
    {
      brand: car.brand,
      model: car.model,
      year: Number(car.year),
      plateNumber: car.plateNumber,
      pricePerDay: Number(car.pricePerDay),
      status: car.status,
      segment: car.segment,
      imageLink: car.imageLink,
      endOfInspectionDate: car.endOfInspectionDate,
      endOfInsuranceDate: car.endOfInsuranceDate,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
};

export const updateCar = async (car: any, accessToken: string) => {
  const response = await axios.put(
    `${BASE_URL}/rental/cars`,
    {
      id: car.id,
      brand: car.brand,
      model: car.model,
      year: Number(car.year),
      plateNumber: car.plateNumber,
      pricePerDay: Number(car.pricePerDay),
      status: car.status,
      segment: car.segment,
      imageLink: car.imageLink,
      endOfInspectionDate: car.endOfInspectionDate,
      endOfInsuranceDate: car.endOfInsuranceDate,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    }
  );
  return response.data;
};

export const deleteCar = async (id: number, accessToken: string) => {
  const response = await axios.delete(`${BASE_URL}/rental/cars`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: { id },
  });
  return response.data;
};