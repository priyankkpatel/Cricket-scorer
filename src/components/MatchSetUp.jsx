// src/components/MatchSetup.jsx
import React, { useState } from 'react';

function MatchSetup({ onStart }) {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [overs, setOvers] = useState(2);

  const handleStart = () => {
    if (teamA && teamB && overs > 0) {
      onStart({ teamA, teamB, overs });
    } else {
      alert("Please fill all fields properly!");
    }
  };

  return (
    <div className="setup">
      <h2>Gully Cricket Match Setup</h2>
      <input placeholder="Team A Name" value={teamA} onChange={e => setTeamA(e.target.value)} />
      <input placeholder="Team B Name" value={teamB} onChange={e => setTeamB(e.target.value)} />
      <input type="number" min="1" value={overs} onChange={e => setOvers(Number(e.target.value))} />
      <button onClick={handleStart}>Start Match</button>
    </div>
  );
}

export default MatchSetup;
