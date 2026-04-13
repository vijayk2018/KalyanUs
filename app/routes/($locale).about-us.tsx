import { type LoaderFunctionArgs } from 'react-router';
import About from '~/components/footerpages.tsx/About';

export async function loader({ params }: LoaderFunctionArgs) {
    return {};
}

export default function AboutUsPage() {
    return <About />;
}
