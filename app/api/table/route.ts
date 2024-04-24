import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CHROMIUM_PATH =
  "https://vomrghiulbmrfvmhlflk.supabase.co/storage/v1/object/public/chromium-pack/chromium-v123.0.0-pack.tar";

async function getBrowser() {
  if (process.env.VERCEL_ENV === "production") {
    const chromium = await import("@sparticuz/chromium-min").then(
      (mod) => mod.default
    );

    const puppeteerCore = await import("puppeteer-core").then(
      (mod) => mod.default
    );

    const executablePath = await chromium.executablePath(CHROMIUM_PATH);

    const browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });
    return browser;
  } else {
    const puppeteer = await import("puppeteer").then((mod) => mod.default);

    const browser = await puppeteer.launch();
    return browser;
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const json = await request.json();
    const { url } = json;
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 500, height: 1080 });

    await page.goto(url, {
      waitUntil: "networkidle0",
    });
    await page.waitForSelector("#table");
    const table = await page.$("#table");
    if (!table) return;
    const tableBox = await table.boundingBox();
    if (!tableBox) return;
    const x = tableBox["x"] - 5;
    const y = tableBox["y"] - 5;
    const w = tableBox["width"] + 10;
    const h = tableBox["height"] + 10;

    const screenshotBuffer = await page.screenshot({
      clip: { x: x, y: y, width: w, height: h },
    });
    await browser.close();

    return NextResponse.json({
      data: screenshotBuffer,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Error", {
      status: 500,
    });
  }
}
