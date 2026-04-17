import { AbsoluteFill, interpolate, spring, useCurrentFrame } from 'remotion';

// Autoregressive generation: token-by-token prediction
const GENERATION_STEPS = [
  { prefix: 'The AI will transform', next: 'how', dist: [{ token: 'how', p: 0.52, color: '#34D399' }, { token: 'the', p: 0.21, color: '#38BDF8' }, { token: 'business', p: 0.14, color: '#A855F7' }, { token: 'every', p: 0.08, color: '#F59E0B' }, { token: 'work', p: 0.05, color: '#F472B6' }] },
  { prefix: 'The AI will transform how', next: 'we', dist: [{ token: 'we', p: 0.61, color: '#34D399' }, { token: 'companies', p: 0.18, color: '#38BDF8' }, { token: 'people', p: 0.12, color: '#A855F7' }, { token: 'teams', p: 0.06, color: '#F59E0B' }, { token: 'humans', p: 0.03, color: '#F472B6' }] },
  { prefix: 'The AI will transform how we', next: 'work', dist: [{ token: 'work', p: 0.71, color: '#34D399' }, { token: 'learn', p: 0.14, color: '#38BDF8' }, { token: 'think', p: 0.09, color: '#A855F7' }, { token: 'create', p: 0.04, color: '#F59E0B' }, { token: 'live', p: 0.02, color: '#F472B6' }] },
];

const STEP_DURATION = 120;

function ProbBar({ token, p, color, rank, frame, barStart }) {
  const w = interpolate(frame, [barStart + rank * 8, barStart + rank * 8 + 30], [0, p * 340], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [barStart + rank * 8 + 20, barStart + rank * 8 + 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const isWinner = rank === 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
      <div style={{ width: 80, color: isWinner ? color : '#64748B', fontWeight: isWinner ? 700 : 400, fontSize: 15, fontFamily: 'monospace', textAlign: 'right' }}>{token}</div>
      <div style={{ position: 'relative', height: 28, background: '#1E293B', borderRadius: 6, overflow: 'hidden', flex: 1, maxWidth: 340 }}>
        <div style={{ position: 'absolute', inset: 0, width: w, background: isWinner ? `linear-gradient(90deg, ${color}88, ${color})` : `${color}44`, borderRadius: 6, transition: 'width 0.1s' }} />
        {isWinner && <div style={{ position: 'absolute', inset: 0, border: `2px solid ${color}`, borderRadius: 6, boxShadow: `0 0 12px ${color}55` }} />}
      </div>
      <div style={{ width: 48, color: isWinner ? color : '#475569', fontSize: 13, fontFamily: 'monospace', opacity: labelOpacity }}>{(p * 100).toFixed(0)}%</div>
    </div>
  );
}

export const LLMVideo = () => {
  const frame = useCurrentFrame();
  const titleAppear = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const stepIdx = Math.min(Math.floor(frame / STEP_DURATION), GENERATION_STEPS.length - 1);
  const stepFrame = frame - stepIdx * STEP_DURATION;
  const currentStep = GENERATION_STEPS[stepIdx];

  const prefixOpacity = interpolate(stepFrame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const arrowOpacity = interpolate(stepFrame, [20, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barsStart = 30;
  const winnerAppear = spring({ frame: stepFrame - 85, fps: 30, config: { damping: 11, stiffness: 200 } });

  return (
    <AbsoluteFill style={{ background: '#0F172A', fontFamily: 'Inter, Arial, sans-serif', padding: '44px 80px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 36, opacity: titleAppear }}>
        <div style={{ background: 'rgba(56,189,248,0.12)', border: '1px solid #38BDF8', color: '#38BDF8', padding: '4px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 2, display: 'inline-block', marginBottom: 8 }}>HOW LLMs GENERATE TEXT</div>
        <div style={{ fontSize: 38, fontWeight: 900, color: '#F1F5F9' }}>Next Token Prediction</div>
        <div style={{ color: '#94A3B8', fontSize: 15, marginTop: 6 }}>One token at a time — choosing from a probability distribution</div>
      </div>

      {/* Current prefix */}
      <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 12, padding: '16px 22px', marginBottom: 28, opacity: prefixOpacity }}>
        <div style={{ color: '#475569', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>CONTEXT SO FAR</div>
        <div style={{ color: '#F1F5F9', fontSize: 20, fontWeight: 600, fontFamily: 'monospace' }}>
          {currentStep.prefix}
          <span style={{ display: 'inline-block', width: 3, height: 22, background: '#38BDF8', marginLeft: 4, animation: 'none', opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0 }} />
        </div>
      </div>

      {/* Arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, opacity: arrowOpacity }}>
        <div style={{ height: 2, flex: 1, background: 'linear-gradient(90deg, #334155, #38BDF8)' }} />
        <div style={{ color: '#38BDF8', fontSize: 13, fontWeight: 700 }}>▶ LLM picks next token</div>
        <div style={{ height: 2, flex: 1, background: 'linear-gradient(90deg, #38BDF8, #334155)' }} />
      </div>

      {/* Probability bars */}
      <div style={{ marginBottom: 28 }}>
        {currentStep.dist.map((item, i) => (
          <ProbBar key={item.token + stepIdx} token={item.token} p={item.p} color={item.color} rank={i} frame={stepFrame} barStart={barsStart} />
        ))}
      </div>

      {/* Winner token appearing */}
      {stepFrame > 85 && (
        <div style={{ textAlign: 'center', opacity: winnerAppear, transform: `scale(${interpolate(winnerAppear, [0, 1], [0.6, 1])})` }}>
          <div style={{ color: '#94A3B8', fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>SELECTED TOKEN</div>
          <div style={{ display: 'inline-block', background: 'rgba(52,211,153,0.15)', border: '2px solid #34D399', borderRadius: 12, padding: '10px 28px', color: '#34D399', fontSize: 28, fontWeight: 900, fontFamily: 'monospace', boxShadow: '0 0 30px #34D39944' }}>
            "{currentStep.next}"
          </div>
        </div>
      )}

      {/* Step counter */}
      <div style={{ position: 'absolute', bottom: 28, right: 80, color: '#334155', fontSize: 13 }}>
        Step {stepIdx + 1} / {GENERATION_STEPS.length}
      </div>
    </AbsoluteFill>
  );
};
