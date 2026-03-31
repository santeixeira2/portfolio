import { Button } from '../Button/Button';

export function Welcome() {
  const getTimeWord = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'manhã';
    if (hour >= 12 && hour < 18) return 'tarde';
    return 'noite';
  };

  return (
    <section className="welcome" id="welcome">
      <div className="container">
        <div className="welcome__content animate-on-scroll">
          <h2 className="welcome__greeting">Bem vindos, Indigo Dev.</h2>
          <p className="welcome__dynamic">
            Essa é uma ótima{' '}
            <span className="welcome__time-word">{getTimeWord()}</span>{' '}
            para estudar? Fica de olho nas novas.
          </p>
          <p className="welcome__text">
            Desejo-te boas vindas à minha humilde casa virtual, onde deixo todas as minhas
            evoluções como programador, desde portfólio a artigos científicos das mais
            diversas áreas. Programação, matemática, física, dicas que posso oferecer,
            até mesmo pitacos em aeronáutica.
          </p>
          <p className="welcome__text">
            Aqui você pode também organizar suas horas de estudos, com metodologias de
            estudos rápido, como pomodoro, listagem de categorias e afins. Dá uma
            conferida, colega!
          </p>
          <Button 
            href="#projetos" 
            className="welcome__cta" 
            smoothScrollTarget="#projetos"
          >
            Começar
          </Button>
        </div>
      </div>
    </section>
  );
}
