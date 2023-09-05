import React, { useEffect, useRef, useState } from "react";
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
    };
    const chats = JSON.parse(JSON.stringify(useSelector(getChats))).reverse();
    const dispatch = useDispatch();
    const currentChat = useSelector(getCurrentChat);
    const chatsStyles = isMenuOpen
        ? "chats-list"
        : "chats-list chats-list_closed";
    const chatsListRef = useRef();
    const [startX, setStartX] = useState(0);

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

    useEffect(()=>{
        const handleTouchStart = (e) => {
                setStartX(e.touches[0].clientX);
        }

        const handleTouchEnd = (e) => {
            if (Math.abs(e.changedTouches[0].clientX - startX) > 50) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchend", handleTouchEnd);

        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchend", handleTouchEnd);
        }
    }, [startX])

    return (
        <div className={chatsStyles} ref={chatsListRef}>
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
