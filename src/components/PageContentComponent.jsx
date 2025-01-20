import React, { useEffect, useState } from "react";
import RightPanelComponent from "./RightPanelComponent";
import LeftPanelComponent from "./LeftPanelComponent";
import { useDispatch, useSelector } from "react-redux";
import { getGptAction } from "../redux/actions/ChatConversationAction";


const PageContentComponent = (props) => {
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const getGptData = useSelector(state => state.chatListData?.gptList);
  const [activeGptDetails, setActiveGptDetails] = useState({});

  const dispatch = useDispatch();
  
  const selectListHandler = (listData) => {
    setSelectedUseCase(listData);
  }

  const getGpts = async() => {
    const getGptDetails = await dispatch(getGptAction());
  }

  useEffect(()=>{
    getGpts();
  },[]);
  
  useEffect(()=>{
    const activeGpt = getGptData?.filter((item)=>item.description==='Nia')[0] ? getGptData?.filter((item)=>item.description==='Nia')[0] : {};
    console.log(activeGpt);
    setActiveGptDetails(activeGpt);
  },[getGptData]);

  return (
    <div className="nia-body">
      <div
        className={`nia-body-left-panel ${
          props.showLeftPanel ? "nia-show-left-panel" : ""
        }`}
      >
        <div className="nia-left-panel-container">
          <LeftPanelComponent activeGptDetails={activeGptDetails} selectListHandler={selectListHandler} />
        </div>
      </div>
      <div className="nia-body-right-panel">
        <RightPanelComponent selectedUseCase={selectedUseCase} activeGptDetails={activeGptDetails} />
      </div>
    </div>
  );
};

export default PageContentComponent;
