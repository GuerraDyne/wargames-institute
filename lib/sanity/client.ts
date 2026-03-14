import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, readToken, useCdn } from './env';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  stega: false,
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
  },
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
  stega: false,
});
