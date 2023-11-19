import { useCallback, useRef, useState } from "react";
import {
  ScrollMenu,
  type VisibilityContext,
} from "react-horizontal-scrolling-menu";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

type TableScrollContainerProps = {
  children: React.ReactNode;
};

const TableScrollContainer = ({ children }: TableScrollContainerProps) => {
  const { dragStart, dragStop, dragMove } = useDrag();
  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  return (
    <ScrollMenu
      onWheel={onWheel}
      // @ts-expect-error override event type
      onMouseDown={() => dragStart}
      onMouseUp={() => dragStop}
      onMouseMove={handleDrag}
    >
      {/* @ts-expect-error override children type */}
      {children}
    </ScrollMenu>
  );
};

export default TableScrollContainer;

function useDrag() {
  const [clicked, setClicked] = useState(false);
  const [dragging, setDragging] = useState(false);
  const position = useRef(0);

  const dragStart = useCallback((ev: MouseEvent) => {
    position.current = ev.clientX;
    setClicked(true);
  }, []);

  const dragStop = useCallback(
    () =>
      // NOTE: need some delay so item under cursor won't be clicked
      window.requestAnimationFrame(() => {
        setDragging(false);
        setClicked(false);
      }),
    [],
  );

  const dragMove = (ev: React.MouseEvent, cb: (posDif: number) => void) => {
    const newDiff = position.current - ev.clientX;

    const movedEnough = Math.abs(newDiff) > 5;

    if (clicked && movedEnough) {
      setDragging(true);
    }

    if (dragging && movedEnough) {
      position.current = ev.clientX;
      cb(newDiff);
    }
  };

  return {
    dragStart,
    dragStop,
    dragMove,
    dragging,
    position,
    setDragging,
  };
}

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isTouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
