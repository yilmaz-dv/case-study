<script setup>
import { onMounted, reactive, ref } from "vue";
import { useCarsStore } from "../store/cars.store";

const store = useCarsStore();

onMounted(() => {
  store.fetchCars()
})

let eur = new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
});
</script>

<template>
  <div class="container">
    <table class="table table-striped table-hover">
        <thead>
        <th>ID</th>
        <th>Car ID</th>
        <th>In Stock</th>
        <th>HP</th>
        <th>Price (€)</th>
        <th>Color</th>
        <th></th>
        </thead>
        <tbody>
            <tr v-for="(item,index) in store.cars" :key="index">
                <td>{{ item.id }}</td>
                <td>{{ item.CarID }}</td>
                <td>{{ item.InStock ? "✅" : "" }}</td>
                <td>{{ item.HP }}</td>
                <td>{{ eur.format(item.Price) }}</td>
                <td class="fwbold">
                  <div class="color-info">
                    <span>{{ item.Color }}</span>
                    <div class="color-info--rect" :style="{background: item.Color}" ></div>
                  </div>
                </td>
                <td>
                  <button @click="store.setEditing(item)" class="edit-btn btn btn-primary">
                    Edit
                  </button>
                </td>
            </tr>
        </tbody>
    </table>
        
  <div v-if="store.editing" class="modal fade show" id="editModal" tabindex="-1" aria-labelledby="editModalLabel">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editModalLabel">Edit</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="store.setEditing(null)"></button>
        </div>
        <div class="modal-body">
          <div class="row py-2 border-bottom">
            <div class="col-md-3 py-2 fw-bold">ID</div>
            <div class="col-md-3 py-2">{{ store.editing.id }}</div>
            <div class="col-md-6 py-2 opacity-50">Not Editable</div>
          </div>
          <div class="row py-2 border-bottom">
            <div class="col-md-3 py-2 fw-bold">Car ID</div>
            <div class="col-md-3 py-2">{{ store.editing.CarID }}</div>
            <div class="col-md-6 py-2 opacity-50">Not Editable</div>
          </div>
          <div class="row py-2 border-bottom">
            <div class="col-md-3 py-2 fw-bold">In Stock</div>
            <div class="col-md-3 py-2">{{ store.editing.InStock ? "✅" : "" }}</div>
            <div class="col-md-6 py-2">
              <input type="checkbox" name="inStock" id="inStock" v-model="store.editing.InStock">
            </div>
          </div>
          <div class="row py-2 border-bottom">
            <div class="col-md-3 py-2 fw-bold">HP</div>
            <div class="col-md-3 py-2">{{ store.editing.HP }}</div>
            <div class="col-md-6 py-2">
              <input class="rounded border-1 p-1" type="number" name="horsePower" id="horsePower" placeholder="Enter HP (100-550)" v-model="store.editing.HP">
            </div>
          </div>
          <div class="row py-2 border-bottom">
            <div class="col-md-3 py-2 fw-bold">Price</div>
            <div class="col-md-3 py-2">{{ eur.format(store.editing.Price) }}</div>
            <div class="col-md-6 py-2">
              € <input class="rounded border-1 p-1" type="number" name="Price" id="Price"  placeholder="Enter Price" v-model="store.editing.Price">
            </div>
          </div>
          <div class="row py-2 border-bottom">
            <div class="col-md-3 py-2 fw-bold">Color</div>
            <div class="col-md-3 py-2">{{ store.editing.Color }}</div>
            <div class="col-md-6 py-2">
              <input type="color" name="colorPicker" id="colorPicker" v-model="store.editing.Color">
            </div>
          </div>
        </div>
        <div class="modal-footer border-0">
            <div v-if="store.editingError" class="col-md-6">
              <small class="not-valid">{{ store.editingError }}</small>
            </div>
            <button @click="store.setEditing(null)" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="store.commitEdit()" type="button" class="btn btn-primary" >Save</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
table { 
	width: 750px; 
	border-collapse: collapse; 
	margin:50px auto;
	}
th { 
	background: #3498db; 
	color: white; 
	font-weight: bold; 
	}
th,td {
    padding: 15px;
    vertical-align: middle;
}
.not-valid{
  position: absolute;
  color: red;
  font-weight: bold;
  bottom: 30px;
  left: 15px;
}
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.30);
}
.color-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  font-family: Consolas;
}
.color-info--rect {
  display: block;
  width: 28px;
  height: 12px;
}
</style>
