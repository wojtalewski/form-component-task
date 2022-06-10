import axios from 'axios'

import { FormObject } from '../interfaces/interfaces'

const URL = 'https://frosty-wood-6558.getsandbox.com:443/dishes'

const postRecipe = async (formObject: FormObject) => {
  const response = await axios.post(URL, formObject)

  return response.data
}

export default postRecipe
