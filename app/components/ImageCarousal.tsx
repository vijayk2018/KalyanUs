import {X, Plus, Minus} from "lucide-react";
import {useEffect, useRef, useState} from "react";

export default function ImageModal({
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}: any) {
  const [zoom, setZoom] = useState(1);
  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 1));

  useEffect(() => {
    setZoom(1);
  }, [currentIndex]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === '+' || key === '=' || key === 'Add') {
        event.preventDefault();
        zoomIn();
      } else if (key === '-' || key === '_' || key === 'Subtract') {
        event.preventDefault();
        zoomOut();
      } else if (key === '0') {
        event.preventDefault();
        setZoom(1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev: number) =>
      (prev + 1) % images.length
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev: number) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const swipeStartX = useRef<number | null>(null);

  const handleCarouselPointerDown = (event: React.PointerEvent) => {
    swipeStartX.current = event.clientX;
  };

  const handleCarouselPointerUp = (event: React.PointerEvent) => {
    if (swipeStartX.current === null || images.length < 2) return;
    const startX = swipeStartX.current;
    swipeStartX.current = null;
    if (zoom > 1.01) return;

    const dx = event.clientX - startX;
    const threshold = 48;
    if (dx > threshold) prevImage();
    else if (dx < -threshold) nextImage();
  };

  const handleCarouselPointerCancel = () => {
    swipeStartX.current = null;
  };

  const iconThin = {strokeWidth: 1 as const};

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">

      {/* Close — top right, light blue border (reference UI) */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-50 right-0 z-20 flex p-2 items-center justify-center bg-white hover:border hover:border-sky-200"
      >
        <X size={42} className="text-neutral-400" {...iconThin} />
      </button>

      {/* Zoom — left edge, vertically centered, + above −, no chrome */}
      <div
        className="pointer-events-auto absolute top-65 z-20 flex -translate-y-1/2 flex-col gap-2"
        aria-label="Zoom controls"
      >
        <button
          type="button"
          onClick={zoomIn}
          aria-label="Zoom in"
          className="mb-3 flex items-center justify-center bg-transparent p-3 hover:border-2 hover:shadow-2xl hover:border-sky-300 "
        >
          <Plus size={49} className="text-neutral-400" {...iconThin} />
        </button>
        <button
          type="button"
          onClick={zoomOut}
          aria-label="Zoom out"
          className="flex items-center justify-center bg-transparent p-3 hover:border-2 hover:shadow-2xl hover:border-sky-300 "
        >
          <Minus size={49} className="text-neutral-400" {...iconThin} />
        </button>
      </div>

      {/* MAIN IMAGE */}
      <div className="flex-1 relative min-h-0 overflow-hidden">

        <div
          className="h-full w-full cursor-grab overflow-hidden active:cursor-grabbing touch-pan-y"
          onPointerDown={handleCarouselPointerDown}
          onPointerUp={handleCarouselPointerUp}
          onPointerCancel={handleCarouselPointerCancel}
          onWheel={(event) => {
            event.preventDefault();
            if (event.deltaY < 0) zoomIn();
            if (event.deltaY > 0) zoomOut();
          }}
        >
          <div
            className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none motion-reduce:duration-0"
            style={{transform: `translateX(-${currentIndex * 100}%)`}}
          >
            {images.map((img: any, i: number) => (
              <div
                key={img?.url ?? i}
                className="flex h-full min-w-full shrink-0 items-center justify-center overflow-hidden"
              >
                <div
                  className="max-h-[82vh] max-w-[87vw] transition-transform duration-300 ease-out motion-reduce:transition-none"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center center',
                  }}
                >
                  <img
                    src={img?.url}
                    className="pointer-events-none max-h-[82vh] max-w-[87vw] object-contain select-none"
                    alt={`Product image ${i + 1}`}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnails — bottom-left, ~1/10 viewer height, active orange-brown border */}
      <div className="flex shrink-0 justify-start gap-2 overflow-x-auto pb-[1rem] pt-0">
        {images.map((img: any, i: number) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentIndex(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={currentIndex === i ? 'true' : undefined}
            className={`h-[min(15vh,10rem)] w-[min(15vh,10rem)] shrink-0 overflow-hidden  ${
              currentIndex === i
                ? 'border-2 border-[#ff5501] bg-neutral-200'
                : 'border-0'
            }`}
          >
            <img
              src={img.url}
              alt=""
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}