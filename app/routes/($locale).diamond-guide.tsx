import { type LoaderFunctionArgs } from 'react-router';
import DiamondGuide from '~/components/footerpages.tsx/Diamond_guide';

export async function loader({ params }: LoaderFunctionArgs) {
    return {};
}

export default function DiamondGuidePage() {
    return <DiamondGuide />;
}
