import { useCallback } from "react";
import useChannel from "./useChannel";
import useMember from "./useMember";
import useChannelMessages from "./useChannelMessages";
import usePrivateMessages from "./usePrivateMessages";

export default function useChat(orchestra, type, id) {
  const channel = useChannel(orchestra, id);
  const [channelMessages] = useChannelMessages(orchestra, id);

  const member = useMember(orchestra, id);
  const [privateMessages] = usePrivateMessages(orchestra, id);

  const getTitle = useCallback(function() {
    if (type === "channel") {
      return channel?.name;
    }
    if (type === "member") {
      return member?.user?.name;
    }
  }, [channel, member]);

  const getMessages = useCallback(function() {
    if (type === "channel") {
      return channelMessages;
    }
    if (type === "member") {
      return privateMessages;
    }
  }, [channelMessages, privateMessages]);

  return {
    title: getTitle() || "",
    messages: getMessages() || []
  };
}
