import {ChevronLeft, ChevronRight, X, Plus, Minus} from "lucide-react";
import {useState} from "react";

export default function ImageModal({
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}: any) {
  const [zoom, setZoom] = useState(1);

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
            onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
            className="p-2 border rounded"
          >
            <Plus size={18} />
          </button>

          <button
            onClick={() => setZoom((z) => Math.max(z - 0.2, 1))}
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
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">

        {/* LEFT */}
        <button
          onClick={prevImage}
          className="absolute left-5 bg-white shadow p-2 rounded-full"
        >
          <ChevronLeft />
        </button>

        <img
          src={images[currentIndex]?.url}
          style={{ transform: `scale(${zoom})` }}
          className="max-h-[80vh] object-contain transition duration-300"
        />

        {/* RIGHT */}
        <button
          onClick={nextImage}
          className="absolute right-5 bg-white shadow p-2 rounded-full"
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