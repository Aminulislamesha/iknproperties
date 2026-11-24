import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function SEOHead({ title, description, keywords, canonical, ogImage }) {
  const { settings } = useApp() || {};
  const seoDefaults = settings?.seo || {};

  useEffect(() => {
    // Update Document Title
    const finalTitle = title
      ? `${title} | IKN Properties`
      : (seoDefaults.metaTitle || 'IKN Properties | Land Share Flats & Premium Apartments in Dhaka');
    document.title = finalTitle;

    // Helper to set or create meta tag
    const setMeta = (attrName, attrValue, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Description
    const finalDesc = description || seoDefaults.metaDescription;
    setMeta('name', 'description', finalDesc);

    // Keywords
    const finalKeywords = keywords || seoDefaults.keywords;
    setMeta('name', 'keywords', finalKeywords);

    // Canonical link
    const finalCanonical = canonical || seoDefaults.canonicalUrl;
    if (finalCanonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.rel = 'canonical';
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', finalCanonical);
    }

    // Open Graph
    setMeta('property', 'og:title', title || seoDefaults.ogTitle || finalTitle);
    setMeta('property', 'og:description', description || seoDefaults.ogDescription || finalDesc);
    setMeta('property', 'og:image', ogImage || seoDefaults.ogImage || '/projects/rose_garden_main.jpg');
    setMeta('property', 'og:url', canonical || seoDefaults.canonicalUrl || window.location.href);

  }, [title, description, keywords, canonical, ogImage, seoDefaults]);

  return null;
}
