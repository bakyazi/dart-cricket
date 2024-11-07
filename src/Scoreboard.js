import React, { useState, useEffect } from "react";

import "./Scoreboard.css"; // For custom styles


const targets = ["20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "D", "T", "B", "H"]
const teamIds = ["1", "2", "3", "4"]
const defaultScores = {
  "4": { id: 4, name: "Team D", scores: targets.reduce((a, v) => ({ ...a, [v]: 0 }), {}), total: 0 },
  "3": { id: 3, name: "Team C", scores: targets.reduce((a, v) => ({ ...a, [v]: 0 }), {}), total: 0 },
  "2": { id: 2, name: "Team B", scores: targets.reduce((a, v) => ({ ...a, [v]: 0 }), {}), total: 0 },
  "1": { id: 1, name: "Team A", scores: targets.reduce((a, v) => ({ ...a, [v]: 0 }), {}), total: 0 },
}


function Scoreboard() {

  const [teams, setTeams] = useState(defaultScores);

  useEffect(() => {
    teamIds.forEach(teamId => {
      let team = teams[teamId];
      let isTeamWinner = true;
      for (const [target, value] of Object.entries(team.scores)) {
        if (value !== 3) {
          isTeamWinner = false;
          break;
        }
      }
      if (isTeamWinner) {
        alert(`Team${teamId} winner`);
        setTeams(defaultScores)
      }
    })
    console.log("score changed")
  }, [teams])




  // Initialize each team's scores with target numbers if they don't exist
  return (
    <div className="scoreboard-container">
      <div className="scoreboard">
        <div className="scoreboard-title">
          <h1 className="text-4xl">Dart Cricket Scoreboard</h1>
          <button class="bg-transparent hover:bg-green-900 text-white font-semibold hover:text-white py-2 px-4 border border-green-900 hover:border-transparent rounded">
            Reset
          </button>
        </div>
        <div className="target-row">
          <div className="target-cell">T3</div>
          <div className="target-cell">T1</div>
          <div className="target-cell">Target</div>
          <div className="target-cell">T2</div>
          <div className="target-cell">T4</div>
        </div >
        {targets.map(target => <Target key={target} teams={teams} target={target} setTeams={setTeams} />)}
      </div>
    </div>
  );
}


function Target({ teams, target, setTeams }) {
  return (
    <div className="target-row">
      <TargetCell setTeams={setTeams} teams={teams} team="3" target={target} />
      <TargetCell setTeams={setTeams} teams={teams} team="1" target={target} />
      <div className="target-cell">{target}</div>
      <TargetCell setTeams={setTeams} teams={teams} team="2" target={target} />
      <TargetCell setTeams={setTeams} teams={teams} team="4" target={target} />
    </div >
  )
}


const values = {
  0: "",
  1: <i className="fa-solid fa-slash fa-2xl" viewBox="0 0 60 60"></i>,
  2: <i className="fa-solid fa-x fa-2xl" />,
  3: <i className="fa-regular fa-circle-xmark fa-2xl" viewBox="0 0 60 60" />
}


function TargetCell({ teams, team, target, setTeams, value }) {
  if (value === undefined) {
    value = values[teams[team].scores[target]]
  }
  return (<div className="target-cell" onClick={() => {
    setTeams({
      ...teams, [team]: {
        ...teams[team],
        scores: {
          ...teams[team].scores,
          [target]: (teams[team].scores[target] + 1) % 4
        }
      }
    })
  }}>
    {value}
  </div >)
}

export default Scoreboard;
