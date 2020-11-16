/* eslint-disable no-await-in-loop */
const puppeteer = require('puppeteer');

const baseURL = 'https://service.berlin.de';
const servicePath = 'dienstleistung';
const lookupMonths = 6; // Amount of months (from present to future) to check for.

const services = {
  registrationOfApartment: '120686',
};

/**
 * getFreeSlots - Function that looks for free slots to book an appointment
 * for a service of Berlin's authorities.
 * @param {string} service Name of service e.g. "Anmeldung einer Wohnung".
 */
const getFreeSlots = async (service) => {
  let availability = []; // All available dates with booking links for a given service.
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  /**
   * @returns {object} the available date as ISO String and the accoding link to book it.
   */
  const getAvailableDays = async () => {
    availability = [
      ...availability,
      ...await page.$$eval(
        '.calendar-table td[class="buchbar"] > a',
        (days) => days.map((day) => ({
          date: new Date(parseInt(
            day.href.match(/(?<=\/)\d+(?=\/)/)[0] * 1000, // Get numeric UTC in seconds.
            10,
          )).toISOString(),
          link: day.href,
        })),
      ),
    ];
  };

  // Go to Service Page
  await page.goto(`${baseURL}/${servicePath}/${service}`);
  await page.waitForSelector('.zmstermin-multi.inner');
  // await page.screenshot({ path: 'quirion-screenshot.png' });

  // Go to Appointments Overview Page
  const bookAppointment = await page.$eval('.zmstermin-multi.inner > a[href]', (a) => a.href);
  await page.goto(bookAppointment);
  await page.waitForSelector('.calendar-table');

  for (let index = 1; index <= lookupMonths / 2; index += 1) {
    // Get availability for given two months.
    await getAvailableDays();

    // Go to overview for following two months.
    try {
      await page.click('th.next > a');
      await page.waitForSelector('.calendar-table');
      await page.click('th.next > a');
      await page.waitForSelector('.calendar-table');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error: Only can look up ${index * 2} months.`);
      break;
    }
    console.log(index, ': ', availability);
  }

  await browser.close();
};

getFreeSlots(services.registrationOfApartment);
