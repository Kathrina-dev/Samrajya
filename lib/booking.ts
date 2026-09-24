// ─────────────────────────────────────────────────────────
// Booking Enquiry — shared types, constants & validation
// ─────────────────────────────────────────────────────────

/** Allowed accommodation IDs (used in query-param pre-selection) */
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

/** Display names used in the <select> */
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

/** What Firestore stores (server adds status + timestamp) */
export interface BookingDocument extends BookingPayload {
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled'
  createdAt: FirebaseFirestore.FieldValue | Date
}

// ─────────────────────────────────────────────────────────
// Validation helpers
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
const MAX_MESSAGE_LENGTH = 2000

/**
 * Validate a booking payload.
 * Returns an object mapping field → error message.
 * An empty object means "no errors".
 */
export function validateBooking(data: BookingPayload): ValidationErrors {
  const errors: ValidationErrors = {}

  // Full name
  const name = (data.fullName ?? '').trim()
  if (!name) {
    errors.fullName = 'Full name is required.'
  } else if (name.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.'
  }

  // Email
  const email = (data.email ?? '').trim()
  if (!email) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  // Phone
  const phone = (data.phone ?? '').trim()
  if (!phone) {
    errors.phone = 'Phone number is required.'
  }

  // Check-in
  if (!data.checkIn) {
    errors.checkIn = 'Check-in date is required.'
  } else if (isNaN(Date.parse(data.checkIn))) {
    errors.checkIn = 'Please enter a valid check-in date.'
  }

  // Check-out
  if (!data.checkOut) {
    errors.checkOut = 'Check-out date is required.'
  } else if (isNaN(Date.parse(data.checkOut))) {
    errors.checkOut = 'Please enter a valid check-out date.'
  } else if (data.checkIn && data.checkOut <= data.checkIn) {
    errors.checkOut = 'Check-out must be after check-in.'
  }

  // Adults
  if (data.adults == null || data.adults < 1) {
    errors.adults = 'At least 1 adult is required.'
  }

  // Children (optional, but must be ≥ 0)
  if (data.children != null && data.children < 0) {
    errors.children = 'Children cannot be negative.'
  }

  // Accommodation
  if (!data.accommodation || !ACCOMMODATION_OPTIONS.includes(data.accommodation)) {
    errors.accommodation = 'Please select an accommodation.'
  }

  // Message (optional)
  if (data.message && data.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be under ${MAX_MESSAGE_LENGTH} characters.`
  }

  return errors
}

/** Sanitise a string — trim + collapse internal whitespace */
export function sanitize(value: string): string {
  return (value ?? '').trim().replace(/\s+/g, ' ')
}
