import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUpdateInstructionAction, getUsecaseAction } from '../redux/actions/ChatConversationAction';

const LeftPanelComponent = (props) => {
  const chatHead = useSelector((state)=>state.chatListData.chatHead);
  const userData = useSelector((state)=>state.userList.userInfo);
  const [selectedUseCase, setSelectedUseCase] = useState({});
  const [chatHeadList, setChatHeadList] = useState(); //chatHead.length > 0 ? chatHead : chatHeadLists
  const usecaseData = useSelector(state=>state.chatListData.chatUsecase);
  const dispatch = useDispatch();
  const getChatHead = async() =>{
    console.log(props.activeGptDetails);
    const chatHeadListData = props.activeGptDetails?._id && await dispatch(getUsecaseAction(props.activeGptDetails?._id));
  }
  useEffect(()=>{
    getChatHead();
  },[props.activeGptDetails]);

  useEffect(()=>{
    setChatHeadList(usecaseData);
    setSelectedUseCase(usecaseData[0]);
    props.selectListHandler(usecaseData[0]);
  },[usecaseData]);

  const selectUseCase = async(item) => {
    const updateChatCase = await dispatch(getUpdateInstructionAction(props.activeGptDetails?._id, props.activeGptDetails?.name, item._id))
    setSelectedUseCase(item);
    props.selectListHandler(item);
  }



  return (
    <div className='nia-left-panel-container'>
        <div className='nia-left-panel-list'>
            <ul>
                {chatHeadList && chatHeadList.map((item,i)=> <li key={item._id} className={`${item.name === selectedUseCase.name ? 'active' : ''}`} onClick={()=>selectUseCase(item)}>{item.name}</li> )}
            </ul>
        </div>
    </div>
  )
}

export default LeftPanelComponent