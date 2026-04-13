import { type MetaFunction } from 'react-router';
import ContactUs from '~/components/footerpages.tsx/Contact_us';

export const meta: MetaFunction = () => {
    return [{ title: 'Contact Us | Kalyan Jewellers' }];
};

export default function ContactUsRoute() {
    return <ContactUs />;
}
