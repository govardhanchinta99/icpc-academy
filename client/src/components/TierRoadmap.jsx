export default function TierRoadmap({ tiers, selectedTopicId, onSelect }) {
  return (
    <aside className="roadmap">
      <h2>ICPC Mastery Roadmap</h2>
      {tiers.map((tier) => (
        <div className="tier" key={tier.id}>
          <h3>{tier.name}</h3>
          <p>{tier.description}</p>
          <ul>
            {tier.topics.map((topic) => (
              <li key={topic.id}>
                <button className={selectedTopicId === topic.id ? 'active' : ''} onClick={() => onSelect(topic.id)}>
                  {topic.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
