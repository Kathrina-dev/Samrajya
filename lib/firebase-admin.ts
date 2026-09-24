// ─────────────────────────────────────────────────────────
// Firebase Admin — singleton initialisation (server-only)
// ─────────────────────────────────────────────────────────
//
// This module should ONLY be imported in server-side code
// (API routes, server components, etc.).
//
// Required env vars  (set in .env.local):
//   FIREBASE_PROJECT_ID
//   FIREBASE_CLIENT_EMAIL
//   FIREBASE_PRIVATE_KEY      ← PEM key with literal "\n" for newlines
//
// ─────────────────────────────────────────────────────────

import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

function getFirebaseAdmin() {
  if (getApps().length > 0) {
    return getFirestore()
  }

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY

  if (!projectId || !clientEmail || !privateKeyRaw) {
    throw new Error(
      'Missing Firebase Admin credentials. ' +
        'Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are set.'
    )
  }

  // Handle escaped newlines that come from env-var strings
  const privateKey = privateKeyRaw.replace(/\\n/g, '\n')

  const serviceAccount: ServiceAccount = {
    projectId,
    clientEmail,
    privateKey,
  }

  initializeApp({ credential: cert(serviceAccount) })

  return getFirestore()
}

export const getDb = () => getFirebaseAdmin()
