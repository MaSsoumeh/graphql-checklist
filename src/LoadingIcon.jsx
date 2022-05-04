import React from "react";
import "./global.css";

function LoadingIcon() {
  return (
    <div style={{ textAlign: "center" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        className="loading"
        x="0"
        y="0"
        version="1.1"
        viewBox="0 0 100 100"
        xmlSpace="preserve"
        style={{
          width: "50%",
          height: "50%",
          backgroundSize: "initial",
          backgroundRepeatY: "initial",
          backgroundRepeatX: "initial",
          backgroundPositionY: "initial",
          backgroundPositionX: "initial",
          backgroundOrigin: "initial",
          backgroundColor: "initial",
          backgroundClip: "initial",
          backgroundAttachment: "initial",
          WebkitAnimationPlayState: "running",
          animationPlayState: "running",
        }}
      >
        <g
          className="ldl-scale"
          style={{
            WebkitTransformOrigin: "50% 50%",
            MsTransformOrigin: "50% 50%",
            transformOrigin: "50% 50%",
            WebkitAnimationPlayState: "running",
            animationPlayState: "running",
          }}
          transform="scale(.8)"
        >
          <path
            fill="#B3B7E2"
            d="M40.5 90.4c-6.2-1.4-12.1-4.2-17.1-8.2l9.4-11.8c3.2 2.6 7 4.4 11 5.3l-3.3 14.7z"
            style={{
              WebkitAnimationPlayState: "running",
              animationPlayState: "running",
            }}
          ></path>
          <path
            fill="#B2E0DA"
            d="M59.4 90.3L56 75.6c4-.9 7.8-2.7 11-5.3l9.4 11.8c-4.9 4-10.8 6.8-17 8.2z"
            style={{
              WebkitAnimationPlayState: "running",
              animationPlayState: "running",
            }}
          ></path>
          <path
            fill="#FFD3A4"
            d="M11.7 67.4c-2.8-5.8-4.2-12-4.2-18.4h15.1c0 4.2.9 8.2 2.7 11.9l-13.6 6.5z"
            style={{
              WebkitAnimationPlayState: "running",
              animationPlayState: "running",
            }}
          ></path>
          <path
            fill="#FFD3A4"
            d="M88.3 67.3l-13.6-6.6c1.8-3.7 2.7-7.7 2.7-11.9v-.1h15.1v.1c0 6.6-1.5 12.8-4.2 18.5z"
            style={{
              WebkitAnimationPlayState: "running",
              animationPlayState: "running",
            }}
          ></path>
          <path
            fill="#B3B7E2"
            d="M25.2 37.1l-13.6-6.5c2.7-5.7 6.8-10.8 11.8-14.8l9.5 11.8c-3.3 2.5-5.9 5.8-7.7 9.5z"
            style={{
              WebkitAnimationPlayState: "running",
              animationPlayState: "running",
            }}
          ></path>
          <path
            fill="#B3B7E2"
            d="M74.6 36.9c-1.8-3.7-4.4-7-7.6-9.5l9.4-11.8c5 3.9 9.1 9 11.8 14.7l-13.6 6.6z"
            style={{
              WebkitAnimationPlayState: "running",
              animationPlayState: "running",
            }}
          ></path>
          <path
            fill="#B2E0DA"
            d="M43.8 22.2L40.4 7.5c3.1-.7 6.3-1.1 9.6-1.1 3.1 0 6.3.3 9.3 1L56 22.2c-2-.4-4-.7-6-.7-2.1 0-4.2.3-6.2.7z"
            style={{
              WebkitAnimationPlayState: "running",
              animationPlayState: "running",
            }}
          ></path>
        </g>
      </svg>
    </div>
  );
}

export default LoadingIcon;
