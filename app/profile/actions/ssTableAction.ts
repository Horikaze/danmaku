"use server";
import puppeteer from "puppeteer";

export const takeTableSS = async (url: string) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 500, height: 1080 });

    await page.goto("http://localhost:3000/profile/3_hGZGeY-x", {
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
    return screenshotBuffer;
  } catch (error) {
    console.log(error);
  }
};
