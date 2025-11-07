import ChatInput from "@/components/chat-input"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <ChatInput />
      </div>
    </div>
  )
}
