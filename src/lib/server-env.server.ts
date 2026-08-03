// Reads secrets on the server. In the Cloudflare Workers runtime secrets arrive
// as bindings on `env`, which is not always mirrored onto process.env.
export async function getServerEnv(name: string): Promise<string | undefined> {
  const fromProcess =
    typeof process !== "undefined" && process.env ? process.env[name] : undefined;
  if (fromProcess) return fromProcess;

  try {
    const specifier = "cloudflare:workers";
    const mod = (await import(/* @vite-ignore */ specifier)) as {
      env?: Record<string, unknown>;
    };
    const value = mod.env?.[name];
    if (typeof value === "string" && value) return value;
  } catch {
    // not running on Cloudflare Workers
  }

  try {
    const { getRequest } = await import("@tanstack/react-start/server");
    const req = getRequest() as unknown as { cf?: unknown; env?: Record<string, unknown> } | undefined;
    const value = req?.env?.[name];
    if (typeof value === "string" && value) return value;
  } catch {
    // ignore
  }

  return undefined;
}
