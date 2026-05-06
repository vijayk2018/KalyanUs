import {ChevronLeft, ChevronRight, X, Plus, Minus} from "lucide-react";
import {useEffect, useState} from "react";

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

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">

      {/* TOP BAR */}
      <div className="flex justify-between items-center p-4">

        {/* ZOOM */}
        <div className="flex gap-3">
          <button
            onClick={zoomIn}
            className="p-2 border rounded"
          >
            <Plus size={18} />
          </button>

          <button
            onClick={zoomOut}
            className="p-2 border rounded"
          >
            <Minus size={18} />
          </button>
        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="p-2 border rounded"
        >
          <X size={20} />
        </button>
      </div>

      {/* MAIN IMAGE */}
      <div className="flex-1 relative overflow-hidden">

        {/* LEFT */}
        <button
          onClick={prevImage}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
        >
          <ChevronLeft />
        </button>

        <div
          className="h-full w-full flex items-center justify-center overflow-hidden"
          onWheel={(event) => {
            event.preventDefault();
            if (event.deltaY < 0) zoomIn();
            if (event.deltaY > 0) zoomOut();
          }}
        >
          <div
            className="max-h-[80vh] max-w-[85vw] transition-transform duration-300 ease-out"
            style={{transform: `scale(${zoom})`, transformOrigin: 'center center'}}
          >
            <img
              src={images[currentIndex]?.url}
              className="max-h-[80vh] max-w-[85vw] object-contain"
              alt={`Product image ${currentIndex + 1}`}
            />
          </div>
        </div>

        {/* RIGHT */}
        <button
          onClick={nextImage}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
        >
          <ChevronRight />
        </button>
      </div>

      {/* THUMBNAILS */}
      <div className="flex justify-center gap-3 p-4 overflow-x-auto">
        {images.map((img: any, i: number) => (
          <img
            key={i}
            src={img.url}
            onClick={() => setCurrentIndex(i)}
            className={`w-20 h-20 object-cover rounded cursor-pointer border
              ${
                currentIndex === i
                  ? "border-red-500"
                  : "border-gray-300 opacity-50"
              }`}
          />
        ))}
      </div>
    </div>
  );
}