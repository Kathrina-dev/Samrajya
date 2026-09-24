'use client'

import { useState, useEffect, useMemo, Suspense, type FormEvent, type ChangeEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Check, AlertCircle, Loader2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  ACCOMMODATION_IDS,
  ACCOMMODATION_MAP,
  ACCOMMODATION_OPTIONS,
  validateBooking,
  type BookingPayload,
  type ValidationErrors,
  type AccommodationId,
} from '@/lib/booking'

// ─────────────────────────────────────────────────────────
// Form state type
// ─────────────────────────────────────────────────────────
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormData {
  fullName: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  adults: string
  children: string
  accommodation: string
  message: string
}

const INITIAL_FORM: FormData = {
  fullName: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  adults: '1',
  children: '0',
  accommodation: '',
  message: '',
}

// ─────────────────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

const successVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────
function BookingPageContent() {
  const searchParams = useSearchParams()

  const [form, setForm] = useState<FormData>(() => {
    const roomSlug = searchParams?.get('room')
    return {
      ...INITIAL_FORM,
      accommodation: (roomSlug && ACCOMMODATION_IDS.includes(roomSlug as AccommodationId))
        ? ACCOMMODATION_MAP[roomSlug as AccommodationId]
        : INITIAL_FORM.accommodation,
    }
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverError, setServerError] = useState('')

  // Today's date string for min attributes
  const today = useMemo(() => {
    const d = new Date()
    return d.toISOString().split('T')[0]
  }, [])


  // ── Handlers ─────────────────────────────────────────
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    // Clear field error on edit
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name as keyof ValidationErrors]
        return next
      })
    }
  }

  function handleBlur(
  e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) {
  const { name } = e.target

  const payload: BookingPayload = {
    fullName: form.fullName,
    email: form.email,
    phone: form.phone,
    checkIn: form.checkIn,
    checkOut: form.checkOut,
    adults: parseInt(form.adults, 10) || 0,
    children: parseInt(form.children, 10) || 0,
    accommodation: form.accommodation,
    message: form.message,
  }

  const validationErrors = validateBooking(payload)

  const fieldName = name as keyof ValidationErrors

  if (validationErrors[fieldName]) {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: validationErrors[fieldName],
    }))
  }
}

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Build payload
    const payload: BookingPayload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      adults: parseInt(form.adults, 10) || 0,
      children: parseInt(form.children, 10) || 0,
      accommodation: form.accommodation,
      message: form.message,
    }

    // Client-side validation
    const validationErrors = validateBooking(payload)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      // Move focus to the first invalid field
      const firstErrorField = Object.keys(
        validationErrors
      )[0]

      requestAnimationFrame(() => {
        document
          .getElementById(firstErrorField)
          ?.focus()
      })

      return
    }

    setErrors({})
    setStatus('submitting')
    setServerError('')

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong.')
      }

      setStatus('success')
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while sending your enquiry. Please try again.'
      )
      setStatus('error')
    }
  }

  const isSubmitting = status === 'submitting'

  // ── Render ───────────────────────────────────────────
  return (
    <main className="flex-1 w-full bg-background flex flex-col min-h-screen">
      <Navbar />

      <section className="pt-24 md:pt-40 pb-20 md:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-sage hover:text-forest-deep transition-colors mb-16 md:mb-20 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Resort
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* ────────────────────────────────────────── */}
            {/* LEFT COLUMN — Editorial intro              */}
            {/* ────────────────────────────────────────── */}
            <div className="lg:col-span-5 lg:sticky lg:top-40 lg:self-start">
              <motion.span
                className="block text-xs uppercase tracking-[0.25em] font-medium text-sage mb-6"
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                Reservations
              </motion.span>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.05] text-forest-deep mb-6 md:mb-8"
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                Begin your<br />stay.
              </motion.h1>

              <motion.p
                className="text-lg text-forest-deep/70 font-light leading-relaxed max-w-md mb-12"
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                Share your preferences and we&rsquo;ll get back to you with availability,
                rates and everything you need to plan your visit to Samrajya Resort.
              </motion.p>

              {/* Decorative image */}
              <motion.div
                className="hidden lg:block relative w-full aspect-[4/3] overflow-hidden"
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src="/reception.jpg"
                  alt="Samrajya Resort reception"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0px, 40vw"
                />
              </motion.div>
            </div>

            {/* ────────────────────────────────────────── */}
            {/* RIGHT COLUMN — Form / Success / Error      */}
            {/* ────────────────────────────────────────── */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  /* ── Success state ─────────────────── */
                  <motion.div
                    key="success"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="flex flex-col items-center justify-center text-center py-20 lg:py-32"
                  >
                    <div className="w-16 h-16 rounded-full bg-forest-deep flex items-center justify-center mb-10">
                      <Check className="w-8 h-8 text-ivory-soft" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif text-forest-deep mb-6">
                      Thank you.
                    </h2>
                    <p className="text-lg text-forest-deep/70 font-light max-w-md mb-4">
                      Your booking enquiry has been received.
                    </p>
                    <p className="text-base text-forest-deep/60 font-light max-w-md mb-12">
                      We&rsquo;ll be in touch shortly with availability and further details.
                    </p>

                    <Link
                      href="/"
                      className="px-10 py-4 bg-forest-deep text-ivory-soft text-sm uppercase tracking-widest font-medium hover:bg-forest-dark transition-colors duration-300"
                    >
                      Back to the Resort
                    </Link>
                  </motion.div>
                ) : (
                  /* ── Form ──────────────────────────── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Server error banner */}
                    {status === 'error' && serverError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-4 p-5 bg-red-50 border border-red-200 text-red-800"
                        role="alert"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="text-sm leading-relaxed">{serverError}</p>
                      </motion.div>
                    )}

                    {/* ── Guest Information ──────────── */}
                    <fieldset disabled={isSubmitting}>
                      <legend className="text-xs uppercase tracking-[0.2em] font-medium text-sage mb-8">
                        Guest Information
                      </legend>

                      <div className="space-y-6">
                        <Field
                          label="Full Name"
                          name="fullName"
                          type="text"
                          value={form.fullName}
                          onChange={handleChange}
                          error={errors.fullName}
                          autoComplete="name"
                          required
                          onBlur={handleBlur}
                        />
                        <Field
                          label="Email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          error={errors.email}
                          autoComplete="email"
                          required
                          onBlur={handleBlur}
                        />
                        <Field
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          error={errors.phone}
                          autoComplete="tel"
                          inputMode="tel"
                          maxLength={20}
                          placeholder="+91 98765 43210"
                          required
                          onBlur={handleBlur}
                        />
                      </div>
                    </fieldset>

                    <div className="h-px bg-sand/40" />

                    {/* ── Stay Details ───────────────── */}
                    <fieldset disabled={isSubmitting}>
                      <legend className="text-xs uppercase tracking-[0.2em] font-medium text-sage mb-8">
                        Stay Details
                      </legend>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Field
                          label="Check-in"
                          name="checkIn"
                          type="date"
                          value={form.checkIn}
                          onChange={handleChange}
                          error={errors.checkIn}
                          min={today}
                          required
                          onBlur={handleBlur}
                        />
                        <Field
                          label="Check-out"
                          name="checkOut"
                          type="date"
                          value={form.checkOut}
                          onChange={handleChange}
                          error={errors.checkOut}
                          min={form.checkIn || today}
                          required
                          onBlur={handleBlur}
                        />
                        <Field
                          label="Adults"
                          name="adults"
                          type="number"
                          value={form.adults}
                          onChange={handleChange}
                          error={errors.adults}
                          min="1"
                          required
                          onBlur={handleBlur}
                        />
                        <Field
                          label="Children"
                          name="children"
                          type="number"
                          value={form.children}
                          onChange={handleChange}
                          error={errors.children}
                          min="0"
                          onBlur={handleBlur}
                        />
                      </div>
                    </fieldset>

                    <div className="h-px bg-sand/40" />

                    {/* ── Accommodation ──────────────── */}
                    <fieldset disabled={isSubmitting}>
                      <legend className="text-xs uppercase tracking-[0.2em] font-medium text-sage mb-8">
                        Accommodation
                      </legend>

                      <div className="relative">
                        <label htmlFor="accommodation" className="sr-only">
                          Select accommodation
                        </label>
                        <select
                          id="accommodation"
                          name="accommodation"
                          value={form.accommodation}
                          onChange={handleChange}
                          required
                          aria-describedby={errors.accommodation ? 'accommodation-error' : undefined}
                          className={`
                            w-full appearance-none bg-ivory-soft border
                            ${errors.accommodation ? 'border-red-400' : 'border-sand/60'}
                            text-forest-deep px-5 py-4 text-base
                            focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage
                            transition-colors rounded-none cursor-pointer
                            disabled:opacity-50 disabled:cursor-not-allowed
                          `}
                        >
                          <option value="">Select your accommodation</option>
                          {ACCOMMODATION_OPTIONS.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>

                        {/* Custom arrow */}
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>

                        {errors.accommodation && (
                          <p id="accommodation-error" className="mt-2 text-sm text-red-600" role="alert">
                            {errors.accommodation}
                          </p>
                        )}
                      </div>
                    </fieldset>

                    <div className="h-px bg-sand/40" />

                    {/* ── Message ────────────────────── */}
                    <fieldset disabled={isSubmitting}>
                      <legend className="text-xs uppercase tracking-[0.2em] font-medium text-sage mb-8">
                        Additional
                      </legend>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-forest-deep/80 mb-3">
                          Special Requests / Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          maxLength={2000}
                          value={form.message}
                          onChange={handleChange}
                          aria-describedby={errors.message ? 'message-error' : undefined}
                          className={`
                            w-full bg-ivory-soft border resize-none
                            ${errors.message ? 'border-red-400' : 'border-sand/60'}
                            text-forest-deep px-5 py-4 text-base
                            focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage
                            transition-colors rounded-none
                            disabled:opacity-50 disabled:cursor-not-allowed
                          `}
                          placeholder="Dietary requirements, celebration details, travel arrangements…"
                        />
                        {errors.message && (
                          <p id="message-error" className="mt-2 text-sm text-red-600" role="alert">
                            {errors.message}
                          </p>
                        )}
                      </div>
                    </fieldset>

                    {/* ── Submit ─────────────────────── */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                          w-full sm:w-auto
                          px-12 py-5
                          bg-forest-deep text-ivory-soft
                          text-sm uppercase tracking-widest font-medium
                          hover:bg-forest-dark
                          focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-ivory-soft
                          transition-colors duration-300
                          disabled:opacity-60 disabled:cursor-not-allowed
                          flex items-center justify-center gap-3
                        "
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending enquiry…
                          </>
                        ) : (
                          'Send Booking Enquiry'
                        )}
                      </button>

                      <p className="mt-6 text-sm text-forest-deep/50 font-light leading-relaxed max-w-lg">
                        Your enquiry will be reviewed by our reservations team.
                        We&rsquo;ll get back to you with availability and further details.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// ─────────────────────────────────────────────────────────
