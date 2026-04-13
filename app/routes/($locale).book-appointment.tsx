import { type MetaFunction } from 'react-router';
import BookAppointment from '~/components/footerpages.tsx/Book_appotment';

export const meta: MetaFunction = () => {
    return [{ title: 'Book an Appointment | Kalyan Jewellers' }];
};

export default function BookAppointmentPage() {
    return <BookAppointment />;
}
