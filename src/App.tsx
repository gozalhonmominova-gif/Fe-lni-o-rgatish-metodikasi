import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MascotFelbek } from './components/MascotFe\'lbek';
import { AiUstozModal } from './components/AiUstozModal';
import { BadgeModal } from './components/BadgeModal';
import { HomePage } from './pages/HomePage';
import { LearningPathPage } from './pages/LearningPathPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';
import { GameZonePage } from './pages/GameZonePage';
import { TestCenterPage } from './pages/TestCenterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CertificatePage } from './pages/CertificatePage';
import { ToolboxPage } from './pages/ToolboxPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { modulesData } from './data/modulesData';

const MainApp: React.FC = () => {
  const { newlyUnlockedBadge, clearNewBadge } = useApp();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState<boolean>(false);

  const handleOpenModule = (moduleId: number) => {
    setActiveModuleId(moduleId);
    setCurrentTab('module-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGame = (gameId: string) => {
    setActiveGameId(gameId);
    setCurrentTab('games');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeModule = modulesData.find((m) => m.id === activeModuleId) || modulesData[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'module-detail') setActiveModuleId(null);
          if (tab !== 'games') setActiveGameId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openAiTutor={() => setIsAiTutorOpen(true)}
      />

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentTab === 'home' && (
          <HomePage
            setCurrentTab={setCurrentTab}
            openModule={handleOpenModule}
            openAiTutor={() => setIsAiTutorOpen(true)}
          />
        )}

        {currentTab === 'roadmap' && (
          <LearningPathPage
            openModule={handleOpenModule}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'module-detail' && (
          <ModuleDetailPage
            module={activeModule}
            onBack={() => setCurrentTab('roadmap')}
            openGame={handleOpenGame}
            openNextModule={(nextId) => handleOpenModule(nextId)}
          />
        )}

        {currentTab === 'games' && (
          <GameZonePage
            initialActiveGame={activeGameId}
            onClearActiveGame={() => setActiveGameId(null)}
          />
        )}

        {currentTab === 'tests' && (
          <TestCenterPage
            setCurrentTab={setCurrentTab}
            openModule={handleOpenModule}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            setCurrentTab={setCurrentTab}
            openModule={handleOpenModule}
          />
        )}

        {currentTab === 'certificate' && (
          <CertificatePage setCurrentTab={setCurrentTab} />
        )}

        {currentTab === 'toolbox' && <ToolboxPage />}

        {currentTab === 'resources' && <ResourcesPage />}
      </main>

      {/* Footer */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* Floating Interactive Mascot Fe'lbek */}
      <MascotFelbek />

      {/* AI Ustoz Modal Dialog */}
      <AiUstozModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
      />

      {/* Badge Unlocked Pop-up Modal */}
      <BadgeModal
        badge={newlyUnlockedBadge}
        onClose={clearNewBadge}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
