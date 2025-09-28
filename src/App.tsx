import { useState } from 'react'
import JogosView from './components/JogosView'
import JogadoresView from './components/JogadoresView'
import PontuadosView from './components/PontuadosView'
import './App.css'

type ViewType = 'jogos' | 'jogadores' | 'pontuados';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('jogos');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'jogadores':
        return <JogadoresView onBack={() => setCurrentView('jogos')} />;
      case 'pontuados':
        return <PontuadosView onBack={() => setCurrentView('jogos')} />;
      default:
        return (
          <JogosView 
            onShowJogadores={() => setCurrentView('jogadores')}
            onShowPontuados={() => setCurrentView('pontuados')}
          />
        );
    }
  };

  return (
    <div className="app">
      {renderCurrentView()}
    </div>
  );
}

export default App;
