export const onlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = [
    'Backspace',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
    'Tab',
    'Enter',
  ]

  if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
    e.preventDefault()
  }
}
