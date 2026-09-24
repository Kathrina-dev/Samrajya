// ─────────────────────────────────────────────────────────
// POST /api/booking — secure server-side booking enquiry
// ─────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { getDb } from '@/lib/firebase-admin'
import {
  validateBooking,
  sanitize,
  ACCOMMODATION_OPTIONS,
  type BookingPayload,
} from '@/lib/booking'

// TODO(security): Add rate-limiting middleware (e.g. upstash/ratelimit)
// to prevent abuse on this public endpoint.

const MAX_BODY_SIZE = 8_000

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()

  console.log(`[BOOKING ${requestId}] POST /api/booking started`)

  try {
    // ── 1. Parse body ──────────────────────────────────

    const contentLength = request.headers.get('content-length')

    console.log(`[BOOKING ${requestId}] Content-Length:`, contentLength)

    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      console.warn(`[BOOKING ${requestId}] Request body too large`)

      return NextResponse.json(
        { success: false, error: 'Request body too large.' },
        { status: 413 }
      )
    }

    let body: BookingPayload

    try {
      body = await request.json()

      console.log(`[BOOKING ${requestId}] JSON parsed successfully`)
    } catch (error) {
      console.error(`[BOOKING ${requestId}] Failed to parse JSON:`, error)

      return NextResponse.json(
        { success: false, error: 'Invalid JSON.' },
        { status: 400 }
      )
    }

    // ── 2. Server-side validation ──────────────────────

    const payload: BookingPayload = {
      fullName: sanitize(String(body.fullName ?? '')),
      email: sanitize(String(body.email ?? '')).toLowerCase(),
      phone: sanitize(String(body.phone ?? '')),
      checkIn: String(body.checkIn ?? ''),
      checkOut: String(body.checkOut ?? ''),
      adults: Number(body.adults) || 0,
      children: Number(body.children) || 0,
      accommodation: sanitize(String(body.accommodation ?? '')),
      message: sanitize(String(body.message ?? '')),
    }

    // Safe logging — don't log email, phone, message, etc.
    console.log(`[BOOKING ${requestId}] Validating booking:`, {
      hasName: Boolean(payload.fullName),
      hasEmail: Boolean(payload.email),
      hasPhone: Boolean(payload.phone),
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      adults: payload.adults,
      children: payload.children,
      accommodation: payload.accommodation,
      hasMessage: Boolean(payload.message),
    })

    const errors = validateBooking(payload)

    if (Object.keys(errors).length > 0) {
      console.warn(`[BOOKING ${requestId}] Validation failed:`, errors)

      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed.',
          details: errors,
        },
        { status: 400 }
      )
    }

    console.log(`[BOOKING ${requestId}] Validation passed`)

    // ── 3. Extra server-only checks ────────────────────

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (new Date(payload.checkIn) < today) {
      console.warn(
        `[BOOKING ${requestId}] Check-in date is in the past:`,
        payload.checkIn
      )

      return NextResponse.json(
        {
          success: false,
          error: 'Check-in date cannot be in the past.',
        },
        { status: 400 }
      )
    }

    if (!ACCOMMODATION_OPTIONS.includes(payload.accommodation)) {
      console.warn(
        `[BOOKING ${requestId}] Invalid accommodation:`,
        payload.accommodation
      )

      return NextResponse.json(
        {
          success: false,
          error: 'Invalid accommodation selection.',
        },
        { status: 400 }
      )
    }

    console.log(`[BOOKING ${requestId}] Server checks passed`)

    // ── 4. Initialize Firebase ─────────────────────────

    console.log(`[BOOKING ${requestId}] Initializing Firebase Admin...`)

    const db = getDb()

    console.log(`[BOOKING ${requestId}] Firebase Admin initialized`)

    // ── 5. Write to Firestore ──────────────────────────

    console.log(
      `[BOOKING ${requestId}] Writing to Firestore collection: bookingEnquiries`
    )

    const docRef = await db.collection('bookingEnquiries').add({
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      adults: payload.adults,
      children: payload.children,
      accommodation: payload.accommodation,
      message: payload.message,
      status: 'new',
      createdAt: FieldValue.serverTimestamp(),
    })

    console.log(
      `[BOOKING ${requestId}] Firestore write successful. Document ID:`,
      docRef.id
    )

    // ── 6. Success ─────────────────────────────────────

    console.log(`[BOOKING ${requestId}] Booking enquiry completed successfully`)

    return NextResponse.json({
      success: true,
    })
  } catch (error: unknown) {
    // IMPORTANT:
    // Log the actual server error, but don't expose it to the client.

    console.error(`[BOOKING ${requestId}] REQUEST FAILED`)

    if (error instanceof Error) {
      console.error(`[BOOKING ${requestId}] Error name:`, error.name)
      console.error(`[BOOKING ${requestId}] Error message:`, error.message)
      console.error(`[BOOKING ${requestId}] Error stack:`, error.stack)
    } else {
      console.error(`[BOOKING ${requestId}] Unknown error:`, error)
    }

    return NextResponse.json(
      {
        success: false,
        error:
          'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}