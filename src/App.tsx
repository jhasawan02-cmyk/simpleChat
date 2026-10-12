import "./App.css";

function App() {
  return (
    <div className="h-dvh w-full overflow-hidden bg-amber-200 flex items-center justify-center p-4 sm:p-8">
      {/* chat section */}
      <div className="flex flex-col w-full max-w-2xl h-full max-h-200 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        {/* header */}
        <div className="px-3 py-3 border-b border-gray-400 flex items-center justify-between">
          <p className="text-sm font-mono text-gray-700">user typing</p>
          <p className="font-medium text-md font-mono">user name</p>
        </div>

        {/* messages (only this area scrolls) */}
        <div className="flex-1 overflow-y-auto p-5">chat section</div>

        {/* input area */}
        <div className="p-4 border-t border-gray-200">
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="message..."
          />
        </div>
      </div>
    </div>
  );
}

export default App;
