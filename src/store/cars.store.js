import { defineStore } from "pinia";
import { Api } from "@/api";

export const useCarsStore = defineStore('cars', {
    state: () => ({
        cars: [],
        editing: null,
        editingError: null,
    }),
    actions: {
        async fetchCars() {
            this.cars = await Api.cars.fetchAll();
        },
        async commitEdit() {
            try {
                const car = this.editing;
                if (car.HP >= 550 || car.HP <= 100 || !car.Price) {
                    throw new Error('Some parameters are invalid.');
                }

                await Api.cars.update(this.editing.id, this.editing);

                const index = this.cars.findIndex(c => c.id == car.id)
                this.cars[index] = {...car}
                
                this.editing = null;
                this.editingError = null;

            } catch (error) {
                this.editingError = error.message
            }
        },
        setEditing(car) {
            this.editing = car == null ? null : {...car};
        }
    }
})
