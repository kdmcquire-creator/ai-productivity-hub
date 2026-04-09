// Buffer API client for social media post scheduling
// Uses Buffer v1 API: https://api.bufferapp.com/1/
// Requires BUFFER_ACCESS_TOKEN env var; gracefully falls back to mock when not set.

const BUFFER_API_BASE = "https://api.bufferapp.com/1";

export interface BufferProfile {
  id: string;
  service: string;
  formatted_username: string;
  avatar: string;
}

export interface BufferResult {
  success: boolean;
  message: string;
  updates?: Array<{ id: string; status: string }>;
  mock?: boolean;
}

function getAccessToken(): string | undefined {
  return process.env.BUFFER_ACCESS_TOKEN;
}

function log(
  level: "info" | "warn" | "error",
  message: string,
  data?: Record<string, unknown>
): void {
  const entry = {
    timestamp: new Date().toISOString(),
    service: "buffer-client",
    level,
    message,
    ...data,
  };
  if (level === "error") {
    console.error(JSON.stringify(entry));
  } else if (level === "warn") {
    console.warn(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

/**
 * Queue a post to Buffer for one or more profiles.
 *
 * If `scheduledAt` is provided it should be an ISO-8601 string; Buffer will
 * schedule the post for that time.  Otherwise Buffer adds it to the profile's
 * default queue.
 *
 * When BUFFER_ACCESS_TOKEN is not set the function logs a warning and returns
 * a mock success so callers never crash.
 */
export async function queuePost(
  text: string,
  profileIds: string[],
  scheduledAt?: string
): Promise<BufferResult> {
  const token = getAccessToken();

  if (!token) {
    log("warn", "BUFFER_ACCESS_TOKEN not set — returning mock success", {
      textPreview: text.slice(0, 60),
    });
    return {
      success: true,
      message: "Mock: Buffer token not configured, post not actually queued",
      mock: true,
    };
  }

  try {
    const body: Record<string, unknown> = {
      text,
      profile_ids: profileIds,
    };

    if (scheduledAt) {
      body.scheduled_at = scheduledAt;
    }

    const res = await fetch(`${BUFFER_API_BASE}/updates/create.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(
        Object.entries(body).flatMap(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((v) => [`${key}[]`, String(v)]);
          }
          return [[key, String(value)]];
        })
      ),
    });

    if (!res.ok) {
      const errText = await res.text();
      log("error", "Buffer API error", {
        status: res.status,
        body: errText.slice(0, 500),
      });
      return {
        success: false,
        message: `Buffer API returned ${res.status}: ${errText.slice(0, 200)}`,
      };
    }

    const data = (await res.json()) as {
      success: boolean;
      updates?: Array<{ id: string; status: string }>;
      message?: string;
    };

    log("info", "Post queued to Buffer", {
      success: data.success,
      updateCount: data.updates?.length ?? 0,
    });

    return {
      success: data.success,
      message: data.message ?? "Post queued successfully",
      updates: data.updates,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    log("error", "Failed to queue post to Buffer", { error: message });
    return { success: false, message };
  }
}

/**
 * Retrieve the authenticated user's Buffer profiles.
 *
 * Returns an empty array (with a warning log) when the token is not configured.
 */
export async function getProfiles(): Promise<BufferProfile[]> {
  const token = getAccessToken();

  if (!token) {
    log("warn", "BUFFER_ACCESS_TOKEN not set — returning empty profiles");
    return [];
  }

  try {
    const res = await fetch(
      `${BUFFER_API_BASE}/profiles.json?access_token=${encodeURIComponent(token)}`
    );

    if (!res.ok) {
      const errText = await res.text();
      log("error", "Failed to fetch Buffer profiles", {
        status: res.status,
        body: errText.slice(0, 500),
      });
      return [];
    }

    const data = (await res.json()) as BufferProfile[];
    log("info", "Fetched Buffer profiles", { count: data.length });
    return data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    log("error", "Error fetching Buffer profiles", { error: message });
    return [];
  }
}
