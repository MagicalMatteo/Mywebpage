import React from "react";
import "../styles/imageBanner.css";

interface ImageBannerProps {
  imageUrl: string;
  text: React.ReactNode;
  height?: string; // optional, default height
}

export const ImageBanner: React.FC<ImageBannerProps> = ({
  imageUrl,
  text,
  height = "300px",
}) => {
  return (
    <div className="image-banner" style={{ backgroundImage: `url(${imageUrl})`, height }}>
      <div className="image-banner-text">{text}</div>
    </div>
  );
};
