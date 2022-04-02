import React from "react";

const VideoIframe = (ID) => {
  const { videoId } = ID;
  return (
    <iframe
      className="video-frame"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export { VideoIframe };
