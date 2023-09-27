import {create} from 'zustand';
import { createClient } from "@supabase/supabase-js";
import { authType } from './types';

const supabaseUrl = 'https://yxzbkxbgutkyqlbkybys.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4emJreGJndXRreXFsYmt5YnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NzU1OTIsImV4cCI6MjAxMTM1MTU5Mn0.IGHe2UCGVDY79jBUrg60WB4ZknrL_rnnfHqKndjhi20';
const supabase = createClient(supabaseUrl, supabaseKey);

const useAuthStore = create((set, get) => ({
  authUser: null,
  authStatus: '',
  authLoading: false,
  authError: '',
  todoList: [],

  signUpWithEmail: ({ email, password }) => {
    supabase.auth.signUp({ email, password })
    .then(({ data, error }) => {
      if (error) {
        set({ 
          authStatus: authType.SIGNUP_FAIL,
          authError: error.message,
        })
      } else {
        console.log(`response : ${JSON.stringify(data)}`)
        set({ 
          authStatus: authType.SIGNUP_SUCCESS,
          authUser: data.user,
        })
      }
    });
  },

  signInWithEmail: ({ email, password }) => {
    supabase.auth.signInWithPassword({ email, password })
    .then(({ data, error }) => {
      if (error) {
        set({ 
          authStatus: authType.SIGNIN_FAIL,
          authError: error.message,
        })
      } else {
        console.log(`response : ${JSON.stringify(data)}`)
        set({ 
          authStatus: authType.SIGNIN_SUCCESS,
          authUser: data.user,
        })
      }
    });
  },

  signOut: () => {
    supabase.auth.signOut()
    .then(() => {
      set({ 
        authUser: null,
      })
    })
  },

  // TO DO Select, Add, Delete,
  getTodoList: () => {
    supabase.from('todo').select()
    .then(({ data, error }) => {
      if (error) {
        console.log(`response error : ${JSON.stringify(error)}`);
        set({ 
          authStatus: authType.GETITEMS_FAIL,
          authError: error.message,
        })
      } else {
        console.log(`response data : ${JSON.stringify(data)}`);
        set({ 
          authStatus: authType.GETITEMS_SUCCESS,
          todoList: data,
        })
      } 
    });
  },

  addTodoItem: ({ task }) => {
    supabase.from('todo').insert({
      task,
    })
    .then(({ error }) => {
      if (error) {
        console.log(`response error : ${JSON.stringify(error)}`);
        set({ 
          authStatus: authType.ADDITEM_FAIL,
          authError: error.message,
        })
      } else {
        get().getTodoList();
      }
    });
  },

  editTodoItem: ({ id, task }) => {
    supabase.from('todo').update({
      task,
    })
    .eq('id', id)
    .then(({ error }) => {
      if (error) {
        console.log(`response error : ${JSON.stringify(error)}`);
        set({ 
          authStatus: authType.ADDITEM_FAIL,
          authError: error.message,
        })
      } else {
        get().getTodoList();
      }
    });
  },

  deleteItem: ({ id }) => {
    supabase
    .from('todo')
    .delete()
    .eq('id', id)
    .then(() => {
      get().getTodoList();
    })
  }

}));

export default useAuthStore

