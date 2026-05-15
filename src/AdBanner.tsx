import React, { useEffect, useRef } from 'react';

type AdFormat = 'leaderboard' | 'rectangle' | 'sidebar' | 'post-content';

interface AdBannerProps {
  format: AdFormat;
  slot: string; // TODO: substituir pelo data-ad-slot real do AdSense
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner: React.FC<AdBannerProps> = ({ format, slot, className = "" }) => {
  const adInitialized = useRef(false);

  useEffect(() => {
    // Evita erro no console durante desenvolvimento
    if (process.env.NODE_ENV === 'development') return;

    try {
      if (typeof window !== 'undefined' && !adInitialized.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adInitialized.current = true;
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  // Não renderiza em desenvolvimento
  if (process.env.NODE_ENV === 'development') return null;

  const getFormatStyles = () => {
    switch (format) {
      case 'leaderboard':
        return { 
          minHeight: '90px', 
          maxWidth: '728px', 
          display: 'block', 
          margin: '0 auto' 
        };
      case 'rectangle':
        return { 
          minHeight: '250px', 
          maxWidth: '300px', 
          display: 'block', 
          margin: '0 auto' 
        };
      case 'sidebar':
        return { 
          minHeight: '600px', 
          maxWidth: '300px', 
          display: 'block' 
        };
      case 'post-content':
        return { 
          minHeight: '280px', 
          maxWidth: '336px', 
          display: 'block', 
          margin: '0 auto' 
        };
      default:
        return {};
    }
  };

  const isResponsive = format === 'rectangle' || format === 'post-content';

  return (
    <div 
      className={`adsbygoogle-container ${className}`} 
      role="complementary" 
      aria-label="Anúncio publicitário"
    >
      <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 text-center font-medium">
        Publicidade
      </div>
      <ins 
        className="adsbygoogle"
        style={getFormatStyles()}
        data-ad-client="ca-pub-1175286466704578"
        data-ad-slot={slot}
        data-ad-format={isResponsive ? "auto" : undefined}
        data-full-width-responsive={isResponsive ? "true" : undefined}
      ></ins>
    </div>
  );
};

export default AdBanner;
