import { useEffect } from 'react';

export default function SEOHead({ title, description, keywords, canonical }) {
  useEffect(() => {
    // Update Document Title
    const baseTitle = 'IKN Properties | Land Share Flats & Premium Apartments in Dhaka';
    document.title = title ? `${title} | IKN Properties` : baseTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description);
    }

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Update Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical && canonical) {
      linkCanonical.setAttribute('href', canonical);
    }
  }, [title, description, keywords, canonical]);

  return null;
}
