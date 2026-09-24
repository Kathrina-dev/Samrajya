// ─────────────────────────────────────────────────────────
// Booking Enquiry — shared types, constants & validation
// ─────────────────────────────────────────────────────────

/** Allowed accommodation IDs */
export const ACCOMMODATION_IDS = [
  'cowboy-villa',
  'wooden-villa',
  'jungle-villa',
  'bali-villa',
  'hotel-rooms',
  'suite-rooms',
] as const

export type AccommodationId = (typeof ACCOMMODATION_IDS)[number]

/** Map slug → display name */
export const ACCOMMODATION_MAP: Record<AccommodationId, string> = {
  'cowboy-villa': 'Cowboy Villa',
  'wooden-villa': 'Wooden Villa',
  'jungle-villa': 'Jungle Villa',
  'bali-villa': 'Bali Villa',
  'hotel-rooms': 'Hotel Rooms',
  'suite-rooms': 'Suite Rooms',
}

export const ACCOMMODATION_OPTIONS = Object.values(ACCOMMODATION_MAP)

/** What the client sends to the API */
export interface BookingPayload {
  fullName: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  accommodation: string
  message: string
}

/** What Firestore stores */
export interface BookingDocument extends BookingPayload {
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled'
  createdAt: FirebaseFirestore.FieldValue | Date
}

// ─────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────

export interface ValidationErrors {
  fullName?: string
  email?: string
  phone?: string
  checkIn?: string
  checkOut?: string
  adults?: string
  children?: string
  accommodation?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Allows:
 * +91 98765 43210
 * +91-98765-43210
 * 9876543210
 * (987) 654-3210
 *
 * Validation ultimately checks the number of digits,
 * not formatting characters.
 */
const PHONE_DIGITS_RE = /\d/g

const MIN_PHONE_DIGITS = 10
const MAX_PHONE_DIGITS = 15

const MAX_MESSAGE_LENGTH = 2000
const MAX_NAME_LENGTH = 100

/**
 * Validate a booking payload.
 *
 * Returns an object mapping field → error message.
 * Empty object = valid.
 */
export function validateBooking(
  data: BookingPayload
): ValidationErrors {
  const errors: ValidationErrors = {}

  // ─────────────────────────────────────────────────────
  // Full name
  // ─────────────────────────────────────────────────────

  const name = (data.fullName ?? '').trim()

  if (!name) {
    errors.fullName = 'Please enter your full name.'
  } else if (name.length < 2) {
    errors.fullName = 'Your name must be at least 2 characters.'
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.fullName = `Your name must be under ${MAX_NAME_LENGTH} characters.`
  }

  // ─────────────────────────────────────────────────────
  // Email
  // ─────────────────────────────────────────────────────

  const email = (data.email ?? '').trim()

  if (!email) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  // ─────────────────────────────────────────────────────
  // Phone
  // ─────────────────────────────────────────────────────

  const phone = (data.phone ?? '').trim()
  const phoneDigits = phone.match(PHONE_DIGITS_RE)?.length ?? 0

  if (!phone) {
    errors.phone = 'Please enter your phone number.'
  } else if (phoneDigits < MIN_PHONE_DIGITS) {
    errors.phone = 'Phone number must contain at least 10 digits.'
  } else if (phoneDigits > MAX_PHONE_DIGITS) {
    errors.phone = 'Phone number cannot contain more than 15 digits.'
  } else if (!/^[+\d\s().-]+$/.test(phone)) {
    errors.phone = 'Please enter a valid phone number.'
  }

  // ─────────────────────────────────────────────────────
  // Check-in
  // ─────────────────────────────────────────────────────

  if (!data.checkIn) {
    errors.checkIn = 'Please select your check-in date.'
  } else if (!isValidDateString(data.checkIn)) {
    errors.checkIn = 'Please select a valid check-in date.'
  }

  // ─────────────────────────────────────────────────────
  // Check-out
  // ─────────────────────────────────────────────────────

  if (!data.checkOut) {
    errors.checkOut = 'Please select your check-out date.'
  } else if (!isValidDateString(data.checkOut)) {
    errors.checkOut = 'Please select a valid check-out date.'
  } else if (
    data.checkIn &&
    isValidDateString(data.checkIn) &&
    data.checkOut <= data.checkIn
  ) {
    errors.checkOut = 'Check-out must be after check-in.'
  }

  // ─────────────────────────────────────────────────────
  // Adults
  // ─────────────────────────────────────────────────────

  if (!Number.isInteger(data.adults) || data.adults < 1) {
    errors.adults = 'At least 1 adult is required.'
  }

  // ─────────────────────────────────────────────────────
  // Children
  // ─────────────────────────────────────────────────────

  if (
    !Number.isInteger(data.children) ||
    data.children < 0
  ) {
    errors.children = 'Number of children cannot be negative.'
  }

  // ─────────────────────────────────────────────────────
  // Accommodation
  // ─────────────────────────────────────────────────────

  if (
    !data.accommodation ||
    !ACCOMMODATION_OPTIONS.includes(data.accommodation)
  ) {
    errors.accommodation = 'Please select an accommodation.'
  }

  // ─────────────────────────────────────────────────────
  // Message
  // ─────────────────────────────────────────────────────

  if (data.message && data.message.length > MAX_MESSAGE_LENGTH) {
    errors.message =
      `Message must be under ${MAX_MESSAGE_LENGTH} characters.`
  }

  return errors
}

// ─────────────────────────────────────────────────────────
// Date helper
// ─────────────────────────────────────────────────────────

function isValidDateString(value: string): boolean {
  // Expect YYYY-MM-DD from <input type="date">
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)

  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

// ─────────────────────────────────────────────────────────
// Sanitisation
// ─────────────────────────────────────────────────────────

export function sanitize(value: string): string {
  return (value ?? '').trim().replace(/\s+/g, ' ')
}