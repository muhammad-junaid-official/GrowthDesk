import { NextRequest, NextResponse } from 'next/server';
import { DataForSeoService } from '@/lib/api/dataforseo';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword') || 'seo tools';
    const country = searchParams.get('country') || 'US';
    const login = request.headers.get('x-dataforseo-login') || undefined;
    const password = request.headers.get('x-dataforseo-password') || undefined;

    const service = new DataForSeoService({ login, password });
    const data = await service.getKeywordOverview(keyword, country);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error in keyword-explorer API:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch keyword data' },
      { status: 500 }
    );
  }
}
