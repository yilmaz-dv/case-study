import {BaseApiService} from "../base.class";

/**
 * @typedef Car
 * @property {string} CarID
 * @property {string} InStock
 * @property {number} HP
 * @property {number} Price
 * @property {string} Color
 */

class CarsService extends BaseApiService {
    /** @returns {Car[]?} */
    async fetchAll() {
        const response = await this.httpClient.get("/cars")
        return response.data
    }

    /** @param {number} id */
    /** @param {Car} patch */
    async update(id, patch) {
        return await this.httpClient.put(`/cars/${id}`, patch)
    }
}

export default CarsService