import { Composition } from 'remotion';
import { TokenizationVideo } from './TokenizationVideo';
import { NeuralNetVideo } from './NeuralNetVideo';
import { RAGVideo } from './RAGVideo';
import { PromptVideo } from './PromptVideo';
import { AgentsVideo } from './AgentsVideo';
import { LLMVideo } from './LLMVideo';
import { ToolkitVideo } from './ToolkitVideo';

const FPS = 30;
const W = 1280;
const H = 720;

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="TokenizationVideo"
        component={TokenizationVideo}
        durationInFrames={450}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="NeuralNetVideo"
        component={NeuralNetVideo}
        durationInFrames={420}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="RAGVideo"
        component={RAGVideo}
        durationInFrames={450}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="PromptVideo"
        component={PromptVideo}
        durationInFrames={450}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="AgentsVideo"
        component={AgentsVideo}
        durationInFrames={450}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="LLMVideo"
        component={LLMVideo}
        durationInFrames={360}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="ToolkitVideo"
        component={ToolkitVideo}
        durationInFrames={450}
        fps={FPS}
        width={W}
        height={H}
      />
    </>
  );
};
