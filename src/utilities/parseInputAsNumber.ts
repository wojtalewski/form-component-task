import { FormObject } from '../interfaces/interfaces'

const parseInputAsNumber = (formObj: FormObject) => {
  let parsedObject = { ...formObj }

  if (formObj.no_of_slices && formObj.diameter) {
    parsedObject = {
      ...formObj,
      no_of_slices: +formObj.no_of_slices,
      diameter: +formObj.diameter,
    }
  } else if (formObj.slices_of_bread) {
    parsedObject = {
      ...formObj,
      slices_of_bread: +formObj.slices_of_bread,
    }
  } else if (formObj.spiciness_scale) {
    parsedObject = {
      ...formObj,
      spiciness_scale: +formObj.spiciness_scale,
    }
  }

  return parsedObject
}

export default parseInputAsNumber
