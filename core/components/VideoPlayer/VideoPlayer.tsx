import { styled, useTheme } from '@maximeheckel/design-system';
import React from 'react';

interface VideoPlayerProps {
  autoPlay?: boolean;
  poster?: string;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: number;
  height?: number;
  src: string;
}

const StyledVideo = styled('video', {
  margin: '0 auto',
  background: 'var(--maximeheckel-colors-emphasis)',
  borderRadius: 'var(--border-radius-2)',
  border: '4px solid var(--maximeheckel-border-color)',
  maxWidth: '100%',
  height: 'auto',
});

const getDisplayedPoster = (poster: string, dark: boolean) => {
  if (dark) {
    return `/static/posters/${poster}_dark.png`;
  }

  return `/static/posters/${poster}_light.png`;
};

const VideoPlayer = (props: VideoPlayerProps) => {
  const { autoPlay, controls, loop, muted, width, height, poster, src } = props;
  const { dark } = useTheme();
  const [currentPoster, setCurrentPoster] = React.useState<string | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (poster) {
      if (!poster.includes('.png') && !poster.includes('https')) {
        setCurrentPoster(getDisplayedPoster(poster, dark));
      } else {
        setCurrentPoster(poster);
      }
    }
  }, [dark, poster]);

  return (
    <StyledVideo
      autoPlay={autoPlay}
      poster={currentPoster}
      width={width}
      height={height}
      controls={controls}
      loop={loop || false}
      muted={muted}
      playsInline
    >
      <source src={src} type="video/mp4" />
    </StyledVideo>
  );
};

export { VideoPlayer };
