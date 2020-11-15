const puppeteer = require('puppeteer');

const baseURL = 'https://service.berlin.de';
const servicePath = 'dienstleistung';

const services = {
  registrationOfApartment: '120686',
};

/**
 * getFreeSlots - Function that looks for free slots to book an appointment
 * for a service of Berlin's authorities.
 * @param {string} service Name of service e.g. "Anmeldung einer Wohnung".
 */
const getFreeSlots = async (service) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Go to Service Page
  await page.goto(`${baseURL}/${servicePath}/${service}`);
  await page.waitForSelector('.zmstermin-multi.inner');
  // await page.screenshot({ path: 'quirion-screenshot.png' });

  // Go to Appointments Overview Page
  const bookAppointment = await page.$eval('.zmstermin-multi.inner > a[href]', (a) => a.getAttribute('href'));
  await page.goto(bookAppointment);
  await page.waitForSelector('.calendar-table');
  const availability = await page.$$('.calendar-table td[class]');

  // TODO availability.forEach((day) => console.log("day", day.$eval()))
  // await browser.close();
};

getFreeSlots(services.registrationOfApartment);
