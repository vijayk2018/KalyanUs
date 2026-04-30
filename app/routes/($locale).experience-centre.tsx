import {type MetaFunction} from 'react-router';
import BookAppointment from '~/components/footerpages.tsx/Book_appotment';

export const meta: MetaFunction = () => {
  return [{title: 'Experience Centre | Kalyan Jewellers'}];
};

export default function ExperienceCentrePage() {
  return <BookAppointment />;
}
