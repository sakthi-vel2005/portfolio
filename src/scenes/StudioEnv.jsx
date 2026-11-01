import { Environment, Lightformer } from '@react-three/drei';

// Procedural studio lighting: no HDR download, works offline, baked once.
export default function StudioEnv() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={5} color="#8466ff" position={[-5, 2, 3]} scale={[8, 3, 1]} />
      <Lightformer form="rect" intensity={4} color="#3f7dff" position={[5, 3, -2]} scale={[6, 3, 1]} />
      <Lightformer form="ring" intensity={3} color="#ff8a3d" position={[0, -4, 2]} scale={4} />
      <Lightformer form="rect" intensity={2.5} color="#ffffff" position={[0, 5, 5]} scale={[10, 1, 1]} />
    </Environment>
  );
}
