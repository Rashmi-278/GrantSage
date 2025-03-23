import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css"; // Tailwind CSS (ensure it's set up in your project)

const AUTONOME_ENDPOINT = "https://autonome.alt.technology/dao-ip-5-mubhwn/YOUR_AGENT_ID/message"; // Replace with actual Agent ID
const AUTH_HEADER = "Basic ZGFvLWlwLTU6VmNEYnp5T2RnVw=="; // dao-ip-5:VcDbzyOdgW

function GrantSageChat() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        AUTONOME_ENDPOINT,
        { text: input },
        {
          headers: {
            Authorization: AUTH_HEADER,
            "Content-Type": "application/json"
          }
        }
      );

      const reply = res.data.text;
      const agentMessage = { role: "agent", text: reply };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (err) {
      console.error("Error from Autonome agent:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F1DE] text-[#3E3F5B] p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">GrantSage 🌿</h1>

        <div className="bg-white shadow rounded-lg p-4 space-y-4 h-[60vh] overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-sm p-2 rounded-lg max-w-[80%] ${
                msg.role === "user"
                  ? "bg-[#8AB2A6] ml-auto text-white"
                  : "bg-[#ACD3A8] text-[#3E3F5B]"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="text-sm">GrantSage is thinking…</div>}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about funding trends, top projects…"
            className="flex-1 px-4 py-2 rounded border border-gray-300"
          />
          <button
            onClick={sendMessage}
            className="bg-[#3E3F5B] text-white px-4 py-2 rounded hover:bg-[#2f304a]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// Bootstrap the app
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<GrantSageChat />);
