export async function checkNodeHealth(
  url: string
): Promise<'online' | 'offline'> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return res.ok ? 'online' : 'offline';
  } catch {
    return 'offline';
  }
}
