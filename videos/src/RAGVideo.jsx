import { AbsoluteFill, interpolate, spring, useCurrentFrame } from 'remotion';

const STEPS = [
  { label: 'User Query', icon: '💬', color: '#38BDF8', x: 80 },
  { label: 'Vector DB', icon: '🗄️', color: '#A855F7', x: 280 },
  { label: 'Retrieved Chunks', icon: '📄', color: '#F59E0B', x: 520 },
  { label: 'LLM', icon: '🧠', color: '#34D399', x: 720 },
  { label: 'Answer', icon: '✅', color: '#10B981', x: 920 },
];

function FlowBox({ step, frame }) {
  const delay = STEPS.indexOf(step) * 35 + 20;
  const appear = spring({ frame: frame - delay, fps: 30, config: { damping: 14, stiffness: 160 } });
  const isActive = frame > delay + 10 && frame < delay + 60;
  return (
    <div style={{
      opacity: appear,
      transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px) scale(${interpolate(appear, [0, 1], [0.85, 1])})`,
      background: isActive ? `${step.color}22` : '#1E293B',
      border: `2px solid ${isActive ? step.color : '#334155'}`,
      borderRadius: 14,
      padding: '18px 22px',
      textAlign: 'center',
      minWidth: 110,
      boxShadow: isActive ? `0 0 24px ${step.color}44` : 'none',
      transition: 'all 0.3s',
      position: 'absolute',
      left: step.x,
      top: '50%',
      transform: `translateY(calc(-50% + ${interpolate(appear, [0, 1], [40, 0])}px))`,
    }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{step.icon}</div>
      <div style={{ color: step.color, fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{step.label}</div>
    </div>
  );
}

function Arrow({ fromIdx, frame }) {
  const delay = fromIdx * 35 + 55;
  const progress = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const isData = frame > delay + 15 && frame < delay + 50;
  return (
    <svg style={{ position: 'absolute', top: '50%', left: STEPS[fromIdx].x + 112, transform: 'translateY(-50%)' }} width={168} height={30}>
      <line x1={0} y1={15} x2={168 * progress} y2={15} stroke={isData ? STEPS[fromIdx + 1].color : '#334155'} strokeWidth={3} strokeLinecap="round" />
      {progress > 0.9 && <polygon points={`${168},15 ${150},8 ${150},22`} fill={STEPS[fromIdx + 1].color} />}
      {isData && <circle cx={168 * Math.min(progress * 1.5, 1)} cy={15} r={6} fill={STEPS[fromIdx].color} opacity={0.9} />}
    </svg>
  );
}

const CHUNKS = [
  '"Q3 revenue increased by 23%..."',
  '"The merger was completed in..."',
  '"Risk factors include market..."',
];

export const RAGVideo = () => {
  const frame = useCurrentFrame();
  const titleAppear = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const chunksAppear = interpolate(frame, [120, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#0F172A', fontFamily: 'Inter, Arial, sans-serif', overflow: 'hidden' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', paddingTop: 44, opacity: titleAppear }}>
        <div style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid #A855F7', color: '#A855F7', padding: '4px 16px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 2, display: 'inline-block', marginBottom: 8 }}>Advanced AI Architecture</div>
        <div style={{ fontSize: 38, fontWeight: 900, color: '#F1F5F9' }}>Retrieval-Augmented Generation</div>
        <div style={{ color: '#94A3B8', fontSize: 15, marginTop: 6 }}>Connect AI to your own knowledge base</div>
      </div>

      {/* Flow diagram */}
      <div style={{ position: 'relative', width: 1060, margin: '60px auto 0', height: 160 }}>
        {STEPS.map(s => <FlowBox key={s.label} step={s} frame={frame} />)}
        {[0, 1, 2, 3].map(i => <Arrow key={i} fromIdx={i} frame={frame} />)}
      </div>

      {/* Retrieved chunks */}
      <div style={{ textAlign: 'center', marginTop: 40, opacity: chunksAppear }}>
        <div style={{ color: '#F59E0B', fontSize: 13, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>RETRIEVED CONTEXT CHUNKS</div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          {CHUNKS.map((chunk, i) => (
            <div key={i} style={{
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: 10,
              padding: '12px 18px',
              color: '#94A3B8',
              fontSize: 13,
              maxWidth: 240,
              textAlign: 'left',
              fontStyle: 'italic',
              opacity: interpolate(frame, [130 + i * 15, 150 + i * 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}>
              {chunk}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom callout */}
      <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, textAlign: 'center', color: '#475569', fontSize: 13, opacity: interpolate(frame, [380, 410], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        RAG grounds LLM answers in your real documents — no hallucinations
      </div>
    </AbsoluteFill>
  );
};
