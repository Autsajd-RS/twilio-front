import axios from 'axios';
import { SendMessageParams } from 'pages/SendMessage';
import { VerifyParams } from 'pages/Verify';

const API_URL = 'http://localhost:30000';

export const sendMessageRequest = (params: SendMessageParams) =>
  axios.post(`${API_URL}/send-message`, params);

export const verifyRequest = ({ username, ...params }: VerifyParams) =>
  axios.post(`${API_URL}/verify/${username}`, params);
