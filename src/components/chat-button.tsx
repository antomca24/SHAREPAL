import { ChatIcon } from "./icons";

export function ChatButton() {
  return (
    <button
      type="button"
      aria-label="Chat with us"
      className="fixed right-6 bottom-6 z-20 size-16 drop-shadow-lg transition-transform hover:scale-105"
    >
      <ChatIcon className="size-full" />
    </button>
  );
}
