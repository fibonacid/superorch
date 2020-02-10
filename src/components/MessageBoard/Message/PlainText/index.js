import React from "react";
import SpeachBubble from "../../../_miscellaneous/SpeachBubble";
import Header from '../Header';

export default function PlainText({
  direction = "right",
  children,
  username,
  showUsername = false
}) {
  return (
    <SpeachBubble direction={direction} color="white">
      <Header username={username} showUsername={showUsername} />
      {children}
    </SpeachBubble>
  );
}
