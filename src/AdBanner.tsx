import React, { useEffect, useRef } from 'react';

type AdFormat = 'leaderboard' | 'rectangle' | 'sidebar' | 'post-content';

interface AdBannerProps {
  format: AdFormat;
  slot: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AdBanner: React.FC<AdBannerProps> = ({ format, slot, className = '' }) => {
  const adRef = useRef<HTMLModElement>(null);
  const adInitialized = useRef(false);

  // Vite usa import.meta.env.DEV, não process.env.NODE_ENV
  if (import.meta.env.DEV) return null;

  useEffect(() => {
    if (adInitialized.current) return;
    // Aguarda o elemento ter largura real antes de fazer push
    const el = adRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && !adInitialized.current) {
          adInitialized.current = true;
          observer.disconnect();
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {
            console.error('AdSense error:', e);
          }
        }
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getMinHeight = () => {
    switch (format) {
      case 'leaderboard':  return '90px';
      case 'rectangle':    return '250px';
      case 'sidebar':      return '600px';
      case 'post-content': return '280px';
      default:             return '90px';
    }
  };

  const isResponsive = format === 'rectangle' || format === 'post-content' || format === 'leaderboard';

  return (
    <div
      className={`adsbygoogle-container w-full ${className}`}
      role="complementary"
      aria-label="Anúncio publicitário"
    >
      <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1 text-center font-medium">
        Publicidade
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          minHeight: getMinHeight(),
          width: '100%',
        }}
        data-ad-client="ca-pub-1175286466704578"
        data-ad-slot={slot}
        data-ad-format={isResponsive ? 'auto' : undefined}
        data-full-width-responsive={isResponsive ? 'true' : undefined}
      />
    </div>
  );
};

export default AdBanner;
