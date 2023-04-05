import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    todos: []
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload
    },

    storeTodo(state, payload) { //esse objeto(payload) que está chegando aqui, tem um id
      const index = state.todos.findIndex(todo => todo.id === payload.id)//carregar apenas a informação atual
      
      if(index >= 0){
        state.todos.splice(index, 1, payload) //Splice => permite alterar o conteúdo do array removendo ou substituindo elementos existentes por novos elementos.
      } 
      else {
        state.todos.push(payload) //Para add na primeira posição, trocar o push para unshift
      }
    },

    deleteTodo(state, id) {
      const index = state.todos.findIndex(todo => todo.id === id) //pesquiso o index dele

      if(index >= 0) {
        state.todos.splice(index, 1) //não entra o payload, pq o payload seria um objeto. Se não passa, ele apenas deleta
      }
    },
  },
  actions: {
    getTodos({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          return axios.get('http://localhost:3000/todos')
          .then((response) => {
            commit('storeTodos', response.data)
            resolve()
          })
        }, 1000)
      })
    },

    addTodo({commit}, data) {
      return axios.post('http://localhost:3000/todos', data).then((response) => {
        commit('storeTodo', response.data);
      })
    },

     // Aqui, precisamos passar o id e o data, porém o action só recebe o 2º parâmetro, não dá pra passar 3
    updateTodo({ commit }, {id, data}) { //transformo em objeto e consigo passar id e data
      return axios.put(`http://localhost:3000/todos/${id}`, data).then((response) => {
        commit('storeTodo', response.data)
      }) //Para atualizar, precisamos passar o PUT
    },

    deleteTodo({commit}, id) { 
      return axios.delete(`http://localhost:3000/todos/${id}`).then(() => { //não precisa do response, pq estou passando o id
        commit('deleteTodo', id)
      }) 
    },

  }, // Fim da action
  getters: {

  },
  modules: {
  }
})
