import duke from './images/duke.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={duke}
          className="Duke-logo"
          alt="logo"
        />

        <div className="title">Duke IT Security Advisory Dashboard</div>
        <div className="subtitle">Duke’s database for open source vulnerabilities and cloud misconfigurations</div>
        <a href="#" className="button">Get Started</a>
      </header>
    </div>
  );
}

export default App;