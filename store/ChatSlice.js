
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  messages: [],
  user: null,
  userdata:null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { content, sender, datetime } = action.payload;
      state.messages.push({ content: content,
        datetime:datetime, send_from: sender });
       
    
    },
    setCurrentMessages: (state, action) => {
      state.messages = action.payload;
   
    },
  
    setUser: (state, action) => {
      state.user = action.payload;
   
    },
    clearUser: (state) => {
      state.user = null;
    },
    setUserdata: (state, action) => {
      state.userdata = action.payload;
     
    },   
  },
});

export const { addMessage,setUserdata,setUser,clearUser, setCurrentMessages } =
  chatSlice.actions;

export default chatSlice.reducer;
