import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import fluxaAiImg from '../../assets/images/fluxa_ai_app.png';
import sorriaAiImg from '../../assets/images/sorria_ai_app.png';
import { IphoneScene } from './IphoneScene';
import { Button } from '../Button/Button';
import { MacScene } from './MacScene';
import { SectionGlow } from '../SectionGlow/SectionGlow';

export function HomeProjects() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeDevice, setActiveDevice] = useState<'mac' | 'iphone'>('mac');

  const projects = [
    { image: fluxaAiImg, label: 'Fluxa AI' },
    { image: sorriaAiImg, label: 'Sorria AI' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="about" id="projetos">
      <SectionGlow />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="about__header animate-on-scroll" style={{textAlign: 'center', marginBottom: 'var(--space-12)'}}>
          <Link to="/projetos" style={{
            color: 'var(--accent)',
            textDecoration: 'none',
            fontSize: 'var(--fs-xxl)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 'var(--fw-bold)'
          }}>
            &lt;Projetos /&gt;
          </Link>
        </div>

        <div className="about__centered-layout animate-on-scroll delay-1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', margin: '0 auto' }}>
          <p className="about__bio" style={{ fontSize: '1.3rem', marginBottom: 'var(--space-12)', fontWeight: '300', maxWidth: '900px', margin: '0 auto 4rem auto' }}>
            Bem-vindo à área de projetos e desenvolvimento do Indigo. Aqui
            você encontrará uma coleção dos meus experimentos criativos e 
            produtos em MVP, demonstrando a evolução das minhas stacks e 
            propostas de interfaces modernas.
          </p>

          <div className="about__mac-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="about__mac" style={{ width: '100%', maxWidth: '1200px', height: '50vh', minHeight: '500px', filter: 'none', background: 'transparent', position: 'relative' }}>
              
              <button 
                onClick={() => setActiveDevice('mac')} 
                style={{ 
                  position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                  background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%',
                  color: activeDevice === 'mac' ? 'var(--accent)' : 'var(--text-muted)', 
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', transition: 'all 0.3s ease'
                }}
                aria-label="View Macintosh Model"
              >
                <ChevronLeft size={24} />
              </button>

              {activeDevice === 'mac' ? (
                <MacScene imageUrl={projects[currentSlide].image} />
              ) : (
                <IphoneScene imageUrl={projects[currentSlide].image} />
              )}

              <button 
                onClick={() => setActiveDevice('iphone')} 
                style={{ 
                  position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                  background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%',
                  color: activeDevice === 'iphone' ? 'var(--accent)' : 'var(--text-muted)', 
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', transition: 'all 0.3s ease'
                }}
                aria-label="View iPhone Model"
              >
                <ChevronRight size={24} />
              </button>

            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 'var(--space-8)' }}>
              <Button href="/projetos" className="welcome__cta">
                Confira
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
