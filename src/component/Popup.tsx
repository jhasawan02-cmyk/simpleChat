import { useState } from "react";
import type { Socket } from "socket.io-client";
import type { RefObject } from "react";


type PopUpProp = {
  onContinue: (name: string) => void;
  socket: RefObject<Socket | null>;
};

function Popup({ onContinue, socket }: PopUpProp) {
  const [name, setusername] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) return;

    socket.current?.emit("room1", trimmedName);
    onContinue(trimmedName);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleSubmit} className="border rounded-md p-2 flex gap-2 sm:gap-5 bg-amber-200 shadow-sm w-full max-w-sm">
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setusername(e.target.value)}
          className="rounded-md border border-gray-300 bg-white p-2 text-base sm:text-sm outline-none min-w-0 flex-1"
          required
          autoFocus
        />

        <button
          className="rounded-md bg-white p-1 font-mono hover:bg-yellow-300 shrink-0"
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default Popup;