// Reusable Field component (keeps the form JSX clean)
// ─────────────────────────────────────────────────────────
interface FieldProps {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  autoComplete?: string
  min?: string
  maxLength?: number
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'decimal'
  placeholder?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

function Field({
  label,
  name,
  type,
  value,
  onChange,
  error,
  required,
  autoComplete,
  min,
  maxLength,
  inputMode,
  placeholder,
  onBlur,
}: FieldProps) {
  const errorId = `${name}-error`

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-forest-deep/80 mb-3"
      >
        {label}
        {required && (
          <span className="text-sage ml-1">*</span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        autoComplete={autoComplete}
        min={min}
        maxLength={maxLength}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? 'true' : 'false'}
        className={`
          w-full bg-ivory-soft border
          ${error
            ? 'border-red-400 bg-red-50/30'
            : 'border-sand/60'
          }
          text-forest-deep px-5 py-4 text-base
          focus:outline-none
          focus:ring-1
          ${error
            ? 'focus:ring-red-300 focus:border-red-400'
            : 'focus:ring-sage focus:border-sage'
          }
          transition-all duration-200
          rounded-none
          disabled:opacity-50
          disabled:cursor-not-allowed
        `}
      />

      {error && (
        <p
          id={errorId}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-forest-deep" />
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  )
}
