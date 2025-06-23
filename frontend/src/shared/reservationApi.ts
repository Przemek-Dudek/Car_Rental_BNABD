import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const addReservation = async (reservation: ReservationDto, accessToken: string) => {
    const response = await axios.post(
        `${BASE_URL}/rental/reservations`,
        {
            customerId: reservation.customerId,
            modelId: reservation.modelId,
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            status: reservation.status
        },
        {headers: {Authorization: `Bearer ${accessToken}`}}
    );
    return response.data;
};

export interface ReservationDto {
    customerId: string
    modelId: string
    startDate: string
    endDate: string
    status: string
}