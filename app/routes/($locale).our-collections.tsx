import type {Route} from './+types/our-collections';
import moreCollectionsImage from '../assets/moreCollections.jpg';
import CollectionsGrid from '~/components/CollectionsGrid';
import FeaturedCarousel from '~/components/FeaturedCarousal';


export const meta: Route.MetaFunction = () => {
  return [{title: 'Our Collections'}];
};


export default function OurCollectionsPage() {
  

  return (
    <div className="w-full bg-white pb-16">
      <div className="mx-auto lg:py-16 pt-8">
       

        <FeaturedCarousel />

        <p className="mt-10 text-center font-bold font-serif text-2xl text-[#1f1f1f]">
          Choose what speaks to you
        </p>

        <CollectionsGrid isFrom="collections"/>

        {/* YouTube Video Embed */}
        <div className="mt-12 overflow-hidden rounded-[8px] w-full" style={{ aspectRatio: '16/9' }}>
          <iframe
            src="https://www.youtube.com/embed/49dRgGoMIpI"
            title="Tejasvi from Kalyan Jewellers"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            style={{ border: 'none', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}
