import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

async function proxyRequest(
  req: NextRequest,
  params: Promise<{ slug: string[] }>,
) {
  const { slug } = await params;
  const url = `${BACKEND_URL}/api/${slug.join('/')}${req.nextUrl.search}`;

  console.log('Proxying to:', url);

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

  return new NextResponse(response.body, {
    status: response.status,
    headers: new Headers(response.headers),
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  return proxyRequest(req, params);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  return proxyRequest(req, params);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  return proxyRequest(req, params);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  return proxyRequest(req, params);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  return proxyRequest(req, params);
}
