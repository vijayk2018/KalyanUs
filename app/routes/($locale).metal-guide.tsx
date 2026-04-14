import {type LoaderFunctionArgs} from 'react-router';
import MetalGuide from '~/components/footerpages.tsx/Metal_guide';

export async function loader({params}: LoaderFunctionArgs) {
  return {};
}

export default function MetalGuidePage() {
  return <MetalGuide />;
}
