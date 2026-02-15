import { HeroSection } from './components/features/HeroSection';
import { MapSection } from './components/features/MapSection';
import { RsvpForm } from './components/features/RsvpForm';
import { MusicPlayer } from './components/features/MusicPlayer';
import { GallerySection } from './components/features/GallerySection';
import { TimelineSection } from './components/features/TimelineSection';

function App() {
  return (
    <div className="min-h-screen bg-neutral font-sans selection:bg-primary/30">
      <MusicPlayer />

      <main>
        <HeroSection />
        <TimelineSection />

        {/* About Section / Story could go here using Section component */}

        <GallerySection />

        <MapSection />

        <RsvpForm />
      </main>

      <footer className="py-8 text-center text-text-main/60 text-sm bg-neutral">
        <p className="font-display text-xl mb-2">Đức & Tuyên</p>
        <p>© 2026 Wedding Website</p>
      </footer>
    </div>
  )
}

export default App
