<template>
    <!-- @submit.stop => qdo for submetido, eu paro -->
    <form 
        @submit.stop.prevent="addTodo" 
        class="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3">

        <input 
            v-model="title"
            placeholder="Adicione um novo item ..." type="text"
            class="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal py-3 pr-3"
        >

        <button class="text-green-400 text-xs font-semibold focus:outline-none" type="submit">
            ADICIONAR
        </button>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {

    setup() {
        const title = ref('') //inicializo com ('') vazio
        const store = useStore()

        const addTodo = () => {
            if(!title.value){  //Se tiver vazio, não add nada
                return false;
            }
            store.dispatch('addTodo', {
                title: title.value,
                completed: false
            }).finally(() => {
                title.value = ''
            })
        }

        return{
            title,
            addTodo
        }
    },

} // Fim da export default
</script>