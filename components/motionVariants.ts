export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export const imageScale = {
  hidden: { scale: 1.06 },
  visible: { scale: 1, transition: { duration: 0.9, ease: 'easeOut' } },
}
