
import { useState } from "react";
import "./App.css";
import Message from "./component/Message";
import Popup from "./component/Popup";


function App() {
  const[popup, setpopup] = useState(true);
  const[username, setusername] = useState("");

  return (
    
    <div className="h-dvh w-full overflow-hidden bg-amber-200 flex items-center justify-center p-4 sm:p-8">

      {/* popup at start */}
      {popup && (
        <Popup 
        onContinue={(name) => {setusername(name);  setpopup(false)}} />
      )}
      {/* chat section */}
      <div className="flex flex-col w-full max-w-2xl h-full max-h-200 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        {/* header */}
        <div className="px-3 py-2.5 border-b-2 border-amber-500 flex items-center justify-between">
          <p className="text-sm font-mono text-gray-700">user typing</p>
          <div className="px-2 py-1 border border-orange-700  rounded-md">
            <p className="text-lg font-normal text-orange-800">{username}</p>
          </div>
          
        </div>

        {/* messages (only this area scrolls) */}
        <div className="flex-1 overflow-y-auto p-2">
          <Message />
        </div>

        {/* input area */}
        <div className="p-1 border-t border-gray-200">
          <div className="relative">
            <input
              className="w-full rounded-md border border-gray-300 pl-3 pr-12 py-2 outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="message..."
            />
            <button
              type="button"
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
