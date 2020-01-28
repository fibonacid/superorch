import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function blink(el) {
  let timeline = gsap.timeline();

  timeline.set(el, {
    backgroundColor: `rgba(25, 25, 255, 0)`,
    duration: 0.0
  });

  timeline.to(el, {
    backgroundColor: `rgba(25, 25, 255, 1)`,
    duration: 0.25
  });

  timeline.to(el, {
    backgroundColor: `rgba(25, 25, 255, 0)`,
    duration: 1.0
  });
}

export function EvaluatedSpan({ entityKey, contentState, children }) {
  const ref = useRef();

  const entity = contentState.getEntity(entityKey);
  const { evaluatedTimes } = entity.data;

  useEffect(
    function() {
      if (typeof evaluatedTimes !== "undefined") {
        blink(ref.current);
      }
    },
    [evaluatedTimes]
  );

  return <span ref={ref} children={children} />;
}
