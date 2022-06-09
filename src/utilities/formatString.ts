import formatString from 'format-string-by-pattern'

export const formatOnlyNumbersPreparationTime = (anyString: string) => {
  const onlyNumbers = anyString.replace(/[^\d]/g, '')

  return formatString('99:99:99', onlyNumbers)
}

export const formatOnlyNumbersInt = (anyString: string) => {
  const onlyNumbers = anyString.replace(/[^\d]/g, '')

  return formatString('99', onlyNumbers)
}

export const formatOnlyNumbersFloat = (anyString: string) => {
  const onlyNumbers = anyString.replace(/[^\d]/g, '')

  return formatString('199.9', onlyNumbers)
}
