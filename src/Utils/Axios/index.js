import Axios from 'axios';

import { SERVER_URL } from '../../Server/config';

const axios = Axios.create({ baseURL: SERVER_URL });

export default axios;
