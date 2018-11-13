import { apiUrl, headers } from './helper'

export const getCategories = () => (
  fetch ( `${apiUrl}/categories`, { headers } )
    .then( res => res.json() )
)
