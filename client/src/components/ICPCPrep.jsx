export default function ICPCPrep({ sections }) {
  return (
    <div className="panel">
      <h2>ICPC Preparation System</h2>
      {sections.map((s) => (
        <section key={s.title} className="section-card">
          <h3>{s.title}</h3>
          <p>{s.content}</p>
        </section>
      ))}
    </div>
  );
}
