// PDP / sticky SaleAssist: modal shells + reposition SDK root (#saleassist-widget-{id}) into modal.
// SaleAssist appends most widgets to document.body (parentElementId is only special-cased for a few IDs).

import {useCallback, useEffect, useMemo, useState, type MouseEvent} from 'react';
import {createPortal} from 'react-dom';

declare global {
  interface Window {
    saleassist?: {
      mountWidget: (args: {
        id: string;
        form_factor?: 'button';
        parentElementId?: string;
      }) => void;
    };
  }
}

type SaleAssistButtonProps = {
  widgetId?: string | null;
  label?: string;
  variant?: 'pdp' | 'sticky';
};

function widgetDomSelector(widgetId: string) {
  return `#saleassist-widget-${CSS.escape(widgetId)}`;
}

function reparentSaleAssistWidgetToBody(widgetId: string) {
  const root = document.querySelector(widgetDomSelector(widgetId));
  if (root instanceof HTMLElement) {
    document.body.appendChild(root);
    root.classList.remove('saleassist-widget-in-modal');
  }
}

export function SaleAssistButton({widgetId, label = 'Live Demo', variant = 'pdp'}: SaleAssistButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mountPending, setMountPending] = useState(false);

  const captureElId = useMemo(
    () => `saleassist-modal-capture-${variant}-${widgetId?.replace(/\W+/g, '') || 'x'}`,
    [variant, widgetId],
  );

  const closeModal = useCallback(() => {
    if (widgetId) reparentSaleAssistWidgetToBody(widgetId);
    setModalOpen(false);
  }, [widgetId]);

  useEffect(() => {
    if (!widgetId) return;

    const checkAvailability = () => {
      if (window.saleassist?.mountWidget) setError(null);
    };

    checkAvailability();
    const intervalId = window.setInterval(checkAvailability, 300);
    const timeoutId = window.setTimeout(() => {
      if (!window.saleassist?.mountWidget) {
        setError('SaleAssist API not available');
      }
      window.clearInterval(intervalId);
    }, 8000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [widgetId]);

  useEffect(() => {
    if (!modalOpen || !widgetId) {
      setMountPending(false);
      return undefined;
    }

    setMountPending(true);
    let alive = true;
    const selector = widgetDomSelector(widgetId);

    const relocate = () => {
      if (!alive) return false;
      const root = document.querySelector(selector);
      const capture = document.getElementById(captureElId);
      if (!(root instanceof HTMLElement && capture instanceof HTMLElement)) return false;
      if (!capture.contains(root)) capture.appendChild(root);
      root.classList.add('saleassist-widget-in-modal');
      return true;
    };

    queueMicrotask(() => {
      if (!alive || !widgetId || !window.saleassist?.mountWidget) return;
      window.saleassist.mountWidget({
        id: widgetId,
        form_factor: 'button',
      });
    });

    const poll = window.setInterval(() => {
      if (!alive) return;
      if (relocate()) {
        setMountPending(false);
      }
    }, 100);

    const stopPending = window.setTimeout(() => {
      setMountPending(false);
    }, 2000);

    const expire = window.setTimeout(() => {
      alive = false;
      window.clearInterval(poll);
    }, 20000);

    return () => {
      alive = false;
      window.clearInterval(poll);
      window.clearTimeout(stopPending);
      window.clearTimeout(expire);
      setMountPending(false);
    };
  }, [modalOpen, widgetId, captureElId]);

  useEffect(() => {
    if (!modalOpen) return undefined;

    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [modalOpen, closeModal]);

  function handleOpen(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (!widgetId) return;
    if (!window.saleassist?.mountWidget) {
      console.warn('SaleAssist API is unavailable');
      return;
    }
    setModalOpen(true);
  }

  const modalPortal =
    modalOpen &&
    typeof document !== 'undefined' &&
    widgetId &&
    createPortal(
      <div
        className="saleassist-pdp-modal-backdrop"
        role="presentation"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div
          className="saleassist-pdp-modal-shell"
          role="dialog"
          aria-modal="true"
          aria-labelledby="saleassist-pdp-modal-title"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <header className="saleassist-pdp-modal-header">
            <h2 id="saleassist-pdp-modal-title" className="saleassist-pdp-modal-title">
              {label}
            </h2>
            <button
              type="button"
              className="saleassist-pdp-modal-close"
              onClick={closeModal}
              aria-label="Close live demo"
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>
          <div className="saleassist-pdp-modal-mount-wrap">
            {mountPending ? (
              <p className="saleassist-pdp-modal-loading" role="status">
                Loading live demo…
              </p>
            ) : null}
            <div id={captureElId} className="saleassist-pdp-modal-mount" />
          </div>
        </div>
      </div>,
      document.body,
    );

  if (!widgetId) return null;

  const pdpClasses =
    'border border-[#cf254a] text-[#cf254a] rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-[#f4cfd3] cursor-pointer uppercase font-sans';

  const trigger = (
    <button
      type="button"
      className={variant === 'pdp' ? pdpClasses : 'saleassist-sticky-btn'}
      onClick={handleOpen}
      disabled={false}
      aria-label="Start live demo video call"
      aria-haspopup="dialog"
      aria-expanded={modalOpen}
      data-saleassist-button="true"
      title={error ? 'Unable to load SaleAssist script. Check blockers/CSP.' : undefined}
    >
      {variant === 'sticky' ? (
        <>
          <span className="saleassist-sticky-btn__dot" aria-hidden="true" />
          {label}
        </>
      ) : (
        label
      )}
    </button>
  );

  return (
    <>
      {modalPortal}
      {variant === 'sticky' ? <div className="saleassist-sticky-footer">{trigger}</div> : trigger}
    </>
  );
}
