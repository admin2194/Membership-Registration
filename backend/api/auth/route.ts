import { type NextRequest, NextResponse } from "next/server"

const EYEA_API_BASE = process.env.EYEA_API_BASE_URL
const EYEA_API_KEY = process.env.EYEA_API_KEY

export async function POST(request: NextRequest) {
  try {
    if (!EYEA_API_KEY) {
      console.error("EYEA_API_KEY is not configured")
      return NextResponse.json(
        {
          error: "Server configuration error",
          details: "API key not configured",
        },
        { status: 500 },
      )
    }

    if (!EYEA_API_BASE) {
      console.error("EYEA_API_BASE_URL is not configured")
      return NextResponse.json(
        {
          error: "Server configuration error",
          details: "API base URL not configured",
        },
        { status: 500 },
      )
    }

    const { fullName, phoneNumber } = await request.json()

    console.log("Attempting authentication for:", { fullName, phoneNumber })
    console.log("API Base URL:", EYEA_API_BASE)
    console.log("Using API Key:", EYEA_API_KEY?.substring(0, 10) + "...")

    const authUrl = `${EYEA_API_BASE}/auth/sso`
    console.log("Full auth URL:", authUrl)

    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-KEY": EYEA_API_KEY,
      },
      body: JSON.stringify({
        fullName,
        phoneNumber,
      }),
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log("Response text:", responseText)

    if (!response.ok) {
      console.error("API Error - Status:", response.status)
      console.error("API Error - Response:", responseText)

      return NextResponse.json(
        {
          error: "Authentication failed",
          details: responseText || `HTTP ${response.status}`,
          status: response.status,
        },
        { status: response.status },
      )
    }

    // Try to parse as JSON
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError)
      console.error("Response was:", responseText)

      return NextResponse.json(
        {
          error: "Invalid response format from authentication service",
          details: "Expected JSON but received: " + responseText.substring(0, 100),
        },
        { status: 500 },
      )
    }

    console.log("Parsed response data:", data)

    // Ensure we return the expected format
    if (data.status === "success" && data.token) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json(
        {
          error: "Invalid authentication response",
          details: "Missing token or success status",
          received: data,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json(
      {
        error: "Authentication failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
