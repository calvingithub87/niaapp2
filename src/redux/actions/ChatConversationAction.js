import { chatServices } from "../../utils/AxiosService";
import { GET_LOADING_HIDE, GET_LOADING_SHOW } from "../constants/commonConstants";
import { CHAT_LIST_SUCCESS, CHAT_USECASE_SUCCESS, GPT_LIST_SUCCESS } from "../constants/chatConstants";
//import GET_GPTS from "../../jsonfiles/get_gpt.json";
//import GET_USECASE from "../../jsonfiles/get_usecase.json";


export const getGptAction = () => async(dispatch) =>{
    try {
        dispatch({type:GET_LOADING_SHOW});
        const response = await chatServices.getGpts();
        //const response = GET_GPTS.gpts;
        dispatch({type:GPT_LIST_SUCCESS, payload: response.data.gpts })
        dispatch({type:GET_LOADING_HIDE});
        return response.data.gpts;
      } catch (error) {
          dispatch({type:GET_LOADING_HIDE});
      }
}

export const getUsecaseAction = (gpt_id) => async(dispatch) =>{
    console.log(gpt_id);
    try {
        dispatch({type:GET_LOADING_SHOW});
        const response = await chatServices.getUsecase(gpt_id);
        // const response = GET_USECASE.usecases;
        dispatch({type:CHAT_USECASE_SUCCESS, payload: response.data.usecases })
        dispatch({type:GET_LOADING_HIDE});
        return response.data.usecases;
      } catch (error) {
          dispatch({type:GET_LOADING_HIDE});
      }
}

export const postChatAction = (formData, gpt_id, gpt_name) => async(dispatch) =>{
    console.log(gpt_id + " "+gpt_name);
    try {
        dispatch({type:GET_LOADING_SHOW});
        const response = await chatServices.postChat(formData, gpt_id, gpt_name);
        //dispatch({type:CHAT_LIST_SUCCESS, payload: response.data })
        dispatch({type:GET_LOADING_HIDE});
        return response.data;
      } catch (error) {
          dispatch({type:GET_LOADING_HIDE});
      }
}

export const getChatHistoryAction = (gpt_id, gpt_name) => async(dispatch) =>{
    try {
        dispatch({type:GET_LOADING_SHOW});
        const response = await chatServices.chatHistory(gpt_id, gpt_name);
        console.log(response.data.chat_history);
        //dispatch({type:CHAT_LIST_SUCCESS, payload: response.data.chat_history });
        dispatch({type:CHAT_LIST_SUCCESS, payload: response.data.chat_history })
        dispatch({type:GET_LOADING_HIDE});
        console.log("response.data.chat_history", response.data.chat_history);
        return response.data.chat_history;
      } catch (error) {
          dispatch({type:GET_LOADING_HIDE});
      }
}

export const getUpdateInstructionAction = (gpt_id, gpt_name, usecase_id) => async(dispatch) =>{
    try {
        dispatch({type:GET_LOADING_SHOW});
        const response = await chatServices.updateInstruction(gpt_id, gpt_name, usecase_id);
        dispatch({type:CHAT_LIST_SUCCESS, payload: response.data })
        dispatch({type:GET_LOADING_HIDE});
        return response.data;
      } catch (error) {
          dispatch({type:GET_LOADING_HIDE});
      }
}

export const clearChatHistoryAction = (gpt_id, gpt_name) => async(dispatch) =>{
    try {
        dispatch({type:GET_LOADING_SHOW});
        const response = await chatServices.clearChathistory(gpt_id, gpt_name);
        dispatch({type:CHAT_LIST_SUCCESS, payload: response.data })
        dispatch({type:GET_LOADING_HIDE});
        return response.data;
      } catch (error) {
          dispatch({type:GET_LOADING_HIDE});
      }
}

