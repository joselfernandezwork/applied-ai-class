import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const LAYERS = [
  { label: 'Input', nodes: 4, color: '#38BDF8' },
  { label: 'Hidden 1', nodes: 6, color: '#A855F7' },
  { label: 'Hidden 2', nodes: 6, color: '#A855F7' },
  { label: 'Output', nodes: 3, color: '#34D399' },
];

const LAYER_X = [120, 320, 520, 720];
const HEIGHT = 720;
const NODE_R = 22;

function getNodeY(layerIdx, nodeIdx) {
  const n = LAYERS[layerIdx].nodes;
  const spacing = Math.min(90, (HEIGHT - 120) / n);
  const total = (n - 1) * spacing;
  return (HEIGHT / 2) - (total / 2) + nodeIdx * spacing;
}

function Edges({ frame, fromLayer, toLayer }) {
  const from = LAYERS[fromLayer];
  const to = LAYERS[toLayer];
  const pulsePhase = (fromLayer * 20);
  const edges = [];
  for (let i = 0; i < from.nodes; i++) {
    for (let j = 0; j < to.nodes; j++) {
      const progress = interpolate(frame, [pulsePhase + 30, pulsePhase + 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
      const x1 = LAYER_X[fromLayer] + NODE_R;
      const y1 = getNodeY(fromLayer, i);
      const x2 = LAYER_X[toLayer] - NODE_R;
      const y2 = getNodeY(toLayer, j);
      const opacity = 0.12 + 0.18 * progress;
      const isActive = (frame % 60) > (fromLayer * 15) && (frame % 60) < (fromLayer * 15 + 20);
      edges.push(
        <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={isActive ? LAYERS[fromLayer].color : '#334155'}
          strokeWidth={isActive ? 1.5 : 0.8}
          strokeOpacity={isActive ? 0.6 : opacity}
        />
      );
    }
  }
  return <>{edges}</>;
}

function Node({ x, y, color, frame, delay, label }) {
  const appear = spring({ frame: frame - delay, fps: 30, config: { damping: 14, stiffness: 160 } });
  const isActive = (frame % 90) > delay % 90 && (frame % 90) < (delay % 90) + 25;
  const glow = isActive ? 30 : 8;
  return (
    <g transform={`translate(${x},${y})`} opacity={appear}>
      <circle r={NODE_R + 4} fill={color} opacity={0.08} />
      <circle r={NODE_R} fill="#1E293B" stroke={color} strokeWidth={isActive ? 3 : 1.5} />
      {isActive && <circle r={NODE_R - 4} fill={color} opacity={0.4} />}
    </g>
  );
}

export const NeuralNetVideo = () => {
  const frame = useCurrentFrame();
  const titleAppear = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#0F172A', fontFamily: 'Inter, Arial, sans-serif' }}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', opacity: titleAppear }}>
        <div style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid #A855F7', color: '#A855F7', padding: '4px 16px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 2, display: 'inline-block', marginBottom: 8, textTransform: 'uppercase' }}>Deep Learning</div>
        <div style={{ fontSize: 38, fontWeight: 900, color: '#F1F5F9' }}>Neural Networks</div>
      </div>

      {/* SVG Network */}
      <svg width="840" height="500" style={{ position: 'absolute', top: 110, left: 100 }}>
        {/* Edges */}
        {[0, 1, 2].map(li => <Edges key={li} frame={frame} fromLayer={li} toLayer={li + 1} />)}
        {/* Nodes */}
        {LAYERS.map((layer, li) =>
          layer.nodes > 0 && Array.from({ length: layer.nodes }).map((_, ni) => (
            <Node key={`${li}-${ni}`} x={LAYER_X[li]} y={getNodeY(li, ni)} color={layer.color} frame={frame} delay={li * 12 + ni * 6} label={layer.label} />
          ))
        )}
        {/* Layer labels */}
        {LAYERS.map((layer, li) => {
          const labelOpacity = interpolate(frame, [li * 12, li * 12 + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <text key={li} x={LAYER_X[li]} y={480} textAnchor="middle" fill={layer.color} fontSize={14} fontWeight="700" opacity={labelOpacity} fontFamily="Inter, Arial, sans-serif">
              {layer.label}
            </text>
          );
        })}
        {/* Data pulse line */}
        {frame > 60 && (() => {
          const t = interpolate(frame, [60, 280], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const px = 120 + t * 600;
          return <line x1={px} y1={60} x2={px} y2={440} stroke="#38BDF8" strokeWidth={2} strokeOpacity={0.5} strokeDasharray="6 4" />;
        })()}
      </svg>

      {/* Labels: input / output */}
      {frame > 40 && (
        <div style={{ position: 'absolute', left: 80, top: 340, color: '#94A3B8', fontSize: 13, textAlign: 'center', opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateRight: 'clamp' }) }}>
          <div style={{ marginBottom: 4 }}>📝</div>Raw Text
        </div>
      )}
      {frame > 100 && (
        <div style={{ position: 'absolute', right: 80, top: 340, color: '#34D399', fontSize: 13, textAlign: 'center', opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: 'clamp' }) }}>
          <div style={{ marginBottom: 4 }}>✅</div>Prediction
        </div>
      )}

      {/* Bottom note */}
      <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center', color: '#475569', fontSize: 13, opacity: interpolate(frame, [350, 380], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        GPT-4 has ~1.8 trillion parameters across its layers
      </div>
    </AbsoluteFill>
  );
};
