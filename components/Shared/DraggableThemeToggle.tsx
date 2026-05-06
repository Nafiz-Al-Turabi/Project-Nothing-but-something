"use client";

import React, { useRef } from "react";
import Draggable from "react-draggable";
import ThemeToggle from "../Theme/Toggle";

const DraggableThemeToggle = () => {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} className="fixed bottom-10 right-10 z-50 cursor-move">
        <ThemeToggle />
      </div>
    </Draggable>
  );
};

export default DraggableThemeToggle;