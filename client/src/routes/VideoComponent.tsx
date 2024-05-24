import React, { RefObject } from 'react';
import { Rnd } from 'react-rnd';

interface VideoComponentProps {
  currentUserVideoRef: RefObject<HTMLVideoElement>;
  remoteVideoRef: RefObject<HTMLVideoElement>;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ currentUserVideoRef, remoteVideoRef }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.clientHeight;
      return parentHeight - 120; // Height of the current user's video
    }
    return 0;
  };

  return (
    <div ref={parentRef}>
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 200,
          height: 160,
        }}
        minWidth={320}
        minHeight={240}
        bounds="window" // Make sure it stays within the window
        className="video-container"
      >
        <video ref={remoteVideoRef} className="video-element" />
        <Rnd
          default={{
            x: 0,
            y: calculatePosition(),
            width: 160,
            height: 120,
          }}
          minWidth={80}
          minHeight={60}
          bounds="parent" // Ensure it stays within the parent Rnd
          className="floating-video-container"
        >
          <video ref={currentUserVideoRef} className="video-element" />
        </Rnd>
      </Rnd>
    </div>
  );
};

export default VideoComponent;
