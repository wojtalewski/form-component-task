import formatString from 'format-string-by-pattern'

export const formatOnlyNumbersPreparationTime = (anyString: string) => {
  const onlyNumbers = anyString.replace(/[^\d]/g, '')

  return formatString('99:99:99', onlyNumbers)
}
