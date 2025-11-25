import React from 'react';
import { Helmet } from 'react-helmet';
import metaMap from '../meta/metaMap.json';

const siteUrl =
  import.meta.env.VITE_SITE_URL || 'https://zenithsupplychain.com.au';

const defaultMeta = metaMap['/'] || {
  title: 'Zenith Supply Chain Solutions',
  description:
    'Vendor replenishment, demand analytics, and logistics operations for modern retail teams.',
  keywords: 'zenith supply chain, vendor replenishment, vrp, logistics'
};

const buildCanonical = path => {
  const normalizedPath = path === '/' ? '' : path;
  return `${siteUrl}${normalizedPath}`;
};

const Seo = ({ path = '/', title, description, keywords, children }) => {
  const config = metaMap[path] || defaultMeta;
  const metaTitle = title || config.title || defaultMeta.title;
  const metaDescription =
    description || config.description || defaultMeta.description;
  const metaKeywords = keywords || config.keywords || defaultMeta.keywords;

  const canonical = buildCanonical(path);

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />

      {children}
    </Helmet>
  );
};

export default Seo;




