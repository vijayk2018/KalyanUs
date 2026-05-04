/**
 * Kalyan Jewellers floating SaleAssist control (client-provided layout).
 * Calls the same mount as: saleassist.mountWidget({ id, form_factor: 'button' })
 */
declare global {
  interface Window {
    saleassist?: {
      mountWidget: (args: {id: string; form_factor?: 'button'}) => void;
    };
  }
}

type SaleAssistFloatingButtonProps = {
  widgetId: string;
};

export function SaleAssistFloatingButton({widgetId}: SaleAssistFloatingButtonProps) {
  function handleClick() {
    if (!widgetId || typeof window === 'undefined') return;
    window.saleassist?.mountWidget({
      id: widgetId,
      form_factor: 'button',
    });
  }

  return (
    <button
      type="button"
      className="kj-sa-float-btn"
      onClick={handleClick}
      aria-label="Shop live video"
    >
      <div className="kj-sa-float-icon">
        <span className="kj-sa-float-pulse" aria-hidden="true" />
        <span className="kj-sa-float-pulse kj-sa-float-pulse--delay" aria-hidden="true" />
        <svg
          className="kj-sa-float-icon-svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14" />
          <rect x="2" y="7" width="13" height="10" rx="2" />
        </svg>
      </div>
      <span className="kj-sa-float-shop">Shop</span>
      <span className="kj-sa-float-live">LIVE</span>
    </button>
  );
}
