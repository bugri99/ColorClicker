import './App.css';
import Game from './components/Game';
import Circle from './components/Circle'

function App() {
  document.body.style.overflow = "hidden"
  let circle = new Circle();
  return (
    <div className="App">
      <header className="App-header">
      <div className='App-game'>   
      <Game />   
        </div>
        <div className='App-upgrades'>      
        </div>
      </header>
    </div>
  );
}

export default App;
