import axios from 'axios';
import querystring from 'querystring';

const isProduction = process.env.NODE_ENV === "production";
const LOCAL_URL = "http://localhost:4000";
const REMOTE_URL = "https://7mel1t1px5.execute-api.us-east-1.amazonaws.com/production";

const BASE_URL = isProduction ? REMOTE_URL : LOCAL_URL;
const URL = `${BASE_URL}/fetch`

export function fetchMessagesBefore({ userId, cookies, before }) {
    const qs = querystring.stringify({ userId, cookies, before });

    return axios.get(`${URL}?${qs}`).then(response => response.data);
}
