import useSWR from "swr";
import { wrapNumber } from "../../../../utils/wrap-number";
import { onboardingDialogCarouselSlides } from "./content";

export const useOnboardingDialogCarousel = () => {
  const initialState = { isAnimating: false, slide: [0, 0] };

  const { data: state, mutate: setState } = useSWR(
    "useOnboardingCarousel",
    null,
    {
      initialData: initialState,
    }
  );

  const length = onboardingDialogCarouselSlides.length;

  const [slideIndexState, slideDirection] = state?.slide;

  const slideIndex = wrapNumber(0, length, slideIndexState);
  const isLastSlide = slideIndex === length - 1;

  const setSlide = (slide) =>
    setState((prevState) => ({ ...prevState, slide }));

  const cycleSlide = (newSlideDirection) =>
    setState((prevState) => {
      const [prevSlideIndex] = prevState?.slide || initialState?.slide;

      return {
        ...prevState,
        slide: [prevSlideIndex + newSlideDirection, newSlideDirection],
      };
    });

  const setIsAnimating = (isAnimating) =>
    setState((prevState) => ({ ...prevState, isAnimating }));

  return {
    length,
    slideIndex,
    slideDirection,
    isLastSlide,
    cycleSlide,
    setSlide,
    isAnimating: state?.isAnimating,
    setIsAnimating,
  };
};
