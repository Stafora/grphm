<template>
  <div class="order">

      <div v-if="this.currentOrder != this.ORDER_SUCCESS" class="order-breadcrumb">
        <div class="order-breadcrumb__item" v-bind:class="{'active': this.currentOrder == this.ORDER_DELIVERY}">Доставка</div>
        <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.65461 20.4114L10.6903 10.7562" stroke="#979797" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 10.4465L1.34483 1.41079" stroke="#979797" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="order-breadcrumb__item" v-bind:class="{'active': this.currentOrder == this.ORDER_PAY}">Оплата</div>
      </div>

      <OrderDelivery v-if="this.currentOrder == this.ORDER_DELIVERY" @combinationData="combinationData" />
      <OrderPay v-if="this.currentOrder == this.ORDER_PAY" @combinationData="combinationData" />
      <OrderSuccess v-if="this.currentOrder == this.ORDER_SUCCESS" />
      
  </div>
</template>

<script>
    import OrderDelivery from './orderDelivery';
    import OrderPay from './orderPay';
    import OrderSuccess from './orderSuccess';
    export default {
        name: 'Order',
        data() {
            return {
                peopleInfo: {},
                ORDER_DELIVERY: 1,
                ORDER_PAY: 2,
                ORDER_SUCCESS: 3,
                currentOrder: null,
            };
        },
        created() {
            this.currentOrder = this.ORDER_DELIVERY;
        },
        components: {
            OrderDelivery, OrderPay, OrderSuccess
        },
        methods: {
            combinationData(data) {
                this.peopleInfo = Object.assign(this.peopleInfo, data);
                
                switch (this.currentOrder) {
                    case this.ORDER_DELIVERY:
                        this.currentOrder = this.ORDER_PAY;
                        break;
                    case this.ORDER_PAY:
                        this.currentOrder = this.ORDER_SUCCESS;
                        break;
                }

                //result data
                console.log(this.peopleInfo);
            },
            
        }
    }
</script>

<style lang="scss">
    .order{
        background: #FFFFFF;
        box-shadow: 0px 0px 10px #EBF0FF;
        border-radius: 24px;
        width: 420px;
        padding: 20px 40px;
        min-height: 520px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &-delivery, &-pay{
            margin-bottom: auto;
        }

        & > *{
            width: 100%;
        }
        
        &__title{
            font-weight: 300;
            font-size: 26px;
            line-height: 1.2;
            color: #101D94;
            margin-bottom: 20px;
        }
        &-breadcrumb{
            display: flex;
            align-items: center;
            margin-bottom: 35px;

            svg{
                margin: 0px 14px;
            }

            &__item{
                font-size: 12px;
                line-height: 14px;
                color: #979797;

                &.active{
                    color: #101D94;
                }
            }
        }
    }
</style>
