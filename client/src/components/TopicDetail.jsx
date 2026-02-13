import SectionCard from './SectionCard';

export default function TopicDetail({ topic, progress, toggleProgress }) {
  if (!topic) return <div className="panel">Select a topic from roadmap.</div>;
  return (
    <div className="panel">
      <div className="topic-header">
        <div>
          <h2>{topic.title}</h2>
          <p>{topic.tierName}</p>
        </div>
        <button onClick={() => toggleProgress(topic.id)}>{progress.has(topic.id) ? 'Mark Unsolved' : 'Mark Mastered'}</button>
      </div>
      <SectionCard title="Concept">{topic.concept}</SectionCard>
      <SectionCard title="Pattern Recognition Guide">{topic.patternRecognition}</SectionCard>
      <SectionCard title="Time Complexity Analysis">{topic.timeComplexity}</SectionCard>
      <SectionCard title="Common Mistakes">
        <ul>{topic.commonMistakes.map((m) => <li key={m}>{m}</li>)}</ul>
      </SectionCard>
      <SectionCard title="Contest-ready C++ Template"><pre>{topic.template}</pre></SectionCard>
      <SectionCard title="Curated Practice Problems">
        <ul>
          {topic.practiceProblems.map((p) => (
            <li key={p.name}><a href={p.url} target="_blank" rel="noreferrer">[{p.difficulty}] {p.name}</a></li>
          ))}
        </ul>
      </SectionCard>
      <SectionCard title="When NOT to Use">{topic.whenNotToUse}</SectionCard>
      <SectionCard title="ICPC-level Variations">{topic.icpcVariations}</SectionCard>
    </div>
  );
}
