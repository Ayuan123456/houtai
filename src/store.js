import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =new Vuex.Store({
    state:{
        menusList:[]
    },
    mutations:{
        changmen( state, newmen  ){
            state.menusList=newmen
        }
    }
})

export default store