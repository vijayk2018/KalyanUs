import { type LoaderFunctionArgs } from 'react-router';
import Privacy from '~/components/footerpages.tsx/Privacy';

export async function loader({ params }: LoaderFunctionArgs) {
    return {};
}

export default function PrivacyPage() {
    return <Privacy />;
}
