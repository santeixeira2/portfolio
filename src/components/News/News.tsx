import { useTranslation } from 'react-i18next';
import reactNativeImg from '../../assets/images/article-react-native.png';
import cleanCodeImg from '../../assets/images/article-clean-code.png';
import { SectionGlow } from '../SectionGlow/SectionGlow';

export function News() {
  const { t } = useTranslation();

  const articles = [
    {
      image: reactNativeImg,
      title: t('home.news.articles.mobile.title'),
      desc: t('home.news.articles.mobile.desc'),
      tag: t('home.news.articles.mobile.tag'),
    },
    {
      image: cleanCodeImg,
      title: t('home.news.articles.clean_code.title'),
      desc: t('home.news.articles.clean_code.desc'),
      tag: t('home.news.articles.clean_code.tag'),
    },
  ];

  return (
    <section className="news" id="news">
      <SectionGlow />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="news__header animate-on-scroll">{t('home.news.title')}</h2>

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
          <a href="#" className="news__cta">{t('home.news.cta')}</a>
        </div>
      </div>
    </section>
  );
}
