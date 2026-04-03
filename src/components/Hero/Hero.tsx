import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import heroSculptureImg from '../../assets/images/hero-sculpture.png';

export function Hero() {
  const { t } = useTranslation();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <img 
          src={heroSculptureImg} 
          alt="Classical Sculpture" 
          style={{ transform: `translateY(${offsetY * 0.4}px)` }} 
        />
        <div className="crt-overlay" />
      </div>
      <div className="hero__content">
        <h1 className="hero__title">
          <span className="hero__title-line">{t('home.hero.line1')}</span>
          <span className="hero__title-line" style={{ animationDelay: '300ms' }}>
            {t('home.hero.line2')}
          </span>
        </h1>
        <p className="hero__subtitle" />
        <p className="hero__author">{t('home.hero.author')}</p>
      </div>
    </section>
  );
}
