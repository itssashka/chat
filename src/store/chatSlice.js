import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey, url } from "../API/chatGptAPI";

let controller = null;

export const stopGenerating = () => {
    if(controller) {
        controller.abort();
        controller = null;
    }
}

export const getBotMessage = createAsyncThunk('chat/getBotMessage', async(prompt, {dispatch, getState}) => {
    const messages = getState().chat.messages;
    

    controller = new AbortController();
    const signal = controller.signal;

    try {
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages,
                stream: true,
            }),
            signal,
        });

        console.log(resp);

        let message = '';
        const reader = resp.body.getReader();
        const decoder = new TextDecoder("utf-8");
        while (true) {
            const chunk = await reader.read();
            const { done, value } = chunk;

            if (done) {
                break;
            }

            const decodedChunk = decoder.decode(value);
            const lines = decodedChunk.split("\n");

            //удаляем лишние строки
            const parsedLines = lines
                .map((line) => line.replace(/^data: /, "").trim())
                .filter((line) => line !== "" && line !== "[DONE]")
                .map((line) => JSON.parse(line));

            for (const parsedLine of parsedLines) {
                const { choices } = parsedLine;
                const { delta } = choices[0];
                const { content } = delta;
                if (content) {
                    message +=content;
                    dispatch(changeCurrentMessage(content))
                }
            }            
        }
        dispatch(sendMessageAsync({content: message, role: 'assistant'}));
    } catch (error) {
        if(signal.aborted) {
            dispatch(sendMessageAsync({content: 'Запрос был прерван, повторите отправку', role: 'assistant'}));
        } else {
            dispatch(sendMessageAsync({content: 'Произошла ошибка, попробуйте снова', role: 'assistant'}));
        }

        console.error(error)
        dispatch(setIsFailed(true));
    } finally {

    }
})

export const sendMessageAsync = createAsyncThunk('chat/sendMessageAsync', async({content, role}, {dispatch, getState}) => {
    const newMessage = {
        content: content,
        role: role
    }
    const isFailed = getState().chat.isBotFailed;
    const currentChat = getState().chat.current_chat;

    try{
        // const resp = await axios({
        //     method: 'post',
        //     url: 'api/v1/chat/:id/',
        //     body: newMessage,
        // })
        if(Object.keys(currentChat).length !== 0) {
            dispatch(sendMessage(newMessage));
        } else {
            await dispatch(createChatAsync());
            dispatch(sendMessage(newMessage));
        }

        if(role === 'user') {
            dispatch(getBotMessage(newMessage.content))
        }

        if(role === 'assistant' && !isFailed){
            // const resp = await axios({
            //     method: 'post',
            //     url: 'api/v1/chats/:id/messages/',
            //     body: newMessage,
            // })
        }

    } catch (error) {
        console.error(error);
        dispatch(setIsFailed(true));
    }
    
})

export const createChatAsync = createAsyncThunk('chat/createChatAsync', async (title, {dispatch, getState}) => {
    const chats = JSON.parse(JSON.stringify(getState().chat.chats));
    const newChatId = chats.length ? chats[chats.length - 1].id + 1 : 0;
    const newChat = {
        title: `Чат ` + (newChatId + 1),
        id: newChatId,
        messages: []
    }

    chats.push(newChat)

    
    try {
        await dispatch(createChat({chats, currentChat: newChat}));
        dispatch(openChatAsync(newChatId))
        // const resp = await axios({
        //     method: 'post',
        //     url: 'api/v1/chats/',
        //     body: newChat
        // })

        // if(resp.status === 200) {
        //     dispatch(createChat(resp.data));
        // } else {
        //     throw new Error('Что-то пошло не так');
        // }
    } catch (error) {
        console.error(error);
    }
})

export const openChatAsync = createAsyncThunk('chat/openChatAsync', async(id, {dispatch, getState}) => {
    stopGenerating();
    const timeOut = setTimeout(() => {
        const chats = getState().chat.chats;

        //временно
        const currentChat = chats.find(chat => chat.id === id);
        const messages = currentChat.messages;
        dispatch(openChat({messages, currentChat}));

        clearTimeout(timeOut);
    }, 500)
    

    // try {
    //     const resp = await axios({
    //         method: 'get',
    //         url: 'api/v1/chat/:id/messages',
    //     });

    //     if(resp.statue === 200) {
    //         dispatch(openChat({messages: resp.body, id}))
    //     }
    // } catch (error) {
    //     console.error(error)
    // }
})

export const removeChatAsync = createAsyncThunk('chat/removeChatAsync', async(id, {dispatch, getState}) => {
    const chats = JSON.parse(JSON.stringify(getState().chat.chats));
    const newChats = chats.filter(chat => chat.id !== id);
    const currentChat = getState().chat.current_chat;

    try {
        dispatch(removeChat({newChats,id}));
        // const resp = await axios({
        //     method: 'delete',
        //     url: 'api/v1/chats/:id',
        // })

        // if(resp.status === 200) {
        //     disptach(updateChats)
        // } else {
        //     throw new Error('Что-то пошло не так')
        // }
    }catch (error) {
        console.error(error);
    }
})

const initialState = {
    currentMessage: '',
    lastMessage: {},
    messages: [],
    isBotPrint: false,
    isBotFailed: false,
    chats: [],
    current_chat: {},
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        sendMessage: (state, {payload}) => {
            if(!state.isFailed) {
                state.messages.push(payload);
                state.lastMessage = payload;

                //временно
                state.current_chat.messages.push(payload);

                const chats = JSON.parse(JSON.stringify(state.chats));
                const newChats = chats.map(chat=>{
                    if(chat.id === state.current_chat.id) {
                        chat.messages.push(payload);
                    }
                    return chat;
                })
                state.chats = newChats;
            }          
        },
        changeCurrentMessage: (state, {payload}) => {
            state.currentMessage += payload;
        },
        setIsFailed: (state, {payload}) => {
            state.isFailed = payload;
        },
        updateChats: (state, {payload}) => {
            state.chats = payload;
        },
        removeChat: (state, {payload}) => {
            state.chats = payload.newChats;
            if(payload.id === state.current_chat.id) {
                state.current_chat = {}
                state.messages = [];
            }
        },
        openChat: (state, {payload}) => {
            state.messages = payload.messages;
            state.current_chat = payload.currentChat;
        },
        createChat: (state, {payload}) =>{
            state.chats = payload.chats;
            state.current_chat = payload.currentChat;
        }
    },
    extraReducers: {
        [sendMessageAsync.fulfilled]: (state) => {
            state.currentMessage = '';
        },
        [sendMessageAsync.pending]: (state) => {
            state.currentMessage = '';
            state.isFailed = false;
        },
        [getBotMessage.pending]: (state) => {
            state.isBotPrint = true;
        },
        [getBotMessage.fulfilled]: (state) => {
            state.isBotPrint = false;
        },
        [getBotMessage.rejected]: (state) => {
            state.isBotPrint = false;
            state.isBotFailed = true;
        },

    }
})


export default chatSlice.reducer
export const getMessages = (state) => state.chat.messages;
export const getCurrentMessage = (state) => state.chat.currentMessage;
export const getIsBotPrint = (state) => state.chat.isBotPrint;
export const getChats = (state) => state.chat.chats;
export const getCurrentChat = (state) => state.chat.current_chat;
export const {sendMessage, changeCurrentMessage, setIsFailed, createChat, updateChats, openChat, removeChat} = chatSlice.actions;
