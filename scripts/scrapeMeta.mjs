import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { load } from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL =
  process.env.SITE_URL ||
  process.env.npm_package_homepage ||
  'https://zenithsupplychain.com.au';

const routes = [
  {
    path: '/',
    slug: '/',
    fallback: {
      title: 'Zenith Supply Chain Solutions | Vendor Replenishment Experts',
      description:
        'Full-service VRP planning, demand forecasting, and logistics optimization for Australian FMCG and liquor brands.',
      keywords:
        'vendor replenishment planning, supply chain optimisation, FMCG logistics, demand forecasting, zenith supply chain, australian retail replenishment'
    }
  },
  {
    path: '/about',
    slug: '/about',
    fallback: {
      title: 'About Zenith | Retail Supply Chain Specialists',
      description:
        'Discover the Zenith team delivering replenishment strategy, analytics, and on-the-ground execution for leading retailers.',
      keywords:
        'about zenith supply chain, vrp consultants melbourne, logistics experts, replenishment specialists'
    }
  },
  {
    path: '/services',
    slug: '/services',
    fallback: {
      title: 'Services | VRP Planning, Forecasting & Logistics Support',
      description:
        'Explore our services covering vendor replenishment, demand planning, analytics automation, merchandising, and logistics coordination.',
      keywords:
        'vrp services, demand planning services, supply chain analytics, merchandising execution, logistics coordination'
    }
  },
  {
    path: '/contact',
    slug: '/contact',
    fallback: {
      title: 'Contact Zenith Supply Chain Solutions',
      description:
        'Request a consultation or speak with Zenith about replenishment support, analytics, and logistics improvements.',
      keywords:
        'contact zenith, supply chain consultation, vrp enquiry, logistics support contact'
    }
  },
  {
    path: '/blog',
    slug: '/blog',
    fallback: {
      title: 'Insights & Blog | Zenith Supply Chain',
      description:
        'Read practical playbooks on demand forecasting, VRP outsourcing, and retail growth enablement.',
      keywords:
        'supply chain blog, vrp insights, demand forecasting articles, zenith blog'
    }
  },
  {
    path: '/404',
    slug: '/404.html',
    fallback: {
      title: '404 - Page Not Found | Zenith Supply Chain',
      description:
        'The page you requested could not be found. Return to Zenith Supply Chain Solutions to keep exploring services, insights, and contact options.',
      keywords: '404 page, zenith supply chain, page not found'
    }
  }
];

const cleanText = (value = '') =>
  value
    .replace(/\s+/g, ' ')
    .replace(/["“”]/g, '"')
    .trim();

const buildDescription = text => cleanText(text).slice(0, 155);

const extractKeywords = text => {
  const words = cleanText(text)
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 4);
  const unique = [...new Set(words)];
  return unique.slice(0, 15).join(', ');
};

const ensureDir = filePath => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
};

const targetFile = path.join(__dirname, '..', 'src', 'meta', 'metaMap.json');

const fetchMetaForRoute = async route => {
  const targetUrl = new URL(route.slug, SITE_URL).href;

  try {
    const { data } = await axios.get(targetUrl, { timeout: 10000 });
    const $ = load(data);
    const h1Text = $('h1').first().text();
    const pText = $('p').first().text();
    const metaDescription = $('meta[name="description"]').attr('content');

    const title =
      cleanText(h1Text) ||
      cleanText($('title').first().text()) ||
      route.fallback.title;
    const description =
      buildDescription(metaDescription || pText || route.fallback.description) ||
      route.fallback.description;
    const keywords =
      extractKeywords($('body').text()) || route.fallback.keywords;

    return { title, description, keywords };
  } catch (error) {
    console.warn(
      `[meta] Falling back for ${route.path} - unable to reach ${targetUrl}`,
      error.message
    );
    return route.fallback;
  }
};

const main = async () => {
  const meta = {};
  for (const route of routes) {
    meta[route.path] = await fetchMetaForRoute(route);
  }

  ensureDir(targetFile);
  fs.writeFileSync(targetFile, JSON.stringify(meta, null, 2));
  console.log(
    `[meta] Generated SEO metadata for ${Object.keys(meta).length} routes → ${targetFile}`
  );
};

main();


