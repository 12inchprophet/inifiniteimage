import React from '@blocklet/pages-kit/builtin/react';
import { Box, Typography } from '@blocklet/pages-kit/builtin/mui/material';

export default function ScrollingBanner({
  title = '',
  bgColor = 'black',
  titleColor = 'white',
  speed = 60, // Speed multiplier
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
}) {
  // Collect valid image URLs
  const images = [
    image1?.url || '',
    image2?.url || '',
    image3?.url || '',
    image4?.url || '',
    image5?.url || '',
    image6?.url || '',
    image7?.url || '',
    image8?.url || '',
    image9?.url || '',
    image10?.url || '',
  ].filter((url) => url !== ''); // Filter out empty or undefined values

  // Double the images for seamless scrolling
  const doubledImages = [...images, ...images];

  // Constants for image size and gaps
  const imageWidth = 200; // Width of each image in pixels
  const gapWidth = 20; // Gap between images in pixels

  // Dynamically calculate scroll distance based on user-provided images
  const scrollDistance = images.length * (imageWidth + gapWidth); // Scroll full width of original images
  const totalContentWidth = doubledImages.length * (imageWidth + gapWidth); // Total content width

  // Ensure speed has a valid value (minimum 1)
  const adjustedSpeed = Math.max(speed, 1);
  const animationDuration = (scrollDistance / adjustedSpeed).toFixed(2); // Animation duration in seconds

  // Debugging logs
  console.log('Images Array:', images);
  console.log('Doubled Images Array:', doubledImages);
  console.log('Scroll Distance (User Images):', scrollDistance);
  console.log('Total Content Width:', totalContentWidth);
  console.log('Animation Duration (s):', animationDuration);

  return (
    <Box sx={{ backgroundColor: bgColor, padding: '20px', textAlign: 'center' }}>
      {title && (
        <Typography variant="h5" sx={{ color: titleColor, marginBottom: '10px' }}>
          {title}
        </Typography>
      )}
      <Box
        className="scroll-container"
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          className="scrolling-content"
          sx={{
            display: 'flex',
            gap: `${gapWidth}px`,
            animation: `scroll ${animationDuration}s linear infinite`,
          }}
        >
          {doubledImages.map((imageUrl, index) => (
            <Box
              key={`image-${index}`}
              component="img"
              src={imageUrl}
              alt={`Artist logo ${index + 1}`}
              sx={{
                width: `${imageWidth}px`,
                height: `${imageWidth}px`,
                display: 'inline-block',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// Add keyframes for scrolling dynamically
const styles = document.createElement('style');
styles.innerHTML = `
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100%)); } /* Scrolls full width of user-provided images */
}
`;
document.head.appendChild(styles);
