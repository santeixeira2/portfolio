import { useEffect, useRef } from 'react';

interface ScrollVideoCanvasProps {
  totalFrames?: number;
  folder?: string;
  prefix?: string;
  extension?: string;
}

export function ScrollVideoCanvas({
  totalFrames = 150,
  folder = '/frames',
  prefix = 'frame_',
  extension = '.jpg',
}: ScrollVideoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Pad to 4 zero digits: frame_0001.jpg
      const frameNum = i.toString().padStart(4, '0');
      img.src = `${folder}/${prefix}${frameNum}${extension}`;
      images.push(img);
    }
    imagesRef.current = images;

    // Draw first frame when loaded
    images[0].onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Cover aspect ratio
        const imgAspect = images[0].width / images[0].height;
        const canvasAspect = canvas.width / canvas.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasAspect > imgAspect) {
          drawWidth = canvas.width;
          drawHeight = drawWidth / imgAspect;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = drawHeight * imgAspect;
          offsetX = (canvas.width - drawWidth) / 2;
        }
        ctx.drawImage(images[0], offsetX, offsetY, drawWidth, drawHeight);
      }
    };
  }, [totalFrames, folder, prefix, extension]);

  // Scroll listener logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // We tie the frames linearly to the first 100vh of scrolling past the header component
          const maxScroll = window.innerHeight;
          const scrollY = window.scrollY;
          
          let scrollFraction = scrollY / maxScroll;
          if (scrollFraction > 1) scrollFraction = 1;
          if (scrollFraction < 0) scrollFraction = 0;

          const frameIndex = Math.floor(scrollFraction * (totalFrames - 1));
          
          const img = imagesRef.current[frameIndex];
          if (img && img.complete && img.naturalHeight !== 0) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // object-fit: cover mapping
            const imgAspect = img.width / img.height;
            const canvasAspect = canvas.width / canvas.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasAspect > imgAspect) {
              drawWidth = canvas.width;
              drawHeight = drawWidth / imgAspect;
              offsetY = (canvas.height - drawHeight) / 2;
            } else {
              drawHeight = canvas.height;
              drawWidth = drawHeight * imgAspect;
              offsetX = (canvas.width - drawWidth) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [totalFrames]);

  return <canvas ref={canvasRef} />;
}
