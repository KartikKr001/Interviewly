'use client';
import { useVapi } from "./Temp1";

export default function VoiceAssistantWidget() {
  const { active, transcript, start, stop } = useVapi();

  return (
    <div>
      <button onClick={() =>
        start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!, {
          workflowId: process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID,
        })
      }>
        {active ? 'End Call' : 'Start Call'}
      </button>
      <button onClick={stop} disabled={!active}>
        Stop
      </button>
      <pre>{transcript}</pre>
    </div>
  );
}
