export const USER_ID_LENGTH = 3
export const USER_ID_PREFIX_LENGTH = 0
export const USER_ID_REGEX = new RegExp(`^[A-Z]{${USER_ID_PREFIX_LENGTH}}[0-9]{${USER_ID_LENGTH - USER_ID_PREFIX_LENGTH}}$`)
export const MAX_ROOM_PRICE = 10000
export const MIN_ROOM_PRICE = 100
export const USER_ROLES = ['admin','staff','student']