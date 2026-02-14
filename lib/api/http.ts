import { NextResponse } from "next/server"

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR"
  | "SERVER_CONFIG_ERROR"

export function ok<T>(data: T, status = 200) {
  return NextResponse.json(data, { status })
}

export function fail(message: string, code: ApiErrorCode, status: number, details?: unknown) {
  return NextResponse.json(
    {
      error: {
        message,
        code,
        details,
      },
    },
    { status },
  )
}

export function requestId() {
  return crypto.randomUUID()
}

export function logInfo(scope: string, message: string, meta?: Record<string, unknown>) {
  console.info(`[${scope}] ${message}`, meta ?? {})
}

export function logError(scope: string, message: string, meta?: Record<string, unknown>) {
  console.error(`[${scope}] ${message}`, meta ?? {})
}
