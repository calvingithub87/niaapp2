import React, { useState } from 'react';

import ChatConversationComponent from "./ChatConversationComponent";
import ChatFormComponent from './ChatFormComponent';
import { useDispatch } from 'react-redux';
import { clearChatHistoryAction } from '../redux/actions/ChatConversationAction';

const RightPanelComponent = (props) => {
  const [gptId, setGptId] = useState(props.activeGptDetails?._id);
  const [gptName, setGptName] = useState(props.activeGptDetails?.name);
  const dispatch = useDispatch();
  const clearAllChat = () =>{
    const clearChatHistory = dispatch(clearChatHistoryAction(gptId, gptName));
  }
  return (
    <div className="nia-right-panel-container">
          <div className="nia-right-panel-header">
            <div className="nia-right-panel-header-text">{props.selectedUseCase?.name}</div>
            <div className="nia-clear-chat nia-chat-btn" onClick={clearAllChat}>Clear all</div>
          </div>
          <div className="nia-right-panel-content">
            <div className="nia-chat-conatiner">
              <ChatConversationComponent selectedUseCase={props.selectedUseCase} activeGptDetails={props.activeGptDetails} />
            </div>
          </div>
          <div className="nia-right-panel-form">
            <div className="nia-chat-form-container">
              <ChatFormComponent activeGptDetails={props.activeGptDetails} />
            </div>
          </div>
        </div>
  )
}

export default RightPanelComponent