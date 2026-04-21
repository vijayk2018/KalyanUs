import { type LoaderFunctionArgs } from 'react-router';
import Gemstone from '~/components/footerpages.tsx/Gemstone';

export async function loader({ params }: LoaderFunctionArgs) {
    return {};
}

export default function GemstoneGuidePage() {
    return <Gemstone />;
}
