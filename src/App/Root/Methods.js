import axios from "axios";

export const api_url = 'http://localhost:4000';

export async function getTodosMethod () {
    return await axios.get(api_url+'/todos');
}

export async function deleteTodos (id) {
    return await axios.delete(api_url+`/todos/${id}`)
}
export async function editTodo (id,data) {
    return await axios.put(api_url+`/todos/${id}`,data)
}


export async function getUsers () {
    return await axios.get(api_url+'/users');
}

