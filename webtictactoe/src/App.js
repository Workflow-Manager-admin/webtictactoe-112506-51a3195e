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
            <button className="btn" tabIndex={-1} style={{ pointerEvents: "none" }}>WebTicTacToe</button>
          </div>
        </div>
      </nav>
      <main>
        <TicTacToe />
      </main>
    </div>
  );
}

export default App;