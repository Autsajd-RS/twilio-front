import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SendMessageParams } from 'pages/SendMessage';
import { VerifyParams } from 'pages/Verify';
import { sendMessageRequest, verifyRequest } from './request';
import { RootState } from './store';

interface SendMessageState {
  currentUserMessage?: string;
  sendMessageLoading: boolean;
}

const initialState: SendMessageState = {
  currentUserMessage: undefined,
  sendMessageLoading: false
};

export const sendMessage = createAsyncThunk(
  'message/sendMessage',
  async (params: SendMessageParams) => {
    const { data } = await sendMessageRequest(params);

    return { data, params };
  }
);

type Error = {
  response: any;
};

export const verify = createAsyncThunk(
  'message/verify',
  async (params: VerifyParams, { rejectWithValue }) => {
    try {
      const { data } = await verifyRequest(params);

      return data;
    } catch (err) {
      return rejectWithValue((err as Error).response.data.message);
    }
  }
);

const sendMessageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => ({
        ...state,
        sendMessageLoading: false,
        currentUserMessage: action.payload.params.username
      }))
      .addCase(sendMessage.rejected, (state) => ({
        ...state,
        sendMessageLoading: false
      }))
      .addCase(sendMessage.pending, (state) => ({
        ...state,
        sendMessageLoading: true
      }));
  }
});

export default sendMessageSlice.reducer;
export const selectMessageState = (state: RootState) => state.sendMessage;
