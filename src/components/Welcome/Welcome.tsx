import { Button } from '../Button/Button';
import { useTranslation } from 'react-i18next';

export function Welcome() {
  const { t } = useTranslation();

  const getTimeWord = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t('home.welcome.times.morning');
    if (hour >= 12 && hour < 18) return t('home.welcome.times.afternoon');
    return t('home.welcome.times.evening');
  };

  return (
    <section className="welcome" id="welcome">
      <div className="container">
        <div className="welcome__content animate-on-scroll">
          <h2 className="welcome__greeting">{t('home.welcome.greeting')}</h2>
          <p className="welcome__dynamic">
            {t('home.welcome.time_intro')}
            <span className="welcome__time-word">{getTimeWord()}</span>
            {t('home.welcome.time_outro')}
          </p>
          <p className="welcome__text">
            {t('home.welcome.p1')}
          </p>
          <p className="welcome__text">
            {t('home.welcome.p2')}
          </p>
          <Button 
            href="#projetos" 
            className="welcome__cta" 
            smoothScrollTarget="#projetos"
          >
            {t('home.welcome.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}
