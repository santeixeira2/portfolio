import { useEffect, useRef, ReactNode, useState } from 'react';
import videoSrc from '../../assets/Programador_toma_café_vídeo_pronto_intra.mp4';

interface ScrollVideoProps {
  children?: ((progress: number) => ReactNode) | ReactNode;
}

export function ScrollVideo({ children }: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progressState, setProgressState] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current || !videoRef.current) {
            ticking = false;
            return;
          }
          
          const containerTop = containerRef.current.offsetTop;
          const containerHeight = containerRef.current.offsetHeight;
          const windowScrollY = window.scrollY;
          
          // Distance needed to scroll to see the entire video minus the initial screen height lock
          const maxScrollDist = containerHeight - window.innerHeight;
          let rawProgress = (windowScrollY - containerTop) / maxScrollDist;
          
          // Clamp progress strictly bounding 0 -> 1
          const progress = Math.max(0, Math.min(1, rawProgress));
          
          const duration = videoRef.current.duration;
          if (duration && !isNaN(duration)) {
            videoRef.current.currentTime = duration * progress;
          }
          
          setProgressState((prev) => {
             const currentPhase = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
             const prevPhase = prev < 0.33 ? 0 : prev < 0.66 ? 1 : 2;
             if (currentPhase !== prevPhase) {
               return progress;
             }
             return prev;
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Make sure we load enough video to get duration metadata
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', handleScroll);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleScroll);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: '400vh', width: '100%', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
        <video 
          ref={videoRef} 
          src={videoSrc} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          muted 
          playsInline 
          disablePictureInPicture
          preload="auto"
        />
        {/* Dark Shadowing Overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 5 }} />
        
        {/* Render children overlays dynamically mapped on top of the pinned video */}
        {children && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
            {typeof children === 'function' ? children(progressState) : children}
          </div>
        )}
      </div>
    </div>
  );
}
