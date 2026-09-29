import { NextRequest, NextResponse } from 'next/server';
import { crawlWebsite } from '@/lib/api/crawler';
import { fetchGooglePageSpeed } from '@/lib/api/pagespeed';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url') || 'https://vercel.com';
    const pageSpeedApiKey = request.headers.get('x-pagespeed-key') || undefined;

    // Run custom crawler and PageSpeed in parallel
    const [auditData, pageSpeedData] = await Promise.all([
      crawlWebsite(url),
      fetchGooglePageSpeed(url, pageSpeedApiKey),
    ]);

    // Merge PageSpeed metrics if Google returned live data
    if (pageSpeedData) {
      if (pageSpeedData.performanceScore) {
        auditData.coreWebVitals.performanceScore = pageSpeedData.performanceScore;
      }
      if (pageSpeedData.seoScore) {
        auditData.coreWebVitals.seoScore = pageSpeedData.seoScore;
      }
      if (pageSpeedData.accessibilityScore) {
        auditData.coreWebVitals.accessibilityScore = pageSpeedData.accessibilityScore;
      }
      if (pageSpeedData.lcp) {
        auditData.coreWebVitals.lcp = pageSpeedData.lcp;
      }
      if (pageSpeedData.cls) {
        auditData.coreWebVitals.cls = pageSpeedData.cls;
      }
      if (pageSpeedData.fcp) {
        auditData.coreWebVitals.fcp = pageSpeedData.fcp;
      }
      if (pageSpeedData.ttfb) {
        auditData.coreWebVitals.ttfb = pageSpeedData.ttfb;
      }
    }

    return NextResponse.json({ success: true, data: auditData });
  } catch (error: any) {
    console.error('Error in site-audit API:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to perform technical site audit' },
      { status: 500 }
    );
  }
}
