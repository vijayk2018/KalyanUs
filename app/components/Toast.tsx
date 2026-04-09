import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
  className?: string;
  setIsOverlay?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 4000,
  onClose,
  className = '',
  setIsOverlay
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const onCloseRef = useRef(onClose);

  // Update the ref when onClose changes
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (message) {
      setIsOverlay?.(true);
    }
  }, [message, setIsOverlay])

  useEffect(() => {
    // Start animation immediately to ensure toast is visible
    setIsAnimating(true);

    // Progress bar animation (left to right)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 50));
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 50);

    const hideTimer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
        setIsOverlay?.(false);
        setTimeout(() => onCloseRef.current?.(), 100);
      }, 300);
    }, duration);

    return () => {
      clearTimeout(hideTimer);
      clearInterval(progressInterval);
    };
  }, [duration, setIsOverlay]);

  const getToastStyles = () => {
    const baseStyles = `max-w-sm w-80 bg-white rounded-lg shadow-2xl border p-4 transition-all duration-500 ease-out ${isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'
      }`;

    switch (type) {
      case 'success':
        return `${baseStyles} border-green-300 bg-white shadow-green-200/30`;
      case 'error':
        return `${baseStyles} border-red-300 bg-white shadow-red-200/30`;
      case 'warning':
        return `${baseStyles} border-yellow-300 bg-white shadow-yellow-200/30`;
      case 'info':
        return `${baseStyles} border-blue-300 bg-white shadow-blue-200/30`;
      default:
        return baseStyles;
    }
  };

  const getIconStyles = () => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100 p-2 rounded-full';
      case 'error':
        return 'text-red-600 bg-red-100 p-2 rounded-full';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 p-2 rounded-full';
      case 'info':
        return 'text-blue-600 bg-blue-100 p-2 rounded-full';
      default:
        return 'text-gray-600 bg-gray-100 p-2 rounded-full';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className={cn(getToastStyles(), className)}>
          <div className="flex items-start gap-3">
            <div className={cn('flex-shrink-0 mt-0.5', getIconStyles())}>
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 font-sans leading-relaxed line-clamp-2">
                {message.length > 100 ? `${message.substring(0, 100)}...` : message}
              </p>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setIsOverlay?.(false);
                setTimeout(() => onCloseRef.current?.(), 300);
              }}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
              className={`h-1 rounded-full transition-all duration-100 ease-linear ${type === 'success' ? 'bg-green-500' :
                  type === 'error' ? 'bg-red-500' :
                    type === 'warning' ? 'bg-yellow-500' :
                      type === 'info' ? 'bg-blue-500' : 'bg-blue-500'
                }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
    </>
  );
};

// Toast Container Component
export interface ToastContainerProps {
  toasts: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
  }>;
  onRemoveToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemoveToast,
}) => {
  const [isOverlay, setIsOverlay] = useState(false);
  const hasNonErrorToast = toasts.some(t => t.type !== "error");

  // Don't render if no toasts
  if (toasts.length === 0) {
    return null;
  }

  return (
    <>
      {/* {hasNonErrorToast && isOverlay &&
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 pointer-events-none"></div>} */}
      <div className="fixed bottom-4 right-4 z-[10000] space-y-3">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="transform transition-all duration-300 ease-in-out"
            style={{
              transform: `translateY(${index * -8}px)`,
              zIndex: 50 - index
            }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration || 10000} // Default 10 seconds (10000ms)
              onClose={() => onRemoveToast(toast.id)}
              setIsOverlay={setIsOverlay}
            />
          </div>
        ))}
      </div>
    </>
  );
};
