import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  const prev = () => setCurrentSlide((s) => (s === 0 ? projects.length - 1 : s - 1));
  const next = () => setCurrentSlide((s) => (s === projects.length - 1 ? 0 : s + 1));

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

        <div className="about__grid">
          <div className="about__mac-wrapper animate-on-scroll delay-1">
            <div className="about__mac" style={{ width: '100%', height: '400px', filter: 'none', background: 'transparent' }}>
              <MacScene />
            </div>
          </div>

          <div className="about__info animate-on-scroll delay-2">
            <p className="about__bio">
              Bem-vindo à área de projetos e desenvolvimento do Indigo. Aqui
              você encontrará uma coleção dos meus experimentos criativos e 
              produtos em MVP, demonstrando a evolução das minhas stacks e 
              propostas de interfaces modernas.
            </p>

            <div className="about__carousel">
              <div
                className="about__carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {projects.map((project, i) => (
                  <div className="about__carousel-slide" key={i}>
                    <img src={project.image} alt={project.label} />
                    <div className="about__carousel-label">{project.label}</div>
                  </div>
                ))}
              </div>

              <button
                className="about__carousel-btn about__carousel-btn--prev"
                onClick={prev}
                aria-label="Previous project"
                id="carousel-prev"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                className="about__carousel-btn about__carousel-btn--next"
                onClick={next}
                aria-label="Next project"
                id="carousel-next"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
