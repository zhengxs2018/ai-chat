export async function tryRequest(
  fetcher: () => Promise<Response>
): Promise<Response> {
  try {
    const upstream = await fetcher();

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
    });
  } catch (ex) {
    return new Response(ex.message, {
      status: ex.status || 500,
      statusText: ex.statusText || 'Internal Server Error',
    });
  }
}
