import { useState } from "react";

//message type
type messageType = {
  id: number;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
}


function Message() {
  const[message, setMessage] = useState<messageType[]>([
    //dummy message list 
  {
    id: 1,
    senderId: "user1",
    senderName: "Rahul",
    text: "Hey everyone!",
    time: "10:30 AM",
  },
  {
    id: 2,
    senderId: "me",
    senderName: "You",
    text: "Hey Rahul!",
    time: "10:31 AM",
  },
  {
    id: 3,
    senderId: "user2",
    senderName: "Aman",
    text: "How is the project going?",
    time: "10:32 AM",
  },
  ]);

  return (
    <div className="gap-3 flex flex-col">
      {message.map((message) => {
        const isOwnMessage = message.senderId === "me";


        return (
          <div
            key={message.id}
            className={`flex ${isOwnMessage ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-[75%] rounded-xl px-3 py-2 ${isOwnMessage ? "bg-amber-200" : "bg-gray-100"
                }`}
            >
              {!isOwnMessage && (
                <p className="mb-1 text-xs font-semibold text-orange-700">
                  {message.senderName}
                </p>
              )}
              <p className="wrap-break-words text-sm">{message.text}</p>

              <p className="mt-1 text-right text-xs text-gray-500">
                {message.time}
              </p>
            </div>
          </div>
        );


      })}
    </div>
  );
}

export default Message