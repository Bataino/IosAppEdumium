<template>
    <div class="d-inline-flex justify-content-between" >
        <icon icon="clarity:star-solid" class="my-auto ms-1 "  v-for="(elem,index) in reviews" :key="index" @click="updateReview(elem)" :class="rate >= index+1 ? 'text-warning': 'text-gray'" />
    </div>
</template>
<script>

export default {
    name:'ReviewStar',
    props:['review','modelValue','editMode'],
    emits: ['update:modelValue'],
    components:{
    },
    data(){
        return { 
            reviews:[1,2,3,4,5],
            rate:0
        }
    },
    methods:{
        updateReview(val){
            if(this.editMode){
                this.$emit('update:modelValue', val);
                this.rate = val
                console.log("update", this.rate)
            }
        }
    },
    created() {
        this.rate = this.review
    }
}
</script>

<style scoped>
    div{ 
        max-width: min-content;
    }
</style>