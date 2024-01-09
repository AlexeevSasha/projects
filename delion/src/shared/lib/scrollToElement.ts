const getElementPositionFromTop = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  const positionFromTop = rect.top + scrollTop;

  return positionFromTop;
};

export const scrollToElementId = (elementId: string, danger = true, offset = 200) => {
  const targetElement = document.getElementById(elementId);

  if (targetElement) {
    // Calculate the target scroll position, subtracting to scroll higher
    const targetScrollPosition = getElementPositionFromTop(targetElement) - offset;

    targetElement.focus();

    if (danger) {
      targetElement.classList.add('danger-focus');

      setTimeout(() => {
        targetElement.classList.remove('danger-focus');
      }, 2000);
    }

    // Use smooth scrolling to scroll to the calculated position
    window.scrollTo({
      top: targetScrollPosition,
      behavior: 'smooth',
    });
  }
};
