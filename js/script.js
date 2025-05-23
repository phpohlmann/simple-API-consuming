document.addEventListener("DOMContentLoaded", function () {
  const headerEl = document.getElementById("main-header");
  const introTargetEl = document.getElementById("intro-animation-target");
  const introSpacerEl = document.getElementById("intro-scroll-spacer");

  // Configuration: How many viewport heights of scrolling should the animation take?
  // 1.0 means animation completes after scrolling 1 full viewport height.
  // 1.5 means 1.5 viewport heights.
  const ANIMATION_SCROLL_DURATION_VH = 1.2;

  let headerHeight = 0;
  let animationScrollPixels = 0; // Total pixels to scroll for the animation to complete

  function setupIntroAnimation() {
    if (!headerEl || !introTargetEl || !introSpacerEl) {
      console.warn(
        "Required elements for intro animation not found. Animation disabled."
      );
      if (introTargetEl) introTargetEl.style.visibility = "visible"; // Ensure it's visible if setup fails
      return;
    }
    headerHeight = headerEl.offsetHeight;

    // Style the intro target for fixed positioning
    introTargetEl.style.position = "fixed";
    introTargetEl.style.top = headerHeight + "px"; // Position below the header
    introTargetEl.style.left = "0";
    introTargetEl.style.width = "100%";
    introTargetEl.style.height = `calc(100vh - ${headerHeight}px)`; // Occupy remaining viewport height
    introTargetEl.style.zIndex = "5"; // Below sticky header (50), above general page content
    introTargetEl.style.willChange = "transform, opacity"; // Hint for browser optimization
    // The inner div.container with h-full and flex utilities will center the text content

    // Set the spacer height. This is the crucial part for "locking" scroll.
    // The page content will only appear after scrolling past this spacer.
    animationScrollPixels = window.innerHeight * ANIMATION_SCROLL_DURATION_VH;
    introSpacerEl.style.height = animationScrollPixels + "px";

    // Apply initial animation state (progress = 0)
    handleScrollAnimation();
  }

  function applyAnimationStyles(progress) {
    if (!introTargetEl) return;

    // Clamp progress between 0 (start) and 1 (end of animation)
    progress = Math.min(1, Math.max(0, progress));

    const opacity = 1 - progress;
    const scale = 1 - progress * 0.6; // Example: scales down to 40% (1 - 0.6)

    introTargetEl.style.opacity = opacity.toFixed(2);
    introTargetEl.style.transform = `scale(${scale.toFixed(3)})`;

    // Hide with visibility to remove from accessibility tree and improve performance
    introTargetEl.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
  }

  function handleScrollAnimation() {
    if (!introTargetEl || !introSpacerEl || animationScrollPixels === 0) {
      // If setup hasn't run or elements are missing, do nothing.
      return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop <= animationScrollPixels) {
      // We are within the scroll range for the animation
      const progress = scrollTop / animationScrollPixels;
      applyAnimationStyles(progress);
    } else {
      // Scrolled past the animation range, ensure intro is fully hidden
      applyAnimationStyles(1); // progress = 1
    }
  }

  // Initial setup
  setupIntroAnimation();

  // Re-calculate and re-apply on window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setupIntroAnimation(); // Re-calculates heights and spacer
      handleScrollAnimation(); // Re-applies styles based on current scroll and new dimensions
    }, 100); // Debounce resize event
  });

  // Handle scroll event for animation
  window.addEventListener("scroll", handleScrollAnimation, {
    passive: true,
  });

  // Existing script for current year in footer
  const currentYearEl = document.getElementById("current-year");
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});
