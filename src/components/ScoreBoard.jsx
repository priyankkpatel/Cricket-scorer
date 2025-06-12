import React from 'react';

function ScoreBoard({ score, battingTeam, totalOvers }) {
  const { runs, wickets, balls, overLog } = score;
  const overs = `${Math.floor(balls / 6)}.${balls % 6}`;

  return (
    <div className="scoreboard">
      <h2>{battingTeam} is Batting</h2>
      <p><strong>Score:</strong> {runs}/{wickets}</p>
      <p><strong>Overs:</strong> {overs} / {totalOvers}</p>
      <p><strong>Current Over:</strong> {overLog.join(' ')}</p>
    </div>
  );
}

export default ScoreBoard;
