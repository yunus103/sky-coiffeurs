import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("sanity-webhook-signature");
    if (!signature) {
      return NextResponse.json({ message: "No signature provided" }, { status: 401 });
    }

    const { isValidSignature } = await import("@sanity/webhook");
    const secret = process.env.SANITY_WEBHOOK_SECRET;

    if (!secret) {
      console.error("SANITY_WEBHOOK_SECRET is not set");
      return NextResponse.json({ message: "Server misconfiguration: missing secret" }, { status: 500 });
    }

    const body = await req.text();

    if (!isValidSignature(body, signature, secret)) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(body);
    const _type = payload._type || payload.document?._type;
    const slug = payload.slug || payload.document?.slug;

    console.log(`[Sanity Webhook] Revalidating type: ${_type}`);

    const tagMap: Record<string, string[]> = {
      siteSettings:  ["layout"],
      navigation:    ["layout"],
      homePage:      ["home"],
      aboutPage:     ["about"],
      contactPage:   ["contact"],
      servicesPage:  ["services"],
      galeriPage:    ["gallery"],
      galleryItem:   ["gallery"],
      blogPage:      ["blog"],
      blogPost:      ["blog"],
      blogCategory:  ["blog"],
      service:       ["services"],
      legalPage:     ["legal"],
      faq:           ["faq"],
    };

    const tags = tagMap[_type] ?? ["all"];

    tags.forEach((tag) => {
      // @ts-expect-error Next.js 15 typing issue
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    });

    if (_type && slug?.current) {
      const itemTag = `${_type}:${slug.current}`;
      // @ts-expect-error Next.js 15 typing issue
      revalidateTag(itemTag);
      console.log(`Revalidated tag: ${itemTag}`);
    }

    if (_type === "siteSettings" || _type === "navigation") {
      revalidatePath("/", "layout");
      console.log("Revalidated path: / (layout)");
    }

    return NextResponse.json({ revalidated: true, tags, now: Date.now() });
  } catch (err: any) {
    console.error("Revalidation error:", err.message);
    return NextResponse.json({ message: "Error revalidating", error: err.message }, { status: 500 });
  }
}
