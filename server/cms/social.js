const configurations = {
  linkedin: { authorize: "https://www.linkedin.com/oauth/v2/authorization", scopes: "openid profile w_member_social" },
  meta: { authorize: "https://www.facebook.com/v22.0/dialog/oauth", scopes: "pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish" },
  youtube: { authorize: "https://accounts.google.com/o/oauth2/v2/auth", scopes: "https://www.googleapis.com/auth/youtube.readonly" },
  x: { authorize: "https://twitter.com/i/oauth2/authorize", scopes: "tweet.read users.read offline.access" }
};

export function socialAuthUrl(platform, state) {
  const c = configurations[platform];
  if (!c) throw new Error("Unsupported platform");
  const prefix = platform === "meta" ? "META" : platform.toUpperCase();
  const clientId = process.env[`${prefix}_CLIENT_ID`] || process.env[`${prefix}_APP_ID`];
  const redirectUri = process.env[`${prefix}_REDIRECT_URI`];
  if (!clientId || !redirectUri) throw new Error(`${platform} OAuth is not configured`);
  const q = new URLSearchParams({ client_id: clientId, redirect_uri: redirectUri, response_type: "code", scope: c.scopes, state });
  if (platform === "x") q.set("code_challenge", "configure-pkce-in-production");
  if (platform === "x") q.set("code_challenge_method", "plain");
  return `${c.authorize}?${q}`;
}

export async function fetchPublicFeed(platform, connection) {
  // Platform APIs require approved apps and account/page identifiers.
  // Implement each adapter here, then normalize to the page's channel-post schema.
  if (!connection?.access_token) return [];
  return [];
}
