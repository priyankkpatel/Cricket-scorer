// src/components/TossSection.jsx
import React, { useState } from 'react';

function TossSection({ teamA, teamB, onTossComplete }) {
  const [tossResult, setTossResult] = useState('');
  const [tossWinner, setTossWinner] = useState('');
  const [decision, setDecision] = useState('');
  const [battingTeam, setBattingTeam] = useState('');

  const handleToss = () => {
    const coin = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const winner = Math.random() < 0.5 ? teamA : teamB;
    const choice = Math.random() < 0.5 ? 'bat' : 'bowl';
    const batting = choice === 'bat' ? winner : (winner === teamA ? teamB : teamA);

    setTossResult(coin);
    setTossWinner(winner);
    setDecision(choice);
    setBattingTeam(batting);

    setTimeout(() => {
      onTossComplete(batting);
    }, 2000); // slight delay before moving to scoreboard
  };

  return (
    <div className="setup">
      <h2>🎲 Toss Time</h2>
      <button onClick={handleToss}>Flip the Coin</button>

      {tossResult && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Result:</strong> {tossResult}</p>
          <p><strong>Toss Winner:</strong> {tossWinner}</p>
          <p><strong>Decision:</strong> {tossWinner} chooses to {decision}</p>
          <p><strong>{battingTeam}</strong> will bat first 🏏</p>
        </div>
      )}
    </div>
  );
}

export default TossSection;
