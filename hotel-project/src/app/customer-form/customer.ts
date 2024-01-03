export interface Customer {
    id: number;
    tcNo: string;
    passportNo: string;
    nationality: string;
    firstName: string;
    lastName: string;
    middleName: string;
    gender: number;
    streetAddress: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    notes: string;
}
export interface Tours {
    selectTour: number;
}