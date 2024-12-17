import { gsap } from "gsap";

export const animateQuotes = () => {
  const quotes = document.querySelectorAll(".meme-quote");
  if (!quotes.length) return;
  
  gsap.to(quotes, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.3,
    ease: "power3.out",
  });
};

export const animateRecipeCard = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
  );
};

export const transitionStages = (
  fromStage: HTMLElement,
  toStage: HTMLElement
) => {
  gsap.to(fromStage, {
    opacity: 0,
    y: -50,
    duration: 0.5,
    onComplete: () => {
      fromStage.style.display = "none";
      toStage.style.display = "block";
      gsap.fromTo(
        toStage,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    },
  });
};