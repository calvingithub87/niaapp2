import React from 'react';
import OptionVertical from '/images/options-vertical.svg';
import EditOption from '/images/edit.svg';
import DeleteOption from '/images/delete.svg';
const ChatListComponent = (props) => {

    // Replace the \n with <br/> tag for formatted response
    const formatContent = (content) => {
        return content.split('\n').map((item, index) => (
            <React.Fragment key={index}>
                {item}
                <br />
            </React.Fragment>
        ));
    };

  return (
    <div className='nia-chat-list-item'>
            {props.chatData.role === "user" && <div className='nia-chat-list-q'>
                <div className='nia-chat-question'>{formatContent(props.chatData.content)}</div>
                {/* <div className='nia-chat-action'>
                    <div className='nia-chat-action-btn'><img src={OptionVertical} alt={'Action'} /></div>
                    <div className='nia-chat-action-list'>
                        <ul>
                            <li><img src={EditOption} alt={'Edit'} /><span>Edit</span></li>
                            <li><img src={DeleteOption} alt={'Clear'} /><span>Clear</span></li>
                        </ul>
                    </div>
                </div> */}
            </div> }
            {props.chatData.role === "assistant" && <div className='nia-chat-list-a'>
                <div className='nia-chat-profile'>NIA</div>
                <div className='nia-chat-answer'>
                {formatContent(props.chatData.content)}
                </div>
            </div>}
        </div>
  )
}

export default ChatListComponent