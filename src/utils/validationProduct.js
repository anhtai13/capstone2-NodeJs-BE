export function validatePrice(unit_price) {
    return typeof unit_price === 'number' && unit_price > 1000
}

export const validateIdDetailAndDelete = (id) => {
    return id > 0
}