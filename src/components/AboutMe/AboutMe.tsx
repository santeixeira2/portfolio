import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fluxaAiImg from '../../assets/images/fluxa_ai_app.png';
import sorriaAiImg from '../../assets/images/sorria_ai_app.png';
import { MacScene } from './MacScene';
import { SectionGlow } from '../SectionGlow/SectionGlow';

export function AboutMe() {
  const [currentSlide, setCurrentSlide] = useState(0);

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

          <div className="about__mac-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div className="about__mac" style={{ width: '100%', maxWidth: '1200px', height: '50vh', minHeight: '500px', filter: 'none', background: 'transparent' }}>
              <MacScene imageUrl={projects[currentSlide].image} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
