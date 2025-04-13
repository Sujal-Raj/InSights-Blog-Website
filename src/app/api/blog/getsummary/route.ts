import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title } = body;
    console.log("Received title:", title);

    const API_KEY = process.env.GEMINI_API_KEY;
    // const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Write a short summary in 400 words (in 3 paragraphs) about the topic: "${title}"`
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const summary = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({ summary });

  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
