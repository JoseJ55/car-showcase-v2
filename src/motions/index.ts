export const transition = { type: 'spring', duration: 0.8 };

export const slideAnimation = (direction: string, magnitude: number = 100) => ({
  initial: {
    x: direction === 'left' ? -magnitude : direction === 'right' ? magnitude : 0,
    y: direction === 'up' ? magnitude : direction === 'down' ? -magnitude : 0,
    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    x: direction === 'left' ? -magnitude : direction === 'right' ? magnitude : 0,
    y: direction === 'up' ? magnitude : direction === 'down' ? -magnitude : 0,
    transition: { ...transition, delay: 0 },
  },
});

export const fadeAnimation = {
  initial: {
    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
};

export const headTextAnimation = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: 'spring',
    damping: 5,
    stiffness: 40,
    restDelta: 0.001,
    duration: 0.3,
  },
};

export const headContentAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    type: 'spring',
    damping: 7,
    stiffness: 30,
    restDelta: 0.001,
    duration: 0.6,
    delay: 0.2,
    delayChildren: 0.2,
  },
};

export const headContainerAnimation = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
};
