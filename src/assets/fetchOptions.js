import { getCookie } from './getCookie';

export let fetchOptions =  {
  credentials: "include",
  headers: {
    'Content-Type': 'application/json',
    "X-CSRFToken": getCookie('csrftoken')
  }
}
