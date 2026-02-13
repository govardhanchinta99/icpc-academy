import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/topics.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const app = express();
app.use(cors());
app.use(express.json());

const flattenTopics = () => data.tiers.flatMap((tier) => tier.topics.map((topic) => ({ ...topic, tierId: tier.id, tierName: tier.name })));

app.get('/api/tiers', (_, res) => res.json(data.tiers.map(({ topics, ...tier }) => ({ ...tier, topicCount: topics.length }))));
app.get('/api/topics', (_, res) => res.json(flattenTopics()));
app.get('/api/topics/:id', (req, res) => {
  const topic = flattenTopics().find((t) => t.id === req.params.id);
  if (!topic) return res.status(404).json({ error: 'Topic not found' });
  return res.json(topic);
});

app.post('/api/constraint-analyzer', (req, res) => {
  const n = Number(req.body.n ?? 0);
  const q = Number(req.body.q ?? 0);
  const suggestions = [];
  if (n <= 25) suggestions.push('Brute force / Backtracking / Bitmask DP');
  if (n <= 2000) suggestions.push('O(N^2) DP or graph possible');
  if (n <= 200000) suggestions.push('Two pointers, greedy, DSU, Dijkstra, segment tree');
  if (n > 200000) suggestions.push('O(N log N) or better only; consider binary search + linear check');
  if (q > n && q > 100000) suggestions.push('Precomputation, Fenwick/Segment Tree, sparse table');
  if (!suggestions.length) suggestions.push('Start with constraint triage and derive monotonic or graph structure.');
  res.json({ n, q, suggestions });
});

app.get('/api/daily-practice', (_, res) => {
  const topics = flattenTopics();
  const seed = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const start = Number(seed) % topics.length;
  const plan = Array.from({ length: 5 }, (_, i) => topics[(start + i * 7) % topics.length]).map((t, i) => ({
    slot: i + 1,
    topic: t.title,
    focus: ['Warm-up', 'Core', 'Speed', 'Hard push', 'Review'][i]
  }));
  res.json({ date: new Date().toISOString().slice(0, 10), plan });
});

app.post('/api/mock-contest', (req, res) => {
  const duration = Number(req.body.durationMinutes || 300);
  const topics = flattenTopics();
  const selected = topics.slice(0, 8).map((t, i) => ({
    code: String.fromCharCode(65 + i),
    title: t.title,
    tier: t.tierName,
    points: 100 + i * 50
  }));
  res.json({ duration, problems: selected });
});

app.get('/api/icpc-preparation', (_, res) => res.json(data.icpcPreparation));

app.post('/api/template-generator', (req, res) => {
  const include = req.body.include || [];
  const blocks = {
    fastio: 'ios::sync_with_stdio(false);\ncin.tie(nullptr);',
    mod: 'const long long MOD = 1e9+7;\nlong long modpow(long long a,long long e){ long long r=1; while(e){ if(e&1) r=r*a%MOD; a=a*a%MOD; e>>=1;} return r; }',
    dsu: 'struct DSU{ vector<int> p,sz; DSU(int n):p(n),sz(n,1){iota(p.begin(),p.end(),0);} int f(int x){return p[x]==x?x:p[x]=f(p[x]);} bool unite(int a,int b){a=f(a);b=f(b);if(a==b) return false; if(sz[a]<sz[b]) swap(a,b); p[b]=a; sz[a]+=sz[b]; return true;}};',
    segtree: '// Segment tree placeholder: merge, update, query in O(log N).'
  };
  const chosen = include.map((k) => blocks[k]).filter(Boolean).join('\n\n');
  res.json({
    code: `#include <bits/stdc++.h>\nusing namespace std;\nusing ll = long long;\n\n${chosen}\n\nvoid solve(){\n  \n}\n\nint main(){\n  ${include.includes('fastio') ? 'ios::sync_with_stdio(false);\n  cin.tie(nullptr);' : ''}\n  int t=1;\n  // cin>>t;\n  while(t--) solve();\n}`
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API running on ${port}`));
