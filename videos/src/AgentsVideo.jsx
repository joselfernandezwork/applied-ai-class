import { AbsoluteFill, interpolate, spring, useCurrentFrame } from 'remotion';

const LOOP_STEPS = [
  { label: 'Perceive', icon: '👁️', color: '#38BDF8', angle: -90 },
  { label: 'Think', icon: '🧠', color: '#A855F7', angle: 0 },
  { label: 'Act', icon: '⚡', color: '#F59E0B', angle: 90 },
  { label: 'Observe', icon: '📊', color: '#34D399', angle: 180 },
];

const TOOLS = [
  { name: 'Web Search', icon: '🔍', color: '#38BDF8' },
  { name: 'Code Exec', icon: '💻', color: '#A855F7' },
  { name: 'Email', icon: '📧', color: '#34D399' },
  { name: 'Calendar', icon: '📅', color: '#F59E0B' },
  { name: 'Database', icon: '🗄️', color: '#F472B6' },
];

const CX = 640, CY = 340, RADIUS = 170;

function toXY(angleDeg, r) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function LoopNode({ step, frame }) {
  const idx = LOOP_STEPS.indexOf(step);
  const delay = 20 + idx * 18;
  const appear = spring({ frame: frame - delay, fps: 30, config: { damping: 13, stiffness: 160 } });
  const { x, y } = toXY(step.angle, RADIUS);
  // Active phase: each step lights up for 60 frames in 240-frame cycle
  const cycleFrame = (frame - 80) % 240;
  const isActive = cycleFrame >= idx * 60 && cycleFrame < (idx + 1) * 60 && frame > 80;
  const glow = isActive ? 25 : 0;

  return (
    <g opacity={appear}>
      {isActive && <circle cx={x} cy={y} r={52} fill={step.color} opacity={0.12} />}
      <circle cx={x} cy={y} r={44} fill="#1E293B" stroke={isActive ? step.color : '#334155'} strokeWidth={isActive ? 3 : 1.5} />
      <text x={x} y={y - 8} textAnchor="middle" fontSize={22} dominantBaseline="middle">{step.icon}</text>
      <text x={x} y={y + 18} textAnchor="middle" fontSize={13} fill={isActive ? step.color : '#94A3B8'} fontWeight={isActive ? '700' : '400'} fontFamily="Inter, Arial, sans-serif">{step.label}</text>
    </g>
  );
}

function LoopArcs({ frame }) {
  const arcs = LOOP_STEPS.map((step, i) => {
    const next = LOOP_STEPS[(i + 1) % 4];
    const { x: x1, y: y1 } = toXY(step.angle, RADIUS);
    const { x: x2, y: y2 } = toXY(next.angle, RADIUS);
    const cycleFrame = (frame - 80) % 240;
    const isActive = cycleFrame >= i * 60 && cycleFrame < (i + 1) * 60 && frame > 80;
    const progress = isActive ? interpolate(cycleFrame - i * 60, [0, 60], [0, 1]) : 0;
    const mx = (x1 + x2) / 2 + (isActive ? 20 : 0);
    const my = (y1 + y2) / 2 + (isActive ? 20 : 0);
    return (
      <g key={i}>
        <path d={`M${x1},${y1} Q${CX},${CY} ${x2},${y2}`} fill="none" stroke={isActive ? step.color : '#1E293B'} strokeWidth={isActive ? 2 : 1} strokeDasharray={isActive ? 'none' : '4 4'} strokeOpacity={isActive ? 0.8 : 0.4} />
        {isActive && <circle cx={x1 + (x2 - x1) * progress} cy={y1 + (y2 - y1) * progress} r={7} fill={step.color} opacity={0.9} />}
      </g>
    );
  });
  return <>{arcs}</>;
}

export const AgentsVideo = () => {
  const frame = useCurrentFrame();
  const titleAppear = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const toolsAppear = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#0F172A', fontFamily: 'Inter, Arial, sans-serif' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', paddingTop: 40, opacity: titleAppear }}>
        <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10B981', color: '#10B981', padding: '4px 16px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 2, display: 'inline-block', marginBottom: 8 }}>THE NEXT FRONTIER</div>
        <div style={{ fontSize: 38, fontWeight: 900, color: '#F1F5F9' }}>AI Agents</div>
        <div style={{ color: '#94A3B8', fontSize: 15, marginTop: 6 }}>Autonomous systems that perceive, think, act, and loop</div>
      </div>

      {/* SVG Loop diagram */}
      <svg width={1280} height={500} style={{ position: 'absolute', top: 90 }}>
        <LoopArcs frame={frame} />
        {LOOP_STEPS.map(s => <LoopNode key={s.label} step={s} frame={frame} />)}
        {/* Center brain */}
        {frame > 30 && (
          <g opacity={interpolate(frame, [30, 55], [0, 1], { extrapolateRight: 'clamp' })}>
            <circle cx={CX} cy={CY} r={54} fill="#1E293B" stroke="#334155" strokeWidth={1.5} />
            <text x={CX} y={CY - 10} textAnchor="middle" fontSize={28} dominantBaseline="middle">🤖</text>
            <text x={CX} y={CY + 22} textAnchor="middle" fontSize={13} fill="#94A3B8" fontFamily="Inter, Arial, sans-serif">Agent</text>
          </g>
        )}
      </svg>

      {/* Tool chips at bottom */}
      <div style={{ position: 'absolute', bottom: 55, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 14, opacity: toolsAppear }}>
        {TOOLS.map((tool, i) => (
          <div key={tool.name} style={{
            background: `${tool.color}14`,
            border: `1px solid ${tool.color}44`,
            borderRadius: 30,
            padding: '8px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: interpolate(frame, [65 + i * 12, 85 + i * 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(frame, [65 + i * 12, 85 + i * 12], [12, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
          }}>
            <span style={{ fontSize: 16 }}>{tool.icon}</span>
            <span style={{ color: tool.color, fontWeight: 600, fontSize: 13 }}>{tool.name}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', color: '#475569', fontSize: 13, opacity: interpolate(frame, [380, 410], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        Agents can complete multi-step tasks autonomously — browsing, coding, emailing
      </div>
    </AbsoluteFill>
  );
};
