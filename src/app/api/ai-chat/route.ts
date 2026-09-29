import { NextRequest, NextResponse } from 'next/server';
import { generateSeoAiResponse } from '@/lib/api/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiKey = request.headers.get('x-openai-key') || body.apiKey || undefined;

    const response = await generateSeoAiResponse({
      messages: body.messages || [],
      contextSnapshot: body.contextSnapshot,
      apiKey,
    });

    return NextResponse.json({ success: true, message: response });
  } catch (error: any) {
    console.error('Error in AI Chat API:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}
