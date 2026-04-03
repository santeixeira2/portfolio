import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('footer.columns.contacts.title'),
      links: [
        t('footer.columns.contacts.email'),
        t('footer.columns.contacts.whatsapp'),
        t('footer.columns.contacts.linkedin'),
        t('footer.columns.contacts.github'),
        t('footer.columns.contacts.instagram')
      ],
    },
    {
      title: t('footer.columns.portfolio.title'),
      links: [
        t('footer.columns.portfolio.presentation'),
        t('footer.columns.portfolio.resume'),
        t('footer.columns.portfolio.apps'),
        t('footer.columns.portfolio.certificates')
      ],
    },
    {
      title: 'Projeto Minerva',
      links: [
        'Estudos com Pomodoro',
        'Estudos com Rubber Duck',
        'Artigos e Documentações',
        'Notícias',
      ],
    },
    {
      title: t('footer.columns.policies.title'),
      links: [t('footer.columns.policies.terms')],
    },
  ];

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          {columns.map((col) => (
            <div key={col.title} className="animate-on-scroll">
              <h4 className="footer__col-title">{col.title}</h4>
              <ul className="footer__col-list">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer__col-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} San Thiago Teixeira — {t('footer.description')}
          </p>
        </div>
      </div>
    </footer>
  );
}
