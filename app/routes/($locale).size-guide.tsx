import { type LoaderFunctionArgs } from 'react-router';
import SizeGuide from '~/components/footerpages.tsx/Size_guide';

export async function loader({ params }: LoaderFunctionArgs) {
    return {};
}

export default function SizeGuidePage() {
    return <SizeGuide />;
}
