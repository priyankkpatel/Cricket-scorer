import React, { useState, useEffect } from 'react';
import MatchSetup from './components/MatchSetUp';
import ScoreBoard from './components/ScoreBoard';
import ActionButtons from './components/ActionButtons';

const LOCAL_KEY = "gully_cricket_match";

function App() {
  const [matchInfo, setMatchInfo] = useState(null);
  const [innings, setInnings] = useState(1);
  const [team1Score, setTeam1Score] = useState({ runs: 0, wickets: 0, balls: 0, overLog: [] });
  const [team2Score, setTeam2Score] = useState({ runs: 0, wickets: 0, balls: 0, overLog: [] });

  const maxBalls = matchInfo ? matchInfo.overs * 6 : 0;

  // Load saved match from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setMatchInfo(data.matchInfo);
      setInnings(data.innings);
      setTeam1Score(data.team1Score);
      setTeam2Score(data.team2Score);
    }
  }, []);

  // Save match state to localStorage
  useEffect(() => {
    if (matchInfo) {
      localStorage.setItem(
        LOCAL_KEY,
        JSON.stringify({
          matchInfo,
          innings,
          team1Score,
          team2Score,
        })
      );
    }
  }, [matchInfo, innings, team1Score, team2Score]);

  const currentScore = innings === 1 ? team1Score : team2Score;
  const setScore = innings === 1 ? setTeam1Score : setTeam2Score;
  const battingTeam = innings === 1 ? matchInfo?.teamA : matchInfo?.teamB;

  const handleAction = (type) => {
    const score = { ...currentScore };

    if (type === 'W') {
      score.wickets += 1;
      score.balls += 1;
      score.overLog.push('W');
    } else if (type === 'WD' || type === 'NB') {
      score.runs += 1;
      score.overLog.push(type);
    } else {
      score.runs += Number(type);
      score.balls += 1;
      score.overLog.push(type);
    }

    // Check over completion
    if (score.balls % 6 === 0) {
      score.overLog = [];
    }

    // Check for auto end if team 2 scores more
    if (
      innings === 2 &&
      score.runs > team1Score.runs
    ) {
      setTeam2Score(score);
      setInnings(3);
      return;
    }

    setScore(score);

    // Auto end innings if all balls or wickets done
    if (score.balls >= maxBalls || score.wickets >= 10) {
      handleInningsEnd(score);
    }
  };

  const handleInningsEnd = () => {
    if (innings === 1) {
      setInnings(2);
    } else {
      setInnings(3); // match end
    }
  };

  const resetMatch = () => {
    localStorage.removeItem(LOCAL_KEY);
    setMatchInfo(null);
    setInnings(1);
    setTeam1Score({ runs: 0, wickets: 0, balls: 0, overLog: [] });
    setTeam2Score({ runs: 0, wickets: 0, balls: 0, overLog: [] });
  };

  if (!matchInfo) return <MatchSetup onStart={setMatchInfo} />;

  if (innings === 3) {
    const winner =
      team1Score.runs > team2Score.runs
        ? matchInfo.teamA
        : team2Score.runs > team1Score.runs
        ? matchInfo.teamB
        : 'Draw';

    return (
      <div className="App">
        <h1>Match Over</h1>
        <p>{matchInfo.teamA}: {team1Score.runs}/{team1Score.wickets}</p>
        <p>{matchInfo.teamB}: {team2Score.runs}/{team2Score.wickets}</p>
        <h2>🏆 Winner: {winner}</h2>
        <button onClick={resetMatch}>Start New Match</button>
      </div>
    );
  }

  // Needed to win
  const runsToWin =
    innings === 2 ? team1Score.runs - team2Score.runs + 1 : null;

  return (
    <div className="App">
       <button onClick={resetMatch}>Start New Match</button>
      <ScoreBoard score={currentScore} battingTeam={battingTeam} totalOvers={matchInfo.overs} />
      {innings === 2 && (
        <h3>🏏 {battingTeam} needs {runsToWin} runs to win</h3>
      )}
      <ActionButtons onAction={handleAction} onInningsEnd={handleInningsEnd} />
    </div>
  );
}

export default App;
