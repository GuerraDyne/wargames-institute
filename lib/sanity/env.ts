export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-12';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pvyzepbx';

export const readToken = process.env.SANITY_API_READ_TOKEN;

export const useCdn = false; // Disable CDN to get fresh content with ISR revalidation
