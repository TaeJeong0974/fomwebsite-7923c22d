import { MAC_TITLE_FONT } from "./MacOS";

interface MacConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const MacConfirmDialog = ({ message, onConfirm, onCancel }: MacConfirmDialogProps) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
    <div
      className="border-[3px] border-black bg-white p-1 min-w-[280px] max-w-[360px]"
      style={{ boxShadow: "4px 4px 0px #000" }}
    >
      {/* Inner border */}
      <div className="border-2 border-black p-5">
        <p
          className="text-center text-xs font-bold mb-5 whitespace-pre-line"
          style={MAC_TITLE_FONT}
        >
          {message}
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-1.5 text-xs font-bold border border-black bg-white hover:bg-black hover:text-white transition-none"
            style={MAC_TITLE_FONT}
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-1.5 text-xs font-bold border-[3px] border-black bg-white hover:bg-black hover:text-white transition-none"
            style={MAC_TITLE_FONT}
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default MacConfirmDialog;
