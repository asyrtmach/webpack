Vue.component("app-cake", {
    template: `
    <div>
        <h3 class="text-secondary mb-5">Расчет стоимости торта</h3>
        <button type="button" class="btn btn-primary px-3 mb-4" @click="addLayer">Добавить слой</button>
        <div class="row">
            <div class="col">
                <div class="cake">
                    <div class="layer"
                         :class="'layer-'+layer.type"
                         :style="{height: layer.height * 10 + 'px'}"
                         v-for="(layer, i) in layers"
                         @click="changeHeight(i, 1)"
                         @contextmenu.prevent="changeHeight(i, -1)"></div>
                </div>
            </div>
            <div class="col">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th>Тип</th>
                        <th>Высота</th>
                        <th>Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(layer, i) in layers">
                        <td>
                            <select class="form-control" v-model="layer.type">
                                <option :value="key" v-for="(layersType, key) in layersTypes">
                                    {{layersType.label}}
                                </option>
                            </select>
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model.number="layer.height">
                        </td>
                        <td>
                            <div class="btn btn-danger" @click="deleteLayer(i)">Удалить</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-12">
                <div class="alert alert-success">
                    {{price}} руб.
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            layers: [],
            layersTypes: {
                biscuit:{
                    price1sm:50,
                        label: "Бисквитный слой"
                },
                beze:{
                    price1sm:100,
                        label: "Слой безе"
                },
                curd:{
                    price1sm:60,
                        label: "Творожный слой"
                }
            },
            defaultLayersType: "biscuit",
            defaultHeight: 4
        }
    },
    computed: {
        price(){
            console.log(this.layers);
            let sum = 0;
            this.layers.forEach((layer) => {
                sum += layer.height * this.layersTypes[layer.type].price1sm;
            });
            return sum;
        }
    },
    methods: {
        addLayer() {
            this.layers.push({
                type: this.defaultLayersType,
                height: this.defaultHeight,
            })
        },
        changeHeight(i, dh) {
            this.layers[i].height += dh;
        },
        deleteLayer(i) {
            this.layers.splice(i, 1);
        }
    }
});

var app = new Vue({
    el: "#appCake",
});