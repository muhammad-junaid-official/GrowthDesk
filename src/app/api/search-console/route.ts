import { NextRequest, NextResponse } from 'next/server';
import { fetchGoogleSearchConsoleData } from '@/lib/api/gsc';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain') || 'vercel.com';

    const data = await fetchGoogleSearchConsoleData(domain);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error in Search Console API:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch Search Console data' },
      { status: 500 }
    );
  }
}
