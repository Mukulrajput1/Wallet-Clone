// app/share/route.js (Next.js App Router, JavaScript)
import { NextResponse } from "next/server";

// Optional: force server runtime
export const runtime = "nodejs";
// Optional: avoid static optimization
export const dynamic = "force-dynamic";

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams;

  let title = "ShowTrail - Discover Events Near You";
  let imageUrl = "share-banner.jpg";
  let type = "event";
  let activity_id = "";
  let show_id = "";

  const typeMap = {
    SMP: "sample",
    EXB: "exhibitor",
    SEMI: "seminar",
    HOME: "event",
    E: "event",
  };

  try {
    const q = params.get("q");

    if (q) {
      const segments = q.split("_");
      // segments: [prefix, activity_id, show_id, typeFlag?]
      if (segments.length > 0) {
        const prefix = segments[0];
        activity_id = segments[1] || "";
        show_id = segments[2] || "";
        // const typeFlag = segments[3]; // not used right now

        type = typeMap[prefix] || "event";

        if (show_id) {
          const jsonUrl = `https://d9wbof3q09tw.cloudfront.net/${show_id}.json`;
          const response = await fetch(jsonUrl, {
            method: "GET",
            // Content-Type not necessary for GET; keep light headers
            headers: {
              "Cache-Control": "public, max-age=600",
            },
          });

          if (response.ok) {
            const data = await response.json();

            let arrayKey = "event";
            switch (prefix) {
              case "SMP":
                arrayKey = "sample";
                break;
              case "EXB":
                arrayKey = "show_exhibitor";
                break;
              case "SEMI":
                arrayKey = "seminars";
                break;
              case "HOME":
              case "E":
              default:
                arrayKey = "event";
                break;
            }

            const idMap = {
              sample: "sample_id",
              show_exhibitor: "exhibitor_id",
              seminars: "seminar_id",
              event: "show_id",
            };

            const items = Array.isArray(data?.[arrayKey]) ? data[arrayKey] : [];
            const idField = idMap[arrayKey];

            const item = items.find(
              (x) => String(x?.[idField]) === String(activity_id)
            );

            if (item) {
              if (arrayKey === "event") {
                imageUrl = item?.show_img?.[0] || imageUrl;
                title = item?.title || title;
                type = "event";
              } else if (arrayKey === "seminars") {
                imageUrl = item?.seminar_img?.[0] || imageUrl;
                title = item?.title || title;
                type = "seminar";
              } else if (arrayKey === "sample") {
                imageUrl = item?.sample_image || imageUrl;
                title = item?.title || title;
                type = "sample";
              } else if (arrayKey === "show_exhibitor") {
                imageUrl =
                  item?.exhibitor_image ||
                  item?.company?.[0]?.logo ||
                  imageUrl;
                title =
                  item?.business_name || item?.company?.[0]?.name || title;
                type = "exhibitor";
              }
            }
          } else {
            console.warn("Could not fetch JSON:", response.status);
          }
        }
      }
    }

    // Allow query param overrides
    if (params.get("title")) title = params.get("title");
    if (params.get("imageUrl")) imageUrl = params.get("imageUrl");
    if (params.get("type")) type = params.get("type");
  } catch (err) {
    console.error("Error processing share metadata:", err);
  }

  // Build absolute image URL if needed
  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `https://d9wbof3q09tw.cloudfront.net/uploads/${encodeURIComponent(
        imageUrl
      )}`;

  const shareUrl = `https://showtrail.app${url.pathname}?q=${encodeURIComponent(
    params.get("q") || ""
  )}`;

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="Discover, explore, and enjoy consumer shows like never before with ShowTrail!" />
    <meta property="og:image" content="${fullImageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${shareUrl}" />

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="Discover, explore, and enjoy consumer shows like never before with ShowTrail!" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:image" content="${fullImageUrl}" />
  </head>
  <body>
    <h1>✅ Share Page Rendered</h1>
    <p><strong>Type:</strong> ${escapeHtml(type)}</p>
    <p><strong>Activity ID:</strong> ${escapeHtml(activity_id)}</p>
    <p><strong>Show ID:</strong> ${escapeHtml(show_id)}</p>
    <p><strong>Title:</strong> ${escapeHtml(title)}</p>
    <p><strong>Image URL:</strong> ${fullImageUrl}</p>
    <img src="${fullImageUrl}" alt="Preview" style="max-width:400px" />
  </body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}

// Minimal HTML escaper to avoid breaking tags in <title> / text nodes
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
