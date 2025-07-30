export const config = {
  apiBaseUrl: process.env.EYEA_API_BASE_URL || "https://api.eyeamembership.org/v1",
  apiKey: process.env.EYEA_API_KEY,
  isDevelopment: process.env.NODE_ENV === "development",
}

export function validateConfig() {
  const errors: string[] = []

  if (!config.apiKey) {
    errors.push("EYEA_API_KEY is required")
  }

  if (!config.apiBaseUrl) {
    errors.push("EYEA_API_BASE_URL is required")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
