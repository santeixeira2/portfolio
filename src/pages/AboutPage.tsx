import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { ScrollVideo } from '../components/ScrollVideo/ScrollVideo';
import { useState, useEffect } from 'react';

function TypewriterTitle({ line1, line2 }: { line1: string, line2: string }) {
  const [displayed1, setDisplayed1] = useState('');
  const [displayed2, setDisplayed2] = useState('');

  useEffect(() => {
    let timeoutId: number;
    let i = 0;
    let j = 0;

    setDisplayed1('');
    setDisplayed2('');

    const typeWriter = () => {
      if (i < line1.length) {
        i++;
        setDisplayed1(line1.slice(0, i));
        timeoutId = window.setTimeout(typeWriter, 50);
      } else if (j < line2.length) {
        j++;
        setDisplayed2(line2.slice(0, j));
        timeoutId = window.setTimeout(typeWriter, 50);
      }
    };

    // slight delay before starting to type
    timeoutId = window.setTimeout(typeWriter, 150);

    return () => window.clearTimeout(timeoutId);
  }, [line1, line2]);

  return (
    <h1 className="about-page__hero-title">
      {displayed1}
      {line1.length > 0 && <br />}
      {displayed2}
      <span className="cursor">_</span>
    </h1>
  );
}

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
        <ScrollVideo>
          {(progress) => {
             let t1 = "Me chamo";
             let t2 = "San Thiago Teixeira.";
             if (progress >= 0.66) {
               t1 = "E eu resolvo";
               t2 = "o SEU problema.";
             } else if (progress >= 0.33) {
               t1 = "Sou engenheiro";
               t2 = "de software.";
             }
             
             return (
               <div className="about-page__hero-overlay">
                 <TypewriterTitle line1={t1} line2={t2} />
               </div>
             );
          }}
        </ScrollVideo>
      </div>

      <div className="about-page__split">
        <div className="about-page__split-top">
          <div className="container">
            <h1 className="about-page__split-header">Desenvolvimento Web</h1>
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
