import { AbsoluteFill, interpolate, spring, useCurrentFrame } from 'remotion';

const CRAFT = [
  { letter: 'C', label: 'Context', desc: 'Set the scene & background', color: '#38BDF8' },
  { letter: 'R', label: 'Role', desc: 'Assign an expert persona', color: '#A855F7' },
  { letter: 'A', label: 'Action', desc: 'State the exact task', color: '#34D399' },
  { letter: 'F', label: 'Format', desc: 'Specify output structure', color: '#F59E0B' },
  { letter: 'T', label: 'Tone', desc: 'Define voice & style', color: '#F472B6' },
];

const MESSAGES = [
  { role: 'system', icon: '⚙️', color: '#94A3B8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.25)', label: 'System Prompt', text: 'You are a senior financial analyst at a top-tier investment bank. Be precise, data-driven, and concise.' },
  { role: 'user', icon: '👤', color: '#38BDF8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.25)', label: 'User', text: 'Analyze this Q3 report. Highlight the 3 biggest risks and format your response as bullet points.' },
  { role: 'assistant', icon: '🤖', color: '#34D399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.25)', label: 'Claude', text: '• Revenue concentration risk: 68% from top 3 clients\n• Margin compression: EBITDA down 4.2 pts YoY\n• FX exposure: $42M unhedged EUR/USD position' },
];

function CraftLetter({ item, frame, idx }) {
  const delay = 30 + idx * 22;
  const appear = spring({ frame: frame - delay, fps: 30, config: { damping: 13, stiffness: 170 } });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: appear, transform: `translateX(${interpolate(appear, [0, 1], [-30, 0])}px)` }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${item.color}22`, border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 22, color: item.color }}>{item.letter}</div>
      <div>
        <div style={{ color: item.color, fontWeight: 700, fontSize: 16 }}>{item.label}</div>
        <div style={{ color: '#64748B', fontSize: 13 }}>{item.desc}</div>
      </div>
    </div>
  );
}

function MessageBubble({ msg, frame, delay }) {
  const appear = spring({ frame: frame - delay, fps: 30, config: { damping: 14, stiffness: 140 } });
  return (
    <div style={{ opacity: appear, transform: `translateY(${interpolate(appear, [0, 1], [24, 0])}px)`, background: msg.bg, border: `1px solid ${msg.border}`, borderRadius: 12, padding: '14px 18px', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 18 }}>{msg.icon}</span>
        <span style={{ color: msg.color, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>{msg.label}</span>
      </div>
      <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{msg.text}</div>
    </div>
  );
}

export const PromptVideo = () => {
  const frame = useCurrentFrame();
  const titleAppear = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const showMessages = frame > 140;

  return (
    <AbsoluteFill style={{ background: '#0F172A', fontFamily: 'Inter, Arial, sans-serif', padding: '44px 80px' }}>
      <div style={{ display: 'flex', gap: 60, height: '100%' }}>
        {/* Left: CRAFT framework */}
        <div style={{ flex: '0 0 300px', opacity: titleAppear }}>
          <div style={{ background: 'rgba(252,211,77,0.12)', border: '1px solid #FCD34D', color: '#FCD34D', padding: '4px 14px', borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 2, display: 'inline-block', marginBottom: 10 }}>FRAMEWORK</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#F1F5F9', marginBottom: 6 }}>CRAFT</div>
          <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 28 }}>Prompting Like a Pro</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {CRAFT.map((item, i) => <CraftLetter key={item.letter} item={item} frame={frame} idx={i} />)}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: '#1E293B', alignSelf: 'stretch' }} />

        {/* Right: Live example */}
        <div style={{ flex: 1 }}>
          <div style={{ color: '#94A3B8', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, opacity: interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
            Live Example → Finance Analysis
          </div>
          {showMessages && MESSAGES.map((msg, i) => (
            <MessageBubble key={msg.role} msg={msg} frame={frame} delay={150 + i * 45} />
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, textAlign: 'center', color: '#475569', fontSize: 13, opacity: interpolate(frame, [380, 410], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        Better prompts = 10× better outputs — no fine-tuning required
      </div>
    </AbsoluteFill>
  );
};
