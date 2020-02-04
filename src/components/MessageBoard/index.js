import React from 'react';
import styled from 'styled-components/macro';

export default function MessageBoard({ messages }) {
   return (
      <div>
         {messages.map((message, index) => (
            <div key={index}>
               <span>{message.from.user.name} sent: </span>
               <span>{message.body}</span>
            </div>
         ))}
      </div>
   )
}