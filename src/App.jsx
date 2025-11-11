import { useRef, useState } from "react";
import OpenAI from "openai";
import "./App.css";

const client = new OpenAI({
    baseURL: "https://token.ai.vn/v1",
    apiKey: "sk-a9EBG4GdNLmhBk2_fkpxsCiWutoR1ZfCeNn2NKMTZ1DD8BostLPILlQyYrg",
    dangerouslyAllowBrowser: true
});

function App() {
    const inputRef = useRef();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        const messageWithUserMessage = [
            ...messages,
            {
                role: "user",
                content: message
            }
        ];
        setMessages(messageWithUserMessage);
        setMessage("");
        inputRef.current.focus();

        const chatCompletion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messageWithUserMessage
        });
        const botMessage = chatCompletion.choices[0].message.content;

        setMessages([
            ...messageWithUserMessage,
            {
                role: "assistant",
                content: botMessage
            }
        ]);
    }

    return (
        <main className="main">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/488ceQWoGGw?si=tyhp0-PemXJu-_kC"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>

            <h1 className="heading">Chat UI với React + OpenAI</h1>
            <form
                className="form"
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <input
                    type="text"
                    id="msg"
                    className="input"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    placeholder="Tin nhắn của bạn..."
                    ref={inputRef}
                />
                <button type="submit" className="submit">
                    Gửi tin nhắn
                </button>
            </form>
            <div className="content">
                {messages.length > 0 &&
                    messages.map((message, index) => (
                        <p
                            className={`message ${
                                message.role === "user" ? "user" : "assistant"
                            }`}
                            key={index}
                        >
                            {message.content}
                        </p>
                    ))}
            </div>
        </main>
    );
}

export default App;
