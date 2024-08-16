import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

export default function Stars() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    init && (
      <Particles
        style={{ width: '100%', height: '100%' }} // Ensure it fills the parent container
        particlesLoaded={particlesLoaded}
        id="tsparticles"
        options={{
          autoPlay: true,
          background: {
            image: 'url(/main.png)',
            size: 'cover',
            position: 'center',
          },
          detectRetina: true,
          fpsLimit: 60,
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: {
                enable: false,
                mode: "attract",
              },
              resize: true,
            },
            modes: {
              attract: {
                distance: 200,
                duration: 0.4,
                speed: 1,
              },
            },
          },
          particles: {
            color: {
              value: "#cecece",
            },
            move: {
              direction: "none",
              enable: true,
              speed: 2,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 100,
            },
            opacity: {
              value: 0.8,
              animation: {
                enable: true,
                speed: 1, // Adjust the speed for fading in and out
                minimumValue: 0.1, // Minimum opacity for fading effect
                sync: true, // Sync opacity animation for all particles
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: 2, // Smaller size for the particles
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 1,
              },
            },
          },
          fullScreen: { enable: false },
          pauseOnBlur: false,
          pauseOnOutsideViewport: true,
        }}
      />
    )
  );
}
