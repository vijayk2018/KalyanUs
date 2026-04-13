import {useEffect, useState} from "react";
import {X} from "lucide-react";
import {getWishlist, removeFromWishlist, type WishlistItem} from "~/lib/wishlist";
import {Link} from "react-router";


export default function WishlistDrawer({open, onClose}: {open: boolean; onClose: () => void}) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    if (open) {
      setItems(getWishlist());
    }
  }, [open]);

  const handleRemove = (itemId: string) => {
    removeFromWishlist(itemId);
    setItems(getWishlist());
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[350px] bg-[#f3f3f3] z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-[#d9d9d9] bg-white">
          <div>
            <h2 className="text-lg font-semibold">My Wishlist ♥</h2>
            <p className="text-sm text-gray-500">{items.length} items</p>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[72%]">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Your wishlist is empty
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 items-start border-b border-[#e2e2e2] pb-3">
                <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  ) : null}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                  <p className="text-gray-500 text-sm">
                    {item.price ? `$${item.price}` : '$--'}
                  </p>
                  {item.handle ? (
                    <Link
                      to={`/products/${item.handle}`}
                      onClick={onClose}
                      className="inline-block mt-2 bg-black text-white px-3 py-1 text-xs rounded"
                    >
                      View product
                    </Link>
                  ) : null}
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-[#d9d9d9] bg-[#ececec]">
          <p className="font-semibold">Don't lose your Lists!</p>
          <p className="text-sm text-gray-500">
            Login to save your favorites and access them whenever.
          </p>
        </div>
      </div>
    </>
  );
}