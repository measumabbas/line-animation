import { useEffect, useRef, useState } from 'react';

const SnakePathAnimation = () => {
  const pathRef = useRef(null);
  const snakeRef = useRef(null);
  const dotRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [bbox, setBbox] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const path = pathRef.current;
    const snake = snakeRef.current;
    const dot = dotRef.current;

    if (!path || !snake || !dot) return;

    // Calculate path length
    setPathLength(path.getTotalLength());

    // Calculate bounding box of the main path
    const bbox = path.getBBox();
    setBbox(bbox);

    const animate = () => {
      let start = null;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        // Slow down the animation by increasing the duration (e.g., 8000 ms)
        const duration = 12000; // Duration of one full animation cycle
        const progress = (elapsed % duration) / duration;
        const drawLength = progress * pathLength;

        // Adjust strokeDasharray and strokeDashoffset
        snake.style.strokeDasharray = `${pathLength}`;
        snake.style.strokeDashoffset = pathLength - drawLength;

        const point = path.getPointAtLength(drawLength);

        // Constrain the dot position within the bounding box of the main path
        const constrainedX = Math.max(bbox.x, Math.min(bbox.x + bbox.width, point.x));
        const constrainedY = Math.max(bbox.y, Math.min(bbox.y + bbox.height, point.y)) - 1; // Reduce y-axis by 5px

        dot.style.transform = `translate(${constrainedX}px, ${constrainedY}px)`;

        requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    animate();
  }, [pathLength]);

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1440"
        height="421"
        viewBox="0 0 1440 421"
        fill="none"
        className="absolute top-0 left-0"
      >
        
        {/* Main Path */}
        <path
          ref={pathRef}
          d="M-37.19 387.766L-40.5524 385.905C-39.7431 384.579 41.1293 253.785 145.672 261.196L146.254 261.24C201.925 265.386 249.677 302.387 295.849 338.185C342.021 373.984 389.147 410.527 443.386 413.555C515.724 417.668 568.527 334.41 619.549 253.902C672.439 170.537 727.083 84.3071 805.297 88.6336L808.245 88.8532C855.962 92.4067 887.898 117.444 925.072 146.243C974.308 184.703 1030.11 228.372 1140.48 233.67C1225.23 237.772 1287.84 174.719 1348.45 113.764C1407.61 54.2376 1463.5 -1.97464 1536.87 3.48862L1536.56 7.21159C1465.03 1.88412 1409.77 57.4696 1351.25 116.332C1290.08 177.92 1226.8 241.559 1140.3 237.402C1028.85 231.948 972.56 187.981 922.77 149.142C885.494 120.149 853.383 94.8738 805.238 92.2622C729.394 88.0747 675.339 173.3 623.069 255.737C571.424 337.21 517.996 421.433 443.327 417.183C387.841 414.138 339.951 376.901 293.595 340.976C247.862 305.548 200.547 268.916 146.118 264.862L145.575 264.822C43.2672 257.765 -36.4314 386.586 -37.19 387.766Z"
          stroke="url(#paint)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="url(#paint)"
        />
        <defs>
<linearGradient id="paint" x1="859.421" y1="-6.49994" x2="227.988" y2="477.426" gradientUnits="userSpaceOnUse">
<stop offset="0.0524773" stopColor="#1C1644"/>
<stop offset="1" stopColor="#2F1863"/>
</linearGradient>
</defs>

        <defs>
    {/* Linear Gradient Definition */}
    <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#5108EB" />
      <stop offset="100%" stopColor="#A035D1" />
    </linearGradient>
  </defs>
        {/* Snake Line */}
        <path
          ref={snakeRef}
          d="M-37.19 387.766L-40.5524 385.905C-39.7431 384.579 41.1293 253.785 145.672 261.196L146.254 261.24C201.925 265.386 249.677 302.387 295.849 338.185C342.021 373.984 389.147 410.527 443.386 413.555C515.724 417.668 568.527 334.41 619.549 253.902C672.439 170.537 727.083 84.3071 805.297 88.6336L808.245 88.8532C855.962 92.4067 887.898 117.444 925.072 146.243C974.308 184.703 1030.11 228.372 1140.48 233.67C1225.23 237.772 1287.84 174.719 1348.45 113.764C1407.61 54.2376 1463.5 -1.97464 1536.87 3.48862L1536.56 7.21159C1465.03 1.88412 1409.77 57.4696 1351.25 116.332C1290.08 177.92 1226.8 241.559 1140.3 237.402C1028.85 231.948 972.56 187.981 922.77 149.142C885.494 120.149 853.383 94.8738 805.238 92.2622C729.394 88.0747 675.339 173.3 623.069 255.737C571.424 337.21 517.996 421.433 443.327 417.183C387.841 414.138 339.951 376.901 293.595 340.976C247.862 305.548 200.547 268.916 146.118 264.862L145.575 264.822C43.2672 257.765 -36.4314 386.586 -37.19 387.766Z"
          stroke="url(#gradientStroke)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          style={{
            clipPath: `inset(${bbox.y}px ${1440 - bbox.x - bbox.width}px ${421 - bbox.y - bbox.height}px ${bbox.x}px)`
          }}
        />
        
        {/* Moving Dot */}
        <circle
          ref={dotRef}
          cx="0"
          cy="0"
          r="13.0058"
          fill="url(#paint0_linear)"
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
        />
        <defs>
          <linearGradient id="paint0_linear" x1="23.4628" y1="0.0830078" x2="14.4628" y2="23.083" gradientUnits="userSpaceOnUse">
            <stop  stopColor="#A035D1"/>
            <stop offset="1" stopColor="#5108EB"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SnakePathAnimation;
