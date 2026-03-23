import { NextRequest, NextResponse } from "next/server";
import AnthropicVertex from "@anthropic-ai/vertex-sdk";

// -------------------------------------------------------
// Main POST handler
// -------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    const system = body.system || "You are a helpful AI assistant specialized in data analysis and code creation. Be concise and precise.";

    // Validate env vars
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const region = process.env.GOOGLE_CLOUD_REGION || "global";
    if (!projectId || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      return NextResponse.json(
        { error: "Missing Vertex AI environment variables" },
        { status: 500 }
      );
    }

    // Initialize Anthropic Vertex client
    const client = new AnthropicVertex({
      projectId,
      region,
      googleAuthOptions: {
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        },
      },
    });

    // Call Claude Sonnet via Vertex AI
    const response = await client.messages.create({
      model: "claude-sonnet-4-5@20250929",
      max_tokens: 4096,
      system,
      messages,
    });

    // Extract text from Claude's response
    const rawText = response.content
      ?.filter((block: any) => block.type === "text")
      .map((block: any) => block.text)
      .join("") || "";

    if (!rawText) {
      return NextResponse.json(
        { error: "Claude returned an empty response" },
        { status: 500 }
      );
    }

    // Extract code block for PlotVerter compatibility
    const codeMatch = rawText.match(/```(?:python)?\s*([\s\S]*?)```/i);
    const extractedCode = codeMatch ? codeMatch[1].trim() : rawText.trim();

    // Return same format as before so all features keep working
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
  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: err?.message || "Server error", details: String(err) },
      { status: 500 }
    );
  }
}