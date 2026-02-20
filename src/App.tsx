import { HeroSection } from './components/features/HeroSection';
import { MapSection } from './components/features/MapSection';
import { RsvpForm } from './components/features/RsvpForm';
import { GiftSection } from './components/features/GiftSection';
import { MusicPlayer } from './components/features/MusicPlayer';
import { GallerySection } from './components/features/GallerySection';
import { TimelineSection } from './components/features/TimelineSection';
import { FloatingWishes } from './components/features/FloatingWishes';
import { OpeningSection } from './components/features/OpeningSection';

function App() {
  return (
    <div className="min-h-screen bg-neutral font-sans selection:bg-primary/20 overflow-x-hidden max-w-[100vw]">
      <MusicPlayer />
      <FloatingWishes />

      <main>
        <OpeningSection id="opening-section" />
        <HeroSection />
        <TimelineSection />

        {/* About Section / Story could go here using Section component */}

        <GallerySection />

        <MapSection />
        <RsvpForm />
      </main>

      <footer className="py-6 px-4 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <GiftSection />
        </div>
      </footer>
    </div>
  )
}

export default App
