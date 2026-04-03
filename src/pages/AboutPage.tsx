import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { ScrollVideo } from '../components/ScrollVideo/ScrollVideo';
import avatarImg from '../assets/images/avatar.png';
import cvPdf from '../assets/San_Thiago_Teixeira_CV_EN.docx (1).pdf';
import { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';

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

export default function AboutPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<'bio' | 'exp' | 'mobile' | 'web' | 'embedded'>('bio');

  const SECTIONS_METADATA = [
    { key: 'bio', id: '0x00', labelKey: 'quem_sou_eu' },
    { key: 'exp', id: '0x01', labelKey: 'experiencias' },
    { key: 'mobile', id: '0x02', labelKey: 'mobile_dev' },
    { key: 'web', id: '0x03', labelKey: 'web_apps' },
    { key: 'embedded', id: '0x04', labelKey: 'embedded_sys' },
  ] as const;

  return (
    <div className="about-page">
      <Navbar />

      <div className="about-page__hero">
        <ScrollVideo>
          {(progress) => {
            let t1 = t('navbar.me_chamo');
            let t2 = t('navbar.san_thiago');
            
            if (progress >= 0.66) {
              t1 = t('navbar.e_eu_resolvo');
              t2 = t('navbar.o_seu_problema');
            } else if (progress >= 0.33) {
              t1 = t('navbar.sou_engenheiro');
              t2 = t('navbar.de_software');
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
        <div className="about-page__split-bottom">
          <div className="container about-page__content-grid">
            <aside className="about-page__sidebar">
              <nav className="sidebar-nav">
                <div className="sidebar-header">{t('about.labels.navigation')}</div>
                <ul className="sidebar-list">
                  {SECTIONS_METADATA.map((section) => (
                    <li
                      key={section.key}
                      className={`sidebar-item ${activeSection === section.key ? 'active' : ''}`}
                      onClick={() => setActiveSection(section.key)}
                    >
                      <span className="sidebar-code">[{section.id}]</span> {t(`navbar.links.${section.labelKey}`)}
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="about-page__editorial-wrapper">
              <div className="about-page__photo-frame">
                <img src={avatarImg} alt="San Thiago Teixeira" className="about-page__full-photo" />
                <div className="photo-label">{t('about.labels.photo_label')}</div>
              </div>

              <div className="about-page__bio-overlay">
                <div className="bio-overlay__content transition-fade" key={activeSection}>
                  <p className="bio-lead">
                    {t(`about.sections.${activeSection}.title`)}
                  </p>
                  <div className="bio-text">
                    {activeSection === 'exp' ? (
                      <>
                        <p>
                          <Trans i18nKey="about.sections.exp.psi" components={[<strong />]} /><br/>
                          <Trans i18nKey="about.sections.exp.psi_desc" />
                        </p>
                        <p>
                          <Trans i18nKey="about.sections.exp.duko" components={[<strong />]} /><br/>
                          <Trans i18nKey="about.sections.exp.duko_desc" />
                        </p>
                        <p>
                          <Trans i18nKey="about.sections.exp.embrapii" components={[<strong />]} /><br/>
                          <Trans i18nKey="about.sections.exp.embrapii_desc" />
                        </p>
                        <p>
                          <Trans i18nKey="about.sections.exp.freelance" components={[<strong />]} /><br/>
                          <Trans i18nKey="about.sections.exp.freelance_desc" />
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <Trans i18nKey={`about.sections.${activeSection}.p1`} components={[<span className="highlight" />, <strong />]} />
                        </p>
                        <p>
                          <Trans i18nKey={`about.sections.${activeSection}.p2`} components={[<span className="highlight" />, <strong />, <br />]} />
                        </p>
                        <p>
                          <Trans i18nKey={`about.sections.${activeSection}.p3`} components={[<span className="highlight" />, <strong />]} />
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container about-page__actions">
            <a href={cvPdf} download="San_Thiago_Teixeira_CV.pdf" className="cv-download-btn">
              <span className="btn-icon">↓</span> {t('about.labels.download_cv')}
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
