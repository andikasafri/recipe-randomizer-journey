import { gsap } from "gsap";

export const animateRecipeCard = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
  );
};