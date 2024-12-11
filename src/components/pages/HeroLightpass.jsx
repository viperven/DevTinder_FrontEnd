import React, { useEffect, useRef, useState } from 'react';

const HeroLightpass = () => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const frameCount = 148;
  const currentFrame = (index) =>
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
      .toString()
      .padStart(4, '0')}.jpg`;

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  const updateImage = (index) => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const img = new Image();
      img.src = currentFrame(index);
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear the canvas
        context.drawImage(img, 0, 0);
      };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 1158;
    canvas.height = 770;

    // Preload images
    preloadImages();

    // Initial image load
    const img = new Image();
    img.src = currentFrame(1);
    img.onload = () => {
      context.drawImage(img, 0, 0);
      setImageLoaded(true);
    };

    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));

      // Update the image based on scroll
      requestAnimationFrame(() => updateImage(frameIndex + 1));

      // Hide the canvas after the last frame
      if (scrollFraction >= 1) {
        canvas.style.display = 'none'; // Hide canvas when at the end of the scroll
      } else {
        canvas.style.display = 'block'; // Ensure canvas is visible when scrolling
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', onScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div style={{ height: '500vh', backgroundColor: '#000', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '100vw',
          maxHeight: '100vh',
        }}
      />
      {/* Text and Buttons Section */}
      <div
        style={{
          position: 'absolute',
          bottom: '20vh',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Welcome to Our Product</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Scroll to explore more</p>
        <div>
          <button
            style={{
              padding: '15px 30px',
              fontSize: '1rem',
              marginRight: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onClick={() => alert('Sign Up clicked')}
          >
            Sign Up
          </button>
          <button
            style={{
              padding: '15px 30px',
              fontSize: '1rem',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onClick={() => alert('Login clicked')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroLightpass;
