import React, { useEffect, useRef } from "react";
import Chat from "../../Pages/Chats";
import ChatItem from "./ChatItem";
import { useDispatch, useSelector } from "react-redux";
import {
    createChatAsync,
    getChats,
    getCurrentChat,
} from "../../store/chatSlice";
import UserInfo from "./UserInfo";

const ChatsList = ({ setIsMenuOpen, isMenuOpen }) => {
    const svgs = {
        plusSVG: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                className="plus-svg"
            >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
        ),
        xmarkSVG: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
                className="xmark_svg"
            >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
        ),
    };
    const chats = JSON.parse(JSON.stringify(useSelector(getChats))).reverse();
    const dispatch = useDispatch();
    const currentChat = useSelector(getCurrentChat);
    const chatsStyles = isMenuOpen
        ? "chats-list"
        : "chats-list chats-list_closed";
    const chatsListRef = useRef();

    const createChat = () => {
        dispatch(createChatAsync("Чат"));
    };

    const clickHandleOutside = (e) => {
        if (chatsListRef.current && !chatsListRef.current.contains(e.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", clickHandleOutside, true);
        return () => {
            document.removeEventListener("click", clickHandleOutside, true);
        };
    });

    return (
        <div className={chatsStyles} ref={chatsListRef}>
            <div className="chats-list__closeBtn" onClick={() => setIsMenuOpen(false)}>{svgs.xmarkSVG}</div>
            <div className="chats-list__title">Список чатов</div>
            <div className="chats-list__body">
                {chats.map((chat) => (
                    <ChatItem
                        key={chat.id}
                        chat={chat}
                        isActive={currentChat.id === chat.id}
                    />
                ))}
            </div>
            <div className="chats-list__create" onClick={createChat}>
                <div className="chats-list__create__title">
                    Создать новый чат
                </div>
                <div className="chats-list__crate_icon">{svgs.plusSVG}</div>
            </div>
            <UserInfo />
        </div>
    );
};

export default ChatsList;
