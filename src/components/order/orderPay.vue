<template>
  <div class="order-delivery">
      <div class="order__title">Оплата</div>
      <form class="order-form" @submit.prevent="someAction">

            <div class="form-group">
                <label class="form-label" for="order-card-name">Имя на карте</label>
                <input type="text" 
                    class="form-control" 
                    v-bind:class="{'error' : $v.cardName.$error}" 
                    v-model="cardName" 
                    @blur="$v.cardName.$touch()" 
                    id="order-card-name" 
                >
                <div class="form-error" v-if="$v.cardName.$error">
                    <template v-if="!$v.cardName.minLength">
                        Длина имени не должна превышать {{ $v.cardName.$params.minLength.min }} символов
                    </template>
                    <template v-else-if="!$v.cardName.alpha">
                        Имя должно содержать только буквы латиницей A-Z
                    </template>
                    <template v-else>
                        Имя обязательно для заполнения
                    </template>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="order-card-number">Номер карты</label>
                <input-mask type="text" 
                    class="form-control" 
                    v-bind:class="{'error' : $v.cardNumber.$error}" 
                    v-model="cardNumber" 
                    @blur="$v.cardNumber.$touch()" 
                    id="order-card-number"
                    placeholder="XXXX XXXX XXXX XXXX XXXX"
                    mask="9999 9999 9999 9999 9999"
                ></input-mask>
                <div class="form-error" v-if="$v.cardNumber.$error">
                    <template v-if="!$v.cardNumber.minLength">
                        Длина номера карты, не должнен быть меньше: {{ $v.cardNumber.$params.minLength.min }} цифр
                    </template>
                    <template v-if="!$v.cardNumber.maxLength">
                        Длина номера карты, не должна превышать: {{ $v.cardNumber.$params.maxLength.max }} цифр
                    </template>
                    <template v-else>
                        Номер карты обязателен к заполнению
                    </template>
                </div>
            </div>

            <div class="form-row">
                <div class="form-left">
                    <div class="form-group">
                        <label class="form-label" for="order-card-dateend">Срок</label>
                        <input-mask type="text" 
                            class="form-control" 
                            v-bind:class="{'error' : $v.cardDateEnd.$error}" 
                            v-model="cardDateEnd" 
                            @blur="$v.cardDateEnd.$touch()" 
                            id="order-card-number" 
                            placeholder="MM/YY"
                            mask="99/99"
                        ></input-mask>
                        <div class="form-error" v-if="$v.cardDateEnd.$error">
                            <template v-if="!$v.cardDateEnd.alpha">
                                Неверный формат. Пример: MM/YY
                            </template>
                            <template v-else>
                                Срок обязателен к заполнению
                            </template>
                        </div>
                        
                    </div>
                </div>
                <div class="form-right">
                    <div class="form-group">
                        <label class="form-label" for="order-card-number">CVV</label>
                        <input type="text" 
                            class="form-control" 
                            v-bind:class="{'error' : $v.cardCvv.$error}" 
                            v-model="cardCvv" 
                            @blur="$v.cardCvv.$touch()" 
                            id="order-card-number" 
                        >
                        <div class="form-error" v-if="$v.cardCvv.$error">
                            <template v-if="!$v.cardCvv.minLength">
                                Длина CVV, не должнна быть меньше: {{ $v.cardCvv.$params.minLength.min }} цифр
                            </template>
                            <template v-if="!$v.cardCvv.maxLength">
                                Длина CVV, не должна превышать: {{ $v.cardCvv.$params.maxLength.max }} цифр
                            </template>
                            <template v-else>
                               CVV обязателен к заполнению
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <button class="order-form__btn btn btn-green" type="submit">Оплатить</button>
      </form>
  </div>
</template>

<script>
    import { required, maxLength, minLength } from 'vuelidate/lib/validators';

    export default {
        name: 'OrderPay',
        props: ['combinationData'],
        data() {
            return {
                cardName: null,
                cardNumber: null,
                cardDateEnd: null,
                cardCvv: null,
            };
        },
        methods: {
            someAction() {
                if(!this.$v.$invalid){
                    this.$emit('combinationData', {
                        cardName: this.cardName,
                        cardNumber: this.cardNumber,
                        cardDateEnd: this.cardDateEnd,
                        cardCvv: this.cardCvv,
                    });
                } else {
                   this.$v.$touch();
                }
            },
        },
        validations: {
            cardName: {
                required,
                minLength: minLength(4),
                alpha: val => /[A-z\s]+/g.test(val),
            },
            cardNumber: {
                required,
                minLength: minLength(24),
                maxLength: maxLength(24),
            },
            cardDateEnd: {
                required,
                alpha: val => /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/g.test(val)
            },
            cardCvv: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(3),
            }
        },
    }
</script>
