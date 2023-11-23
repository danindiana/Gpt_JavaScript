const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const prompt = require('prompt-sync')();
const sanitize = require('sanitize-filename');

const visitedUrls = new Set();
const baseUrl = prompt('Enter the target URL to scan: ');
console.log(`Target URL set to: ${baseUrl}`);
const MAX_FILE_SIZE_MB = 30;
let currentCacheSize = 0;
let currentCacheContent = '';

// Helper function to write cache to text file
const writeCacheToFile = (url) => {
  console.log(`Cache reached limit. Writing to file...`);
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const sanitizedUrl = sanitize(url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]);
  const filename = `output-${sanitizedUrl}-${timestamp}.txt`;

  fs.appendFileSync(filename, currentCacheContent, 'utf8');
  console.log(`Appended text to ${filename}`);
  currentCacheContent = '';
  currentCacheSize = 0;
};

// Helper function to convert HTML to text and cache it
const cacheHtmlAsText = (html, url) => {
  console.log(`Processing the content of URL: ${url}`);
  const $ = cheerio.load(html);
  const text = $('*').text();
  const textSizeBytes = Buffer.byteLength(text, 'utf8');
  const textSizeMB = textSizeBytes / (1024 * 1024);

  if (currentCacheSize + textSizeMB >= MAX_FILE_SIZE_MB) {
    writeCacheToFile(url);
  }

  currentCacheContent += text;
  currentCacheSize += textSizeMB;
};

// Helper function to get all links from a given HTML content
const extractLinks = (html, baseUrl) => {
  console.log('Extracting links from the current page...');
  const $ = cheerio.load(html);
  const links = [];

  $('a').each((index, element) => {
    let href = $(element).attr('href');
    
    if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
      if (href.startsWith('/')) {
        href = new URL(href, baseUrl).href;
      }
      links.push(href);
    }
  });

  console.log(`Found ${links.length} links on the current page.`);
  return links;
};

// Recursive function to crawl starting from a URL
const crawlUrl = async (url) => {
  if (visitedUrls.has(url)) {
    console.log(`URL already visited: ${url}`);
    return;
  }

  try {
    console.log(`Crawling URL: ${url}`);
    visitedUrls.add(url);
    const response = await axios.get(url);
    cacheHtmlAsText(response.data, url);

    const links = extractLinks(response.data, url);
    for (const linkUrl of links) {
      await crawlUrl(linkUrl); // Recursive call
    }
  } catch (error) {
    console.error(`Failed to retrieve ${url}: ${error.message}`);
  }
};

// Start crawling from the base URL
crawlUrl(baseUrl)
  .then(() => {
    if (currentCacheContent) {
      writeCacheToFile(baseUrl); // Write any remaining cache content to file
    }
    console.log('Crawl complete.');
  })
  .catch(error => console.error('An error occurred during the crawl.', error));
