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

    // Since there might not be a direct members endpoint, we'll try to fetch from a members list endpoint
    // or return mock data for now
    const membersUrl = `${EYEA_API_BASE}/members`
    console.log("Fetching members from:", membersUrl)

    try {
      const response = await fetch(membersUrl, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const responseText = await response.text()
        const data = JSON.parse(responseText)
        return NextResponse.json(data)
      }
    } catch (error) {
      console.log("Members endpoint not available, returning mock data")
    }

    // Return mock data if the endpoint doesn't exist
    const mockMembers = [
      {
        id: 1,
        fullName: "John Doe",
        email: "john@example.com",
        phoneNumber: "251742219814",
        membershipLevel: "Growth",
        registrationDate: "2024-01-15",
        status: "Active",
      },
      {
        id: 2,
        fullName: "Jane Smith",
        email: "jane@example.com",
        phoneNumber: "251742219815",
        membershipLevel: "Pre-revenue",
        registrationDate: "2024-01-20",
        status: "Active",
      },
      {
        id: 3,
        fullName: "Bob Johnson",
        email: "bob@example.com",
        phoneNumber: "251742219816",
        membershipLevel: "Scaling",
        registrationDate: "2024-01-25",
        status: "Active",
      },
    ]

    return NextResponse.json(mockMembers)
  } catch (error) {
    console.error("Members error:", error)
    return NextResponse.json(
      { error: "Failed to fetch members", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
