export function Footer() {
  const columns = [
    {
      title: 'Contatos',
      links: ['Email', 'Whatsapp', 'LinkedIn', 'Github', 'Instagram'],
    },
    {
      title: 'Portifólio',
      links: ['Apresentação', 'Currículo', 'Aplicações', 'Certificados'],
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
      title: 'Políticas',
      links: ['Termos de Uso'],
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
            © {new Date().getFullYear()} San Thiago Teixeira — Indigo Dev
          </p>
        </div>
      </div>
    </footer>
  );
}
