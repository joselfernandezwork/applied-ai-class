import { AbsoluteFill, interpolate, spring, useCurrentFrame } from 'remotion';

const TOOLS = [
  { name: 'ChatGPT', icon: '💬', color: '#34D399', use: 'General tasks, writing' },
  { name: 'Claude', icon: '🤖', color: '#FB923C', use: 'Analysis, long docs' },
  { name: 'Copilot', icon: '💼', color: '#38BDF8', use: 'Microsoft 365 suite' },
  { name: 'Gemini', icon: '🔮', color: '#A855F7', use: 'Google Workspace' },
  { name: 'Perplexity', icon: '🔍', color: '#F472B6', use: 'Real-time research' },
  { name: 'Midjourney', icon: '🎨', color: '#F59E0B', use: 'Image generation' },
  { name: 'Cursor', icon: '⌨️', color: '#60A5FA', use: 'AI-powered coding' },
  { name: 'Gamma', icon: '📊', color: '#C084FC', use: 'Presentations & docs' },
  { name: 'Notebook LM', icon: '📚', color: '#34D399', use: 'Research synthesis' },
];

function ToolCard({ tool, frame, idx }) {
  const row = Math.floor(idx / 3);
  const col = idx % 3;
  const delay = 30 + row * 25 + col * 10;
  const appear = spring({ frame: frame - delay, fps: 30, config: { damping: 14, stiffness: 160 } });
  const hoverCycle = (frame * 0.8 + idx * 40) % 360;
  const hover = Math.sin((hoverCycle * Math.PI) / 180) * 0.5 + 0.5;

  return (
    <div style={{
      opacity: appear,
      transform: `translateY(${interpolate(appear, [0, 1], [30, 0])}px) scale(${0.97 + 0.03 * hover})`,
      background: `${tool.color}12`,
      border: `1.5px solid ${tool.color}${Math.round(30 + 50 * hover).toString(16).padStart(2, '0')}`,
      borderRadius: 14,
      padding: '20px 18px',
      textAlign: 'center',
      boxShadow: `0 0 ${10 + 15 * hover}px ${tool.color}22`,
    }}>
      <div style={{ fontSize: 32, marginBottom: 10 }}>{tool.icon}</div>
      <div style={{ color: tool.color, fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{tool.name}</div>
      <div style={{ color: '#64748B', fontSize: 12, lineHeight: 1.4 }}>{tool.use}</div>
    </div>
  );
}

export const ToolkitVideo = () => {
  const frame = useCurrentFrame();
  const titleAppear = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#0F172A', fontFamily: 'Inter, Arial, sans-serif', padding: '40px 60px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 32, opacity: titleAppear }}>
        <div style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid #34D399', color: '#34D399', padding: '4px 16px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 2, display: 'inline-block', marginBottom: 8 }}>YOUR STACK</div>
        <div style={{ fontSize: 38, fontWeight: 900, color: '#F1F5F9' }}>Complete AI Toolkit</div>
        <div style={{ color: '#94A3B8', fontSize: 15, marginTop: 6 }}>9 tools every professional needs in 2025</div>
      </div>

      {/* 3×3 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {TOOLS.map((tool, i) => <ToolCard key={tool.name} tool={tool} frame={frame} idx={i} />)}
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, textAlign: 'center', color: '#475569', fontSize: 13, opacity: interpolate(frame, [370, 400], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        Free tiers available for all tools → Start today
      </div>
    </AbsoluteFill>
  );
};
