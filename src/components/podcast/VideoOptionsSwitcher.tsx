import { motion } from "framer-motion";

interface VideoOptionsSwitcherProps {
  activeOption: 1 | 2 | 3;
  onOptionChange: (option: 1 | 2 | 3) => void;
}

const options = [
  { id: 1 as const, label: "Mini Player", description: "Floats to corner" },
  { id: 2 as const, label: "Picture-in-Picture", description: "Native browser" },
  { id: 3 as const, label: "Back Button", description: "FAB to scroll up" },
];

const VideoOptionsSwitcher = ({ activeOption, onOptionChange }: VideoOptionsSwitcherProps) => {
  return (
    <div className="glass rounded-xl p-4 mb-6">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
        🧪 Demo: Scroll past video to test each option
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onOptionChange(option.id)}
            className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeOption === option.id
                ? "text-background"
                : "text-foreground/70 hover:text-foreground hover:bg-white/5"
            }`}
          >
            {activeOption === option.id && (
              <motion.div
                layoutId="activeOption"
                className="absolute inset-0 bg-foreground rounded-lg"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              />
            )}
            <span className="relative z-10 flex flex-col items-start">
              <span>{option.label}</span>
              <span className={`text-xs ${activeOption === option.id ? "text-background/70" : "text-muted-foreground"}`}>
                {option.description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoOptionsSwitcher;
