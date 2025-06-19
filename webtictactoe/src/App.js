import React from "react";
import "./App.css";
import TicTacToe from "./TicTacToe";

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" style={{ background: "#4CAF50" }}>WebTicTacToe</button>
          </div>
        </div>
      </nav>
      {/* Replace template main area with the game container */}
      <main>
        <TicTacToe />
      </main>
    </div>
  );
}

export default App;