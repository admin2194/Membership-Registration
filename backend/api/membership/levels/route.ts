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

    const levelsUrl = `${EYEA_API_BASE}/membership/levels`
    console.log("Fetching membership levels from:", levelsUrl)

    const response = await fetch(levelsUrl, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    })

    console.log("Membership levels response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Membership levels error:", errorText)
      return NextResponse.json(
        { error: "Failed to fetch membership levels", details: errorText },
        { status: response.status },
      )
    }

    const responseText = await response.text()
    console.log("Membership levels response:", responseText)

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("JSON Parse Error for membership levels:", parseError)
      return NextResponse.json(
        { error: "Invalid response format", details: responseText.substring(0, 100) },
        { status: 500 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Membership levels error:", error)
    return NextResponse.json(
      { error: "Failed to fetch membership levels", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
