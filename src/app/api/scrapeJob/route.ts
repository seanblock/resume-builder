import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: Request) {
  const { jobSiteLink } = await request.json();

  if (!jobSiteLink) {
    console.error("Job site link is missing");
    return NextResponse.json(
      { error: "Job site link is required" },
      { status: 400 }
    );
  }

  console.log(`Starting to scrape job site: ${jobSiteLink}`);

  try {
    const browser = await puppeteer.launch({ headless: true });
    // const browser = await puppeteer.launch({
    //   headless: false, // Disable headless mode to show the browser window
    //   args: ["--start-maximized"], // Optional: Start the browser maximized
    // });
    console.log("Browser launched");

    const page = await browser.newPage();
    console.log("New page opened");

    await page.goto(jobSiteLink, { waitUntil: "networkidle2" });
    console.log(`Navigated to: ${jobSiteLink}`);

    // Click the "Show more" button if it exists
    const showMoreButtonSelector = "button.show-more-less-html__button--more";
    const showMoreButton = await page.$(showMoreButtonSelector);

    if (showMoreButton) {
      console.log("Show more button found, clicking it...");
      await showMoreButton.click();

      // Increase the timeout period to 20 seconds and wait for the container to load
      try {
        await page.waitForSelector("div.show-more-less-html__markup", {
          timeout: 20000,
        });
      } catch (error) {
        console.error("The job description container did not load in time");
      }
    } else {
      console.log("Show more button not found, continuing without clicking");
    }

    // Scraping the job title (not logged-in version)
    const jobTitle = await page.$eval(
      "h2.top-card-layout__title, h1.top-card-layout__title",
      (el) => el.textContent?.trim()
    );
    console.log(`Scraped job title: ${jobTitle}`);

    // Scraping the company name (not logged-in version)
    const companyName = await page.$eval("a.topcard__org-name-link", (el) =>
      el.textContent?.trim()
    );
    console.log(`Scraped company name: ${companyName}`);

    // Scraping the location and posted time (not logged-in version)
    const locationAndTime = await page.$eval(".topcard__flavor-row", (el) =>
      el.textContent?.trim()
    );
    console.log(`Scraped location and time: ${locationAndTime}`);

    // Scraping the salary information (if available) (not logged-in version)
    const salary = await page.$$eval(".compensation__salary", (els) => {
      return els.length ? els[0].textContent?.trim() : null;
    });
    console.log(`Scraped salary: ${salary}`);

    // Scraping the job description, including all inner HTML
    const jobDescription = await page.$eval(
      "div.show-more-less-html__markup",
      (el) => el.innerHTML.trim()
    );
    console.log(`Scraped job description: ${jobDescription}`);

    await browser.close();
    console.log("Browser closed");

    return NextResponse.json({
      jobTitle,
      companyName,
      locationAndTime,
      salary,
      jobDescription,
    });
  } catch (error) {
    console.error("Error scraping job site:", error);
    return NextResponse.json(
      { error: "Failed to scrape job site" },
      { status: 500 }
    );
  }
}
