import React, { Fragment, useEffect, useState } from 'react';
import ChatListComponent from './ChatListComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getChatHistoryAction } from '../redux/actions/ChatConversationAction';


const ChatConversationComponent = (props) => {
  const [chatHistory, setChatHistory] = useState([]);
  const getChathistoryData = useSelector(state=>state.chatListData?.chatList);
  const getChatInput = useSelector(state=>state.chatListData?.chatInput);
  const dispatch = useDispatch();

  const getChatHistory = async() =>{
    if(props.activeGptDetails?._id && props.activeGptDetails?.name){
      const chatHistoryData = await dispatch(getChatHistoryAction(props.activeGptDetails?._id, props.activeGptDetails?.name));
      console.log("chatHistoryData", chatHistoryData);
      if (chatHistoryData && chatHistoryData.length > 0) {
        setChatHistory(chatHistoryData);
      } else {
        setChatHistory([]);
      }
    }
  }

  useEffect(()=>{
    getChatHistory();
  },[props.selectedUseCase, props.activeGptDetails]);

  useEffect(()=>{
    setChatHistory(getChathistoryData);
  },[getChathistoryData])



  return (
    <div className='nia-chat-list'>
        {chatHistory.length > 0 && chatHistory.map((chatData, i)=><Fragment key={i}><ChatListComponent chatData={chatData} /></Fragment>) }
        {/* <ChatListComponent />
        <ChatListComponent />
        <ChatListComponent />
        <ChatListComponent /> */}
        {getChatInput ? <ChatListComponent chatData={{role:'user', content: getChatInput}}/> : ''}
    </div>
  )
}

export default ChatConversationComponent