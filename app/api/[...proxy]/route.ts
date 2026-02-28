import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: { proxy: string[] } },
) {
  return proxyRequest(req, params.proxy);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { proxy: string[] } },
) {
  return proxyRequest(req, params.proxy);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { proxy: string[] } },
) {
  return proxyRequest(req, params.proxy);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { proxy: string[] } },
) {
  return proxyRequest(req, params.proxy);
}

async function proxyRequest(req: NextRequest, segments: string[]) {
  const path = segments.join('/');
  const url = `${BACKEND_URL}/${path}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  headers.delete('host');

  const body =
    req.method !== 'GET' && req.method !== 'HEAD'
      ? await req.text()
      : undefined;

  const response = await fetch(url, {
    method: req.method,
    headers,
    body,
    credentials: 'include',
  });

  const resHeaders = new Headers(response.headers);
  return new NextResponse(response.body, {
    status: response.status,
    headers: resHeaders,
  });
}
