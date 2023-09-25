export class BaseApiService {
    /** @param {AxiosInstance} httpClient */
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
}