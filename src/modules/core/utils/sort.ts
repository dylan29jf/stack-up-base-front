export const sortByField = <T>(array: T[], field: keyof T): T[] => {
  return array.sort((a, b) => {
    if (a[field] < b[field]) {
      return -1
    }
    if (a[field] > b[field]) {
      return 1
    }
    return 0
  })
}

/**
 * Interfaz que representa los parámetros para ordenar una tabla por un campo específico.
 *
 * @template T - El tipo de los objetos que se comparan.
 */
interface ISortTableByField<T> {
  /** El campo por el cual ordenar. */
  field: keyof T
  /** El primer objeto a comparar. */
  a: T
  /** El segundo objeto a comparar. */
  b: T
}

/**
 * Compara dos objetos basados en un campo específico.
 *
 * @template T - El tipo de los objetos que se comparan.
 * @param {ISortTableByField<T>} params - Los parámetros para ordenar.
 * @returns {number} - Retorna -1 si a[field] es menor que b[field], 1 si a[field] es mayor que b[field], y 0 si son iguales.
 *
 * @example
 * // Ejemplo de uso
 * const obj1 = { nombre: 'Alicia', edad: 30 };
 * const obj2 = { nombre: 'Bob', edad: 25 };
 * const resultado = sortTableByField({ field: 'edad', a: obj1, b: obj2 });
 * // resultado será 1 ya que 30 > 25
 */
export const sortTableByField = <T>({
  a,
  b,
  field,
}: ISortTableByField<T>): number => {
  if (a[field] < b[field]) {
    return -1
  }
  if (a[field] > b[field]) {
    return 1
  }
  return 0
}
