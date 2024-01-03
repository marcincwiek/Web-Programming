export interface ReservationForm {
    id: number;
    customerId: number;
    roomType: string;
    roomNumber: string;
    arrivalDate: number;
    departureDate: number;
    selectTour: number;
}