import { useEffect, useMemo, useState } from 'react';
import TierRoadmap from './components/TierRoadmap';
import TopicDetail from './components/TopicDetail';
import ToolsPanel from './components/ToolsPanel';
import Scoreboard from './components/Scoreboard';
import ICPCPrep from './components/ICPCPrep';

const tabs = ['Academy', 'Tools', 'Scoreboard', 'ICPC Prep'];

export default function App() {
  const [tiers, setTiers] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState('binary-search-answer');
  const [activeTab, setActiveTab] = useState('Academy');
  const [constraintResult, setConstraintResult] = useState([]);
  const [templateCode, setTemplateCode] = useState('');
  const [dailyPlan, setDailyPlan] = useState([]);
  const [mockContest, setMockContest] = useState([]);
  const [prepSections, setPrepSections] = useState([]);
  const [progress, setProgress] = useState(new Set(JSON.parse(localStorage.getItem('progress') || '[]')));

  useEffect(() => {
    Promise.all([
      fetch('/api/topics').then((r) => r.json()),
      fetch('/api/icpc-preparation').then((r) => r.json()),
      fetch('/api/daily-practice').then((r) => r.json())
    ]).then(([topicList, prep, daily]) => {
      setTopics(topicList);
      const grouped = Object.values(topicList.reduce((acc, t) => {
        if (!acc[t.tierId]) acc[t.tierId] = { id: t.tierId, name: t.tierName, description: '', topics: [] };
        acc[t.tierId].topics.push(t);
        return acc;
      }, {}));
      setTiers(grouped);
      setPrepSections(prep);
      setDailyPlan(daily.plan);
    });
  }, []);

  const selectedTopic = useMemo(() => topics.find((t) => t.id === selectedTopicId), [topics, selectedTopicId]);

  const toggleProgress = (id) => {
    setProgress((curr) => {
      const next = new Set(curr);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem('progress', JSON.stringify([...next]));
      return next;
    });
  };

  const mastery = topics.length ? Math.round((progress.size / topics.length) * 100) : 0;

  return (
    <div className="app">
      <header>
        <h1>Competitive Programming Mastery Platform</h1>
        <p>Train from beginner to ICPC World Finals through structured tiers, deliberate practice, and contest simulation.</p>
        <div className="tabs">{tabs.map((tab) => <button className={activeTab === tab ? 'active' : ''} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div>
        <div className="progress">Mastery Progress: {progress.size}/{topics.length} topics ({mastery}%)</div>
      </header>

      {activeTab === 'Academy' && (
        <main className="layout">
          <TierRoadmap tiers={tiers} selectedTopicId={selectedTopicId} onSelect={setSelectedTopicId} />
          <TopicDetail topic={selectedTopic} progress={progress} toggleProgress={toggleProgress} />
        </main>
      )}

      {activeTab === 'Tools' && (
        <ToolsPanel
          onConstraintAnalyze={(n, q) => fetch('/api/constraint-analyzer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ n, q }) }).then((r) => r.json()).then((d) => setConstraintResult(d.suggestions || []))}
          constraintResult={constraintResult}
          onGenerateTemplate={(include) => fetch('/api/template-generator', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ include }) }).then((r) => r.json()).then((d) => setTemplateCode(d.code || ''))}
          templateCode={templateCode}
          dailyPlan={dailyPlan}
          onMockContest={(durationMinutes) => fetch('/api/mock-contest', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ durationMinutes }) }).then((r) => r.json()).then((d) => setMockContest(d.problems || []))}
          mockContest={mockContest}
        />
      )}

      {activeTab === 'Scoreboard' && <Scoreboard teams={[{ team: 'Red Vector', solved: 7, penalty: 912 }, { team: 'Blue Fenwick', solved: 6, penalty: 845 }, { team: 'Green Graph', solved: 6, penalty: 1030 }, { team: 'Gold Finals', solved: 5, penalty: 760 }]} />}
      {activeTab === 'ICPC Prep' && <ICPCPrep sections={prepSections} />}
    </div>
  );
}
