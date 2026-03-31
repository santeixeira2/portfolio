import reactNativeImg from '../../assets/images/article-react-native.png';
import cleanCodeImg from '../../assets/images/article-clean-code.png';
import { SectionGlow } from '../SectionGlow/SectionGlow';

export function News() {
  const articles = [
    {
      image: reactNativeImg,
      title: 'React Native: Futuro do Mobile',
      desc: 'Default Description',
      tag: 'Mobile',
    },
    {
      image: cleanCodeImg,
      title: 'Código Limpo, assim como você',
      desc: 'Por que estamos falando tanto sobre código limpo (Clean Code) e por que isto é tão importante para nós? De fato a manutenção de um software é tão importante quanto sua construção.',
      tag: 'Tag',
    },
  ];

  return (
    <section className="news" id="news">
      <SectionGlow />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="news__header animate-on-scroll">&lt;Novidades /&gt;</h2>

        <div className="news__grid">
          {articles.map((article, i) => (
            <div className={`news__card animate-on-scroll delay-${i + 1}`} key={i}>
              <div className="news__card-image">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="news__card-body">
                <h3 className="news__card-title">{article.title}</h3>
                <p className="news__card-desc">{article.desc}</p>
                <span className="news__tag">{article.tag}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="news__cta-wrapper animate-on-scroll delay-3">
          <a href="#" className="news__cta">Próximo</a>
        </div>
      </div>
    </section>
  );
}
