// hooks/useVapi.ts
import { useRef, useState, useEffect, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

export function useVapi() {
  const vapiRef = useRef<Vapi | null>(null);
  const [active, setActive] = useState(false);
  const [transcript, setTranscript] = useState<string>('');

  useEffect(() => {
    if (!vapiRef.current) {
      const v = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
      vapiRef.current = v;

      v.on('call-start', () => setActive(true));
      v.on('call-end', () => setActive(false));
      v.on('message', msg => {
        if (msg.type === 'transcript') {
          setTranscript(prev => prev + `\n${msg.role}: ${msg.transcript}`);
        }
      });
    }
  }, []);

  const start = useCallback((assistantId: string, overrides?: any) => {
    vapiRef.current!.start(assistantId, overrides);
  }, []);

  const stop = useCallback(() => {
    vapiRef.current?.stop();
  }, []);

  return { active, transcript, start, stop };
}
