import axios from "axios";

import CarsService from "./services/cars.service";

/** @type {AxiosInstance} */
const httpClient = axios.create({
    baseURL: "http://localhost:3000"
})

export const Api = {
    cars: new CarsService(httpClient),
}