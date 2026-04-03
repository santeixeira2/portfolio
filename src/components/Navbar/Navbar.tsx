import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];

  const links = [
    { label: 'Página Inicial', to: '/#hero' },
    { label: 'Sobre mim', to: '/sobre-mim' },
    { label: 'Projetos', to: '/#projetos' },
    { label: 'Minerva?', to: '/#footer' },
  ];

  const handleNav = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (to.startsWith('/#')) {
      const id = to.replace('/', '');
      if (location.pathname === '/') {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(to);
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="navbar__inner">
          <a
            href="/#hero"
            className="navbar__logo"
            onClick={(e) => handleNav(e, '/#hero')}
          >
            <span className="navbar__logo-icon">E</span>
          </a>

          <div className="navbar__links">
            {links.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className={`navbar__link ${location.pathname === link.to ? 'active' : ''}`}
                onClick={(e) => handleNav(e, link.to)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="navbar__language-switcher font-mono-consolas">
            {languages.map((lang, idx) => (
              <span key={lang.code} className="lang-item">
                <button
                  className={`lang-btn ${i18n.language.startsWith(lang.code) ? 'active' : ''}`}
                  onClick={() => i18n.changeLanguage(lang.code)}
                >
                  {lang.label}
                </button>
                {idx < languages.length - 1 && <span className="lang-divider">/</span>}
              </span>
            ))}
          </div>

          <button
            className={`navbar__hamburger ${mobileOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            id="menu-toggle"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile ${mobileOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <a
            key={link.to}
            href={link.to}
            className={`navbar__link ${location.pathname === link.to ? 'active' : ''}`}
            onClick={(e) => handleNav(e, link.to)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
