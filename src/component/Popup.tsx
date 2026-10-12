
type PopUpProp = {
  onContinue: () => void;
};

function Popup({ onContinue }: PopUpProp) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="border rounded-md p-2 flex gap-5 bg-amber-200 shadow-sm">
        <input
          placeholder="name"
          className="rounded-md border border-gray-300 bg-white p-2 outline-none "
        />

        <button
          onClick={onContinue}
          className="rounded-md bg-white p-1 font-mono hover:bg-yellow-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Popup;
