import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';

const TOKENS = [
  { word: 'The', id: 464, color: '#38BDF8' },
  { word: 'quick', id: 4996, color: '#A855F7' },
  { word: 'brown', id: 13876, color: '#34D399' },
  { word: 'fox', id: 39935, color: '#F59E0B' },
  { word: 'jumps', id: 73494, color: '#F472B6' },
  { word: 'over', id: 978, color: '#FB923C' },
  { word: 'lazy', id: 16931, color: '#60A5FA' },
  { word: 'dog', id: 3290, color: '#C084FC' },
];

function Token({ word, id, color, delay, frame, totalFrames }) {
  const appear = spring({ frame: frame - delay, fps: 30, config: { damping: 14, stiffness: 180 } });
  const splitProgress = interpolate(frame, [delay + 15, delay + 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const idAppear = interpolate(frame, [delay + 35, delay + 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: appear, transform: `translateY(${interpolate(appear, [0, 1], [30, 0])}px)` }}>
      <div style={{
        background: `${color}22`,
        border: `2px solid ${color}`,
        borderRadius: 10,
        padding: '8px 16px',
        color,
        fontWeight: 700,
        fontSize: 26,
        fontFamily: 'monospace',
        marginBottom: 10,
        transform: `scale(${interpolate(splitProgress, [0, 0.5, 1], [1, 1.15, 1])})`,
        boxShadow: `0 0 ${interpolate(splitProgress, [0, 1], [0, 20])}px ${color}55`,
      }}>
        {word}
      </div>
      <div style={{
        background: '#1E293B',
        border: '1px solid #334155',
        borderRadius: 8,
        padding: '4px 12px',
        color: '#94A3B8',
        fontSize: 16,
        fontFamily: 'monospace',
        opacity: idAppear,
        transform: `translateY(${interpolate(idAppear, [0, 1], [10, 0])}px)`,
      }}>
        #{id}
      </div>
    </div>
  );
}

function Arrow({ frame, startDelay }) {
  const opacity = interpolate(frame, [startDelay, startDelay + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const width = interpolate(frame, [startDelay, startDelay + 25], [0, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ display: 'flex', alignItems: 'center', opacity, marginTop: 24 }}>
      <div style={{ height: 3, width, background: 'linear-gradient(90deg, #38BDF8, #A855F7)', borderRadius: 2 }} />
      <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '12px solid #A855F7' }} />
    </div>
  );
}

function ModelBox({ frame, startDelay }) {
  const appear = spring({ frame: frame - startDelay, fps: 30, config: { damping: 12, stiffness: 120 } });
  const pulse = interpolate(frame % 30, [0, 15, 30], [1, 1.03, 1]);
  return (
    <div style={{
      opacity: appear,
      transform: `scale(${interpolate(appear, [0, 1], [0.7, 1]) * pulse})`,
      background: 'linear-gradient(135deg, #1E293B, #0F172A)',
      border: '2px solid #38BDF8',
      borderRadius: 16,
      padding: '24px 36px',
      textAlign: 'center',
      boxShadow: '0 0 40px #38BDF822',
      marginTop: 24,
    }}>
      <div style={{ fontSize: 36, marginBottom: 8 }}>🧠</div>
      <div style={{ color: '#38BDF8', fontWeight: 800, fontSize: 18 }}>LLM Input</div>
      <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>Token Sequence Ready</div>
    </div>
  );
}

export const TokenizationVideo = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const titleAppear = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleAppear = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });
  const showModel = frame > 180;

  return (
    <AbsoluteFill style={{ background: '#0F172A', fontFamily: 'Inter, Arial, sans-serif', padding: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 40, opacity: titleAppear, transform: `translateY(${interpolate(titleAppear, [0, 1], [-20, 0])}px)` }}>
        <div style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid #38BDF8', color: '#38BDF8', padding: '4px 16px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 2, display: 'inline-block', marginBottom: 10, textTransform: 'uppercase' }}>How AI Reads Text</div>
        <div style={{ fontSize: 42, fontWeight: 900, color: '#F1F5F9', lineHeight: 1.1 }}>Tokenization</div>
        <div style={{ color: '#94A3B8', fontSize: 16, marginTop: 8, opacity: subtitleAppear }}>Every word becomes a token → a number → a vector</div>
      </div>

      {/* Tokens row */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
        {TOKENS.map((t, i) => (
          <Token key={t.word} {...t} delay={40 + i * 18} frame={frame} totalFrames={450} />
        ))}
      </div>

      {/* Arrow + Model box */}
      {showModel && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Arrow frame={frame} startDelay={185} />
          <ModelBox frame={frame} startDelay={200} />
        </div>
      )}

      {/* Bottom label */}
      <div style={{
        position: 'absolute', bottom: 30,
        color: '#334155', fontSize: 13, fontFamily: 'monospace',
        opacity: interpolate(frame, [400, 420], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        GPT-4 uses ~100,000 tokens in its vocabulary
      </div>
    </AbsoluteFill>
  );
};
