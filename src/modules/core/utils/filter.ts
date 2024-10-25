export const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => {
  const normalizeString = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()

  const normalizedInput = normalizeString(input)
  const normalizedLabel = normalizeString(option?.label ?? '')

  return normalizedLabel.includes(normalizedInput)
}
