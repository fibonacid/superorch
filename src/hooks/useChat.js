import { useState, useEffect } from "react";
import useChannel from "./useChannel";
import useMember from "./useMember";
import useChannelMessages from "./useChannelMessages";
import usePrivateMessages from "./usePrivateMessages";

export default function useChat(orchestra, type, id) {
  const [title, setTitle] = useState("");
  const [messages, setMessages] = useState([]);

  const channel = useChannel(orchestra, id);
  const [channelMessages= []] = useChannelMessages(orchestra, id);

  const member = useMember(orchestra, id);
  const [privateMessages = []] = usePrivateMessages(orchestra, id);

  useEffect(
    function() {
      if (type === "channel") {
        channel && setTitle(channel.name);
        channelMessages && setMessages(channelMessages);
      } else if (type === "member") {
        member && setTitle(member.user.name);
        privateMessages && setMessages(privateMessages);
      }
    },
    [channel, channelMessages, member, privateMessages]
  );

  return { title, messages };
}
