document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loading-screen');
  const progressBar = document.querySelector('.loader-progress-bar');
  
  if (!loader || !progressBar) return;

  // Initialize progress
  let progress = 0;
  const interval = setInterval(() => {
    // Simulate loading progress
    if (progress < 85) {
      progress += Math.random() * 15;
      if (progress > 85) progress = 85;
      progressBar.style.width = `${progress}%`;
    }
  }, 150);

  const hideLoader = () => {
    // Complete the progress bar
    progressBar.style.width = '100%';
    
    // Add a slight delay for smooth transition
    setTimeout(() => {
      loader.classList.add('fade-out');
      
      // Remove from DOM after transition to free resources
      setTimeout(() => {
        loader.remove();
        document.body.style.overflow = ''; // Restore scrolling
      }, 500); // Matches CSS transition duration
    }, 400);
    
    clearInterval(interval);
  };

  // Wait for all assets (LCP, images, etc.) to finish
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }

  // Safety fallback: if load takes too long (e.g., slow network/broken asset)
  setTimeout(() => {
    if (document.getElementById('loading-screen')) {
      hideLoader();
    }
  }, 5000); // 5 seconds maximum wait
});
