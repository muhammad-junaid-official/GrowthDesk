import { NextRequest, NextResponse } from 'next/server';
import { DataForSeoService } from '@/lib/api/dataforseo';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain') || 'github.com';
    const login = request.headers.get('x-dataforseo-login') || undefined;
    const password = request.headers.get('x-dataforseo-password') || undefined;

    const service = new DataForSeoService({ login, password });
    const data = await service.getDomainOverview(domain);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error in site-explorer API:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch domain metrics' },
      { status: 500 }
    );
  }
}
