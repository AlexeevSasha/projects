export function getCursorPosition(parent: Node): number {
  const selection = document.getSelection();
  const range = new Range();
  range.setStart(parent, 0);

  if (selection && selection.anchorNode) {
    range.setEnd(selection.anchorNode, selection.anchorOffset);
  }

  return range.toString().length;
}

export function setCursorPosition(parent: Node, position: number): void {
  let child: Node | null = parent.firstChild;

  while (position > 0 && child !== null) {
    const length = child.textContent?.length || 0;

    if (position > length) {
      position -= length;
      child = child.nextSibling;
    } else {
      if (child.nodeType === Node.TEXT_NODE) {
        const textNode = child as Text;
        document.getSelection()?.collapse(textNode, position);
        return;
      }
      child = child.firstChild;
    }
  }
}
