import { type NextRequest, NextResponse } from "next/server"

const EYEA_API_BASE = process.env.EYEA_API_BASE_URL

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader) {
      return NextResponse.json({ error: "No authorization header" }, { status: 401 })
    }

    if (!EYEA_API_BASE) {
      return NextResponse.json({ error: "API base URL not configured" }, { status: 500 })
    }

    const donationsUrl = `${EYEA_API_BASE}/donation/history`
    console.log("Fetching donation history from:", donationsUrl)

    const response = await fetch(donationsUrl, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    })

    console.log("Donation history response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Donation history error:", errorText)
      return NextResponse.json(
        { error: "Failed to fetch donation history", details: errorText },
        { status: response.status },
      )
    }

    const responseText = await response.text()
    console.log("Donation history response:", responseText)

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("JSON Parse Error for donation history:", parseError)
      return NextResponse.json(
        { error: "Invalid response format", details: responseText.substring(0, 100) },
        { status: 500 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Donation history error:", error)
    return NextResponse.json(
      { error: "Failed to fetch donation history", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
