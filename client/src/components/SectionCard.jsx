export default function SectionCard({ title, children }) {
  return (
    <section className="section-card">
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  );
}
