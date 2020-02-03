import React from 'react';
import useSearchParams from '../../../hooks/useSearchParams';
import ChannelChatView from "./_channel-chat";
import PrivateChatView from "./_private-chat";

export default function OrchestraChatView() {
   const params = useSearchParams();

   const type = params.get("type");
   const id = params.get("id");

   switch(type) {
      case("channel"):
         return <ChannelChatView channelId={id} />
      case("private"):
         return <PrivateChatView memberId={id} />
      default:
         return <div>404</div>
   }
}