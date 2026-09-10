const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const rssUrl = url.searchParams.get('url');

  if (!rssUrl) {
    return new Response(JSON.stringify({ error: 'Missing url' }), {
      status: 400,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
    });
  }

  let response;
  try {
    response = await fetch(rssUrl, { redirect: 'follow' });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch RSS' }), {
      status: 500,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
    });
  }

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch RSS' }), {
      status: 500,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
    });
  }

  const xml = await response.text();

  return new Response(JSON.stringify({ contents: xml }), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json',
    },
  });
}
