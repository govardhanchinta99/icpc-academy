import { useState } from 'react';

const patterns = [
  { q: 'Need minimum X where can(X) is monotone?', a: 'Binary Search on Answer' },
  { q: 'Many static range min queries, no updates?', a: 'Sparse Table' },
  { q: 'Path queries on dynamic tree values?', a: 'Heavy Light Decomposition' }
];

export default function ToolsPanel({ onConstraintAnalyze, constraintResult, onGenerateTemplate, templateCode, dailyPlan, onMockContest, mockContest }) {
  const [n, setN] = useState(200000);
  const [q, setQ] = useState(200000);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');
  const [include, setInclude] = useState(['fastio']);

  const toggleInclude = (key) => {
    setInclude((curr) => (curr.includes(key) ? curr.filter((x) => x !== key) : [...curr, key]));
  };

  const checkQuiz = () => {
    const correct = patterns[quizIndex].a.toLowerCase();
    setQuizFeedback(quizAnswer.toLowerCase().includes(correct.toLowerCase()) ? 'Correct pattern!' : `Expected: ${patterns[quizIndex].a}`);
  };

  return (
    <div className="panel tools-grid">
      <section className="section-card">
        <h3>Constraint Analyzer</h3>
        <div className="row"><input value={n} onChange={(e) => setN(e.target.value)} /><input value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <button onClick={() => onConstraintAnalyze(Number(n), Number(q))}>Analyze</button>
        <ul>{constraintResult.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>

      <section className="section-card">
        <h3>Pattern Finder Quiz</h3>
        <p>{patterns[quizIndex].q}</p>
        <input placeholder="Technique" value={quizAnswer} onChange={(e) => setQuizAnswer(e.target.value)} />
        <div className="row">
          <button onClick={checkQuiz}>Check</button>
          <button onClick={() => { setQuizIndex((quizIndex + 1) % patterns.length); setQuizAnswer(''); setQuizFeedback(''); }}>Next</button>
        </div>
        <p>{quizFeedback}</p>
      </section>

      <section className="section-card">
        <h3>Daily Practice Generator</h3>
        <ul>{dailyPlan.map((item) => <li key={item.slot}>#{item.slot} {item.focus}: {item.topic}</li>)}</ul>
      </section>

      <section className="section-card">
        <h3>Timed Mock Contest</h3>
        <button onClick={() => onMockContest(300)}>Generate 5-hour Mock</button>
        <ul>{mockContest.map((p) => <li key={p.code}>{p.code} - {p.title} ({p.points})</li>)}</ul>
      </section>

      <section className="section-card">
        <h3>C++ Template Generator</h3>
        <div className="row">
          {['fastio', 'mod', 'dsu', 'segtree'].map((k) => (
            <label key={k}><input type="checkbox" checked={include.includes(k)} onChange={() => toggleInclude(k)} /> {k}</label>
          ))}
        </div>
        <button onClick={() => onGenerateTemplate(include)}>Generate</button>
        <pre>{templateCode}</pre>
      </section>
    </div>
  );
}
