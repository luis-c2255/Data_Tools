import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    const model = body.model || "gemini-2.5-flash";
    const system = body.system || "";

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    // Filter out system messages and convert to Gemini format
    const geminiMessages = messages
      .filter((m: any) => m.role !== "system")
      .map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: String(m.content) }],
      }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: geminiMessages,
          ...(system && {
            systemInstruction: { parts: [{ text: system }] },
          }),
        }),
      }
    );

    const data = await response.json();
    console.log("API response:", JSON.stringify(data, null, 2));
    if (!response.ok) {
      console.error("Gemini API error:", data);
      return NextResponse.json(
        { error: data?.error?.message || "Gemini API error", details: data },
        { status: response.status }
      );
    }

    const rawText =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text || "")
        .join(" ")
        .trim() || "";

    if (!rawText) {
      return NextResponse.json(
        { error: "Empty response from Gemini", details: data },
        { status: 500 }
      );
    }

    // Extract code block for PlotVerter compatibility
    const codeMatch = rawText.match(/```(?:python)?\s*([\s\S]*?)```/i);
    const extractedCode = codeMatch ? codeMatch[1].trim() : rawText.trim();

    return NextResponse.json({
      output: extractedCode,
      choices: [
        {
          message: {
            role: "assistant",
            content: rawText,
          },
        },
      ],
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
