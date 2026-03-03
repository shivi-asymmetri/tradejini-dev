export interface SmoothScrollOptions {
  duration?: number;
  offset?: number;
  easing?: (x: number) => number;
}

export const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

export const easeInOutCubic = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const smoothScrollTo = (
  targetPosition: number,
  options: SmoothScrollOptions = {},
): Promise<void> => {
  const { duration = 1000, offset = 0, easing = easeOutCubic } = options;

  return new Promise((resolve) => {
    const currentPosition = window.pageYOffset;
    const finalTargetPosition = targetPosition + offset;
    const distance = finalTargetPosition - currentPosition;

    if (Math.abs(distance) < 1) {
      resolve();
      return;
    }

    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easing(progress);

      window.scrollTo(0, currentPosition + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animation);
  });
};

export const smoothScrollToElement = (
  element: HTMLElement,
  options: SmoothScrollOptions = {},
): Promise<void> => {
  const elementRect = element.getBoundingClientRect();
  const targetPosition = elementRect.top + window.pageYOffset;

  return smoothScrollTo(targetPosition, options);
};

export const smoothScrollToTop = (
  options: SmoothScrollOptions = {},
): Promise<void> => {
  return smoothScrollTo(0, options);
};
