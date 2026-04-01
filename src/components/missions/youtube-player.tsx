'use client';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YouTubePlayer({
  videoUrl,
  onVideoEnd,
}: {
  videoUrl: string;
  onVideoEnd: () => void;
}) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Carrega IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => setIsReady(true);
    } else {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady || !playerRef.current) return;

    let videoId = '';
    try {
      const urlParams = new URLSearchParams(new URL(videoUrl).search);
      videoId = urlParams.get('v') || '';
    } catch {
      videoId = videoUrl.split('/').pop() || '';
    }

    if (!videoId) return;

    const player = new window.YT.Player(playerRef.current, {
      videoId,
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        fs: 0,
      },
      events: {
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            onVideoEnd();
          }
        },
      },
    });

    return () => {
      player.destroy();
    };
  }, [isReady, videoUrl, onVideoEnd]);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 shadow-inner">
      <div ref={playerRef} />
    </div>
  );
}
