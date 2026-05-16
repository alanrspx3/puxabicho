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

const formatConfig: Record<AdFormat, { minHeight: string; maxWidth: string }> = {
  leaderboard:  { minHeight: '90px',  maxWidth: '728px' },
  rectangle:    { minHeight: '250px', maxWidth: '300px' },
  sidebar:      { minHeight: '600px', maxWidth: '300px' },
  'post-content': { minHeight: '280px', maxWidth: '336px' },
};

const AdBanner: React.FC<AdBannerProps> = ({ format, slot, className = '' }) => {
  const adRef = useRef<HTMLModElement>(null);
  const adInitialized = useRef(false);

  if (import.meta.env.DEV) return null;

  useEffect(() => {
    if (adInitialized.current) return;
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

  const { minHeight, maxWidth } = formatConfig[format];
  const isResponsive = format === 'rectangle' || format === 'post-content' || format === 'leaderboard';

  return (
    // Wrapper externo: ocupa 100% mas centraliza o bloco interno
    <div
      className={`adsbygoogle-container w-full py-2 ${className}`}
      role="complementary"
      aria-label="Anúncio publicitário"
    >
      <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1 text-center font-medium">
        Publicidade
      </span>
      {/* Bloco interno com maxWidth centralizado via mx-auto */}
      <div
        style={{ maxWidth, margin: '0 auto', width: '100%' }}
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: 'block',
            minHeight,
            width: '100%',
          }}
          data-ad-client="ca-pub-1175286466704578"
          data-ad-slot={slot}
          data-ad-format={isResponsive ? 'auto' : undefined}
          data-full-width-responsive={isResponsive ? 'true' : undefined}
        />
      </div>
    </div>
  );
};

export default AdBanner;
