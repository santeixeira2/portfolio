import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { ScrollVideoCanvas } from '../components/ScrollVideo/ScrollVideoCanvas';

const ReactIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
  </svg>
);

const LeafIcon = () => (
  // using lucide-react equivalent for spring boot representation
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9 9V2a7 7 0 0 1 7 7v7" />
    <path d="M11 20A7 7 0 0 0 9 9h9" />
  </svg>
);

const CoffeeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

export default function AboutPage() {
  return (
    <div className="about-page">
      <Navbar />

      <div className="about-page__hero">
        <div className="about-page__hero-canvas">
          <ScrollVideoCanvas />
        </div>
        <div className="about-page__hero-overlay">
          <h1 className="about-page__hero-title">Me conheça<br />melhor</h1>
        </div>
      </div>

      <div className="about-page__split">
        <div className="about-page__split-top">
          <div className="container">
            <h1 className="about-page__split-header">Sobre mim.</h1>
            <div className="about-page__tech-stack">
              <div className="about-page__tech-icon"><LeafIcon /></div>
              <div className="about-page__tech-icon"><CoffeeIcon /></div>
              <div className="about-page__tech-icon" style={{color: '#61dafb'}}><ReactIcon /></div>
              <div className="about-page__tech-icon" style={{color: '#3178c6', fontWeight: 900, fontFamily: 'sans-serif'}}>TS</div>
              <div className="about-page__tech-icon" style={{color: '#f7df1e', fontWeight: 900, fontFamily: 'sans-serif'}}>JS</div>
            </div>
          </div>
        </div>

        <div className="about-page__split-bottom">
          <div className="container about-page__content">
            <div className="about-page__avatar">
              {/* Avatar image will go here, currently a gray circle placeholder in CSS */}
            </div>
            <div className="about-page__bio">
              <p>
                Sou um programador, amante do progresso e admirador de muitos esportistas,
                pois neles, vejo a vontade de sempre melhorar. Hoje sou estudante de Ciência da
                Computação no Instituto Federal do Ceará. Almejo a consistência nos estudos,
                na academia (tanto física quanto institucional) e na vida.
              </p>
              <p>
                Vim da engenharia, onde cursei durante 2 anos e meio Engenharia Metalúrgica e
                um ano Engenharia Mecânica. Não me considero um profissional que mudou de
                carreira, mas que se encontrou dentro do desenvolvimento de softwares, onde
                contarei como:
              </p>
              <p>
                Dentro da universidade Federal do Ceará, participei de um projeto de extensão
                chamado Avoante Aeromec Aerodesign, onde fui líder do subsistema de Cargas
                e Aeroelasticidade, o que me fez aprimorar diversas qualidades em Soft-skills,
                como trabalhar em equipe dentro de metodologias ageis, lidar com dead-lines e
                principalmente a coordenar um time para um fim comum.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
