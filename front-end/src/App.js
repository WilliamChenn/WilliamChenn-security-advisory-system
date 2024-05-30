import duke from "./images/duke.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Duke IT Security Advisory Dashboard
        <img
          src={duke}
          className="Duke Logo"
          alt="logo"
          style={{
            width: 150,
            position: "absolute",
            top: 10,
            left: 10,
          }}
        />
      </header>
    </div>
  );
}

export default App;
