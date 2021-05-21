<template>
  <div class="order-delivery">
      <div class="order__title">Информация для доставки</div>
      <form class="order-form" @submit.prevent="someAction">

            <div class="form-group">
                <label class="form-label" for="order-name">Получатель</label>
                <input type="text" 
                    class="form-control" 
                    v-bind:class="{'error' : $v.name.$error}" 
                    v-model="name" 
                    @blur="$v.name.$touch()" 
                    id="order-name" 
                    placeholder="ФИО"
                >
                <div class="form-error" v-if="$v.name.$error">
                    <template v-if="!$v.name.minLength">
                        Длина имени не должна превышать {{ $v.name.$params.minLength.min }} символов
                    </template>
                    <template v-else-if="!$v.name.alpha">
                        Имя должно содержать только буквы
                    </template>
                    <template v-else>
                        Имя обязательно для заполнения
                    </template>
                </div>
            </div>
            <br>
            <div class="form-group">
                <label class="form-label" for="order-city">Адрес</label>
                <autocomplete
                    :search="searchCity"
                    @submit="updateCity"
                    placeholder="Город"
                    aria-label="Город"
                    id="order-city"
                    @blur="$v.city.$touch()" 
                    v-bind:class="{'error' : $v.city.$error}" 
                ></autocomplete>
                <div class="form-error" v-if="$v.city.$error">
                    Поле обязательно к заполнению
                </div>
            </div>
            <div class="form-group">
                <input 
                    type="text" 
                    class="form-control" 
                    v-model="address" 
                    @blur="$v.address.$touch()" 
                    id="order-address" 
                    placeholder="Адрес"
                    v-bind:class="{'error' : $v.address.$error}" 
                >
                <div class="form-error" v-if="$v.address.$error">
                    Поле обязательно к заполнению
                </div>
            </div>
            <div class="form-row">
                <div class="form-left">
                    <div class="form-group">
                        <v-select 
                            :options="countryList" 
                            placeholder="Страна"
                            name="country" 
                            id="order-country" v-model="country"
                            v-bind:class="{'error' : $v.country.$error}" 
                        >
                            <template #open-indicator="{ attributes }">
                                <span v-bind="attributes"><img src="@/assets/img/select.svg" alt=""></span>
                            </template>
                        </v-select>
                        <div class="form-error" v-if="$v.country.$error">
                            Поле обязательно к заполнению
                        </div>
                    </div>
                </div>
                <div class="form-right">
                    <div class="form-group">
                        <input 
                            type="text" 
                            class="form-control" 
                            v-model="index" 
                            @blur="$v.index.$touch()" 
                            id="order-index" 
                            placeholder="Индекс"
                            v-bind:class="{'error' : $v.index.$error}" 
                        >
                        <div class="form-error" v-if="$v.index.$error">
                            Поле обязательно к заполнению
                        </div>
                    </div>
                </div>
            </div>

            <button class="order-form__btn btn btn-green" type="submit">Продолжить</button>
      </form>
  </div>
</template>

<script>
    import { required, maxLength, minLength } from 'vuelidate/lib/validators';
    import Autocomplete from '@trevoreyre/autocomplete-vue'
    
    export default {
        name: 'OrderDelivery',
        props: ['combinationData'],
        data() {
            return {
                name: null,
                city: null,
                address: null,
                country: null,
                index: null,
                cityList: ['Москва', 'Новосибирск', 'Омск'],
                countryList: ['Россия', 'Китай', 'Казахстан', 'США']
            };
        },
        components: {
            Autocomplete
        },
        methods: {
            someAction() {
                if(!this.$v.$invalid){
                    this.$emit('combinationData', {
                        name: this.name,
                        city: this.city,
                        address: this.address,
                        country: this.country,
                        index: this.index
                    });
                } else {
                   this.$v.$touch()
                }
            },
            
            searchCity(input) {
                this.city = input;
                if (input.length < 1) { return [] }
                return this.cityList.filter(country => {
                    return country.toLowerCase()
                    .startsWith(input.toLowerCase())
                });
            },
            updateCity(result) {
                this.city = result;
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(4),
                alpha: val => /[А-яЁё\s]+/g.test(val),
            },
            city: {
                required,
            },
            address: {
                required,
            },
            country: {
                required,
            },
            index: {
                required,
            },
        },
    }
</script>
