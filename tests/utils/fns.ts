/**
 * TODO: document this
 */
export const randomTestId = () => `foo-${Date.now()}`

/**
 * TODO: document this
 */
export const randomText = (length: number = 10) => Math.random().toString(16).substr(2, length)
