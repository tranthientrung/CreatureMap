import axios, {AxiosPromise} from 'axios';

const BASE_URL = 'http://192.168.64.2/CreatureMap';
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
class Network {
  private static instance = new Network();
  constructor() {
    if (Network.instance) {
      throw new Error(
        'Error: Instantiation failed: Use Network.getInstance() instead of new.',
      );
    }
    Network.instance = this;
  }
  public static getInstance(): Network {
    return Network.instance;
  }

  unAuthorizedRequest<T>(
    url: string,
    method: RequestMethod = 'GET',
    data?: object,
    header?: object,
  ): AxiosPromise<T> {
    const response: AxiosPromise<T> = axios({
      method: method,
      url: url,
      baseURL: BASE_URL,
      data: data,
      timeout: 30000,
      headers: {
        ...header,
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
}

export default Network.getInstance();
