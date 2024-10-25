import { Rule } from 'antd/es/form'
import { t } from 'i18next'
import { isValidPhoneNumber } from 'react-phone-number-input'

// Error messages
const maxLengthMessage = (length: number) => t('rules.maxCharLen', {len: length})
const minLengthMessage = (length: number) => t('rules.minCharLen', {len: length})
const requiredMessage = t('rules.required')
const emailMessage = t('rules.validEmail')
const numberMessage = t('rules.onlyNumbers')
const alfaNumericMessage = t('rules.onlyNumbersAndLetters')
const alfaDot = t('rules.onlyLettersAndFinalDot')

/**
 * Creates a rule for validating the maximum length of a value.
 *
 * @param {number} maxLength - The maximum length allowed.
 * @param {string} [message] - The custom error message to display.
 * @returns {object} - The rule object with the maximum length and error message.
 */
export const maxLengthRule = (maxLength: number, message?: string): object => ({
  max: maxLength,
  message: message ?? maxLengthMessage(maxLength),
})

/**
 * Creates a rule for validating the minimum length of a value.
 *
 * @param {number} minLength - The minimum length allowed.
 * @param {string} [message] - The custom error message to display.
 * @returns {object} - The rule object with the minimum length and error message.
 */
export const minLengthRule = (minLength: number, message?: string): object => ({
  min: minLength,
  message: message ?? minLengthMessage(minLength),
})

/**
 * Creates a rule for validating that a value is required.
 *
 * @param {string} [message] - The custom error message to display.
 * @returns {object} - The rule object with the required flag and error message.
 */
export const requiredRule = (message?: string): object => ({
  required: true,
  message: message ?? requiredMessage,
})

export const noSpecialCharsRule = (message?: string) => ({
  pattern: /^[a-zA-Z0-9 ñÑáÁéÉíÍóÓúÚüÜ]+$/,
  message: message ?? alfaNumericMessage,
})

export const onlyNumberRule = (message?: string) => ({
  pattern: /^[0-9]+$/,
  message: message ?? numberMessage,
})

export const alphabetWithDot = (message?: string) => ({
  pattern: /^[a-zA-Z]+\.$/,
  message: message ?? alfaDot,
})

export const noSpecialCharsPhoneRule = (message?: string): Rule => ({
  pattern: /^\+?[a-zA-Z0-9 ñÑáÁéÉíÍóÓúÚüÜ]+$/,
  message: message ?? alfaNumericMessage,
}
)
//  Rules for different types of inputs

export const onlyNumber = [maxLengthRule(15), onlyNumberRule()]

export const onlyPhone: Rule[] = [maxLengthRule(13), onlyNumberRule()]

export const requiredMediumStringWithDot: Rule[] = [
  maxLengthRule(50),
  requiredRule(),
  alphabetWithDot(),
]

/**
 * Validate that the length of the string is less than 50 and that the field is required.
 * @type {Array<object>}
 */
export const requiredMediumString: Rule[] = [
  maxLengthRule(50),
  requiredRule(),
  noSpecialCharsRule(),
]

/**
 * Validate that the length of the string is less than 50 and that the field is required.
 * @type {Array<object>}
 */
export const requiredFiveCharsString: Rule[] = [
  maxLengthRule(5),
  requiredRule(),
  noSpecialCharsRule(),
]

export const requieredUID: Array<object> = [maxLengthRule(50), requiredRule()]

/**
 * Validate that the length of the string is less than 50 and that the field is required.
 * @type {Array<object>}
 */
export const requiredMediumStringWithSpecialChars: Rule[] = [
  maxLengthRule(50),
  requiredRule(),
]

/**
 * Validate that the length of the string is less than 50 and that the field is required.
 * @type {Array<object>}
 */
export const requiredOnlyNumber: Array<object> = [
  maxLengthRule(15),
  requiredRule(),
  onlyNumberRule(),
]

/**
 * Validate that the length of the string is less than 50 and that the field is required.
 * @type {Array<object>}
 */
export const requiredPhone: Rule[] = [
  maxLengthRule(13),
  requiredRule(),
  onlyNumberRule(),
]

/**
 * Validate that the length of the string is less than 100 and that the field is required.
 * @type {Array<object>}
 */
export const requiredLongString: Array<object> = [
  maxLengthRule(100),
  requiredRule(),
  noSpecialCharsRule(),
]

/**
 * Validate that the length of the string is less than 100 and that the field is required.
 * @type {Array<object>}
 */
export const requiredShortString = [
  maxLengthRule(13),
  requiredRule(),
  noSpecialCharsRule(),
]

/**
 * Validate that the length of the string is less than 100 and that the field is required.
 * @type {Array<object>}
 */
export const requiredVeryShortString = [
  maxLengthRule(10),
  requiredRule(),
  noSpecialCharsRule(),
]

/**
 * Validate that the length of the string is less than 100 and that the field is required.
 * @type {Array<object>}
 */
export const requiredVeryLongString: Array<object> = [
  maxLengthRule(500),
  requiredRule(),
  noSpecialCharsRule(),
]

/**
 * Validate that the field is required.
 * @type {Array<object>}
 */
export const required: Rule = requiredRule()

/**
 * Validate that the email is valid.
 * @type {Array<object>}
 */
export const emailRule = (message?: string): Rule => ({
  type: 'email',
  message: message ?? emailMessage,
})

/**
 * Validate that the email is valid.
 * @type {Array<object>}
 */
export const email: Array<object> = [emailRule()]

/**
 * Validate that the email is valid.
 * @type {Array<object>}
 */
export const requiredEmail: Array<object> = [requiredRule(), emailRule()]

export const validatePhoneNumber: Rule = () => ({
  validator(_, value: any) {
    if (value && !isValidPhoneNumber(value)) {
      return Promise.reject(new Error(t('rules.validPhoneNumber')))
    }
    return Promise.resolve()
  },
})

export const requiredPhoneNumber: Rule = () => ({
  validator(_, value: string) {
    if (!value) {
      return Promise.reject(new Error(t('rules.required')))
    }

    if (value && value.split(' ').length < 2) {
      return Promise.reject(new Error(t('rules.required')))
    }

    return Promise.resolve()
  },
})
