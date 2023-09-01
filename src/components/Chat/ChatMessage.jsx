import hljs from "highlight.js";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getIsBotPrint } from "../../store/chatSlice";
import 'highlight.js/styles/vs2015.css';
// import 'highlight.js/styles/github.css';

const ChatMessage = ({ message, role }) => {
    const [highlitedMessage, setHighlitedMessage] = useState("");
    const isBotPrint = useSelector(getIsBotPrint);
    const textRef = useRef();

    useEffect(() => {
        // if (message.length && role === "assistant") {
        const splitedMessages = message.split("```");
        setHighlitedMessage(
            splitedMessages
                .map((message, index) => {
                    if (index % 2 !== 0) {
                        const splitedMessage = message.split("\n");
                        const filteredMessage = splitedMessage.filter(
                            (_, idx) => idx !== 0
                        );
                        const highlightedCode = hljs.highlight(
                            filteredMessage.join("\n"),
                            {
                                language:
                                    splitedMessage.length > 1 && splitedMessage[0].length
                                        ? splitedMessage[0]
                                        : "javascript",
                            }
                        ).value;
                        return `<pre class='chat-console'>
                                <div class='chat-console__code'>${highlightedCode}</div>
                            </pre>`;
                    }
                    return message;
                })
                .join("")
        );

    }, [message]);

    return (
        <div className="chat__messages__message">
            <div className="chat__messages__message_img">
                {role === "assistant" ? (
                    <img src="./imgs/gpt_img.png" alt="" />
                ) : (
                    "SO"
                )}
            </div>
            <div
                className="chat__messages__message_text"
                ref={textRef}
                dangerouslySetInnerHTML={{ __html: role === 'assistant' ? highlitedMessage : message}}
            >
                {/* {role === "user" && message} */}
            </div>
            {/* {role === 'assistant' ? highlitedMessage : message} */}
            {/* dangerouslySetInnerHTML={{__html: highlitedMessage}} */}
        </div>
    );
};

export default ChatMessage;
