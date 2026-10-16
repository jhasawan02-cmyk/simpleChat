import type { Socket } from "socket.io-client";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import "./App.css";
import Message, { type messageType } from "./component/Message";
import Popup from "./component/Popup";
import { connectWS } from "./we";

function App() {
  const socket = useRef<Socket | null>(null);
  const [popup, setpopup] = useState(true);
  const [username, setusername] = useState("");
  const [messages, setMessages] = useState<messageType[]>([]);
  const [input, setInput] = useState("");
  const [mySocketId, setMySocketId] = useState<string>();

  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    socket.current = connectWS();

    const removeTyping = (name: string) => {
      clearTimeout(typingTimers.current[name]);
      delete typingTimers.current[name];
      setTypingUsers((prev) => prev.filter((n) => n !== name));
    };

    socket.current.on("connect", () => {
      setMySocketId(socket.current?.id);
    });

    socket.current.on("roomNotice", (name: string) => {
      console.log(`User ${name} has joined the room.`);
    });

    // for username typing notice
    socket.current.on("typing", (name: string) => {
      setTypingUsers((prev) => (prev.includes(name) ? prev : [...prev, name]));
      clearTimeout(typingTimers.current[name]);
      // auto-remove if no new "typing" event arrives within 2 seconds
      typingTimers.current[name] = setTimeout(() => removeTyping(name), 1000);
    });

    socket.current.on("message", (msg: messageType) => {
      setMessages((prev) => [...prev, msg]);
      removeTyping(msg.senderName);
    });

    return () => {
      Object.values(typingTimers.current).forEach(clearTimeout);
      typingTimers.current = {};
      socket.current?.off("connect");
      socket.current?.off("roomNotice");
      socket.current?.off("typing");
      socket.current?.off("message");
      socket.current?.disconnect();
      socket.current = null;
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.trim()) {
      socket.current?.emit("typing", username);
    }
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const msg: messageType = {
      id: Date.now(),
      senderId: mySocketId ?? "me",
      senderName: username,
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.current?.emit("message", msg);
    setMessages((prev) => [...prev, msg]); // show your own message immediately
    setInput("");
  };

  return (
    <div className="h-dvh w-full overflow-hidden bg-amber-200 flex items-center justify-center p-0 sm:p-4 md:p-8">
      {/* popup at start */}
      {popup && (
        <Popup
          socket={socket}
          onContinue={(name) => {
            setusername(name);
            setpopup(false);
          }}
        />
      )}
      {/* chat section */}
      <div className="flex flex-col w-full max-w-2xl h-full max-h-200 bg-white border border-gray-200 sm:rounded-xl shadow-lg overflow-hidden">
        {/* header */}
        <div className="px-3 py-2.5 border-b-2 border-amber-500 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-base sm:text-lg font-bold text-amber-800 truncate">Chat Application</p>
            <p className="h-5 text-[10px] sm:text-base font-mono text-gray-800 truncate">
              {typingUsers.length === 0
                ? ""
                : typingUsers.length === 1
                  ? `${typingUsers[0]} is typing`
                  : `${typingUsers.join(", ")} are typing`}
            </p>
          </div>

          <div className="px-2 py-1 border border-orange-700 rounded-md min-w-0 max-w-[40%] shrink-0">
            <p className="text-base sm:text-lg font-normal text-orange-800 truncate">{username}</p>
          </div>
        </div>

        {/* messages (only this area scrolls) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 [scrollbar-none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <Message message={messages} mySocketId={mySocketId} />
        </div>

        {/* input area */}
        <div className="p-1 border-t border-gray-200">
          <div className="relative">
            <input
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="w-full rounded-md border border-gray-300 pl-3 pr-12 py-2 text-base sm:text-sm outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="message..."
            />
            <button
              type="button"
              onClick={sendMessage}
              aria-label="Send message"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-yellow-500 text-white hover:bg-yellow-300 active:bg-yellow-300 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
