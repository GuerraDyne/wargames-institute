import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, readToken, useCdn } from './env';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  stega: false,
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
  stega: false,
});
