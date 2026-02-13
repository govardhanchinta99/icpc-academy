export default function Scoreboard({ teams }) {
  return (
    <div className="panel">
      <h2>ICPC Scoreboard Simulation</h2>
      <table>
        <thead><tr><th>Rank</th><th>Team</th><th>Solved</th><th>Penalty</th></tr></thead>
        <tbody>
          {teams.map((t, i) => <tr key={t.team}><td>{i + 1}</td><td>{t.team}</td><td>{t.solved}</td><td>{t.penalty}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
