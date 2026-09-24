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

const MAX_BODY_SIZE = 8_000 // bytes — reject oversized payloads early

export async function POST(request: NextRequest) {
  try {
    // ── 1. Parse body ──────────────────────────────────
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Request body too large.' },
        { status: 413 }
      )
    }

    let body: BookingPayload
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON.' },
        { status: 400 }
      )
    }

    // ── 2. Server-side validation ──────────────────────
    // Normalise primitive types before validation
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

    const errors = validateBooking(payload)

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, error: 'Validation failed.', details: errors },
        { status: 400 }
      )
    }

    // ── 3. Extra server-only checks ────────────────────
    // Reject check-in dates in the past (server clock is authoritative)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (new Date(payload.checkIn) < today) {
      return NextResponse.json(
        { success: false, error: 'Check-in date cannot be in the past.' },
        { status: 400 }
      )
    }

    // Verify accommodation is in the allow-list
    if (!ACCOMMODATION_OPTIONS.includes(payload.accommodation)) {
      return NextResponse.json(
        { success: false, error: 'Invalid accommodation selection.' },
        { status: 400 }
      )
    }

    // ── 4. Write to Firestore ──────────────────────────
    const db = getDb()
    await db.collection('bookingEnquiries').add({
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

    return NextResponse.json({ success: true })
  } catch {
    // Never expose internal errors to the client
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
