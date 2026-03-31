import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Navbar } from '../components/Navbar/Navbar';
import { Hero } from '../components/Hero/Hero';
import { Welcome } from '../components/Welcome/Welcome';
import { MultilingualBar } from '../components/MultilingualBar/MultilingualBar';
import { HomeProjects } from '../components/HomeProjects/HomeProjects';
import { News } from '../components/News/News';
import { Footer } from '../components/Footer/Footer';

export default function HomePage() {
  useScrollAnimation();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Welcome />
        <MultilingualBar />
        <HomeProjects />
        <News />
      </main>
      <Footer />
    </>
  );
}
