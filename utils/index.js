export function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function createPageUrl(pageName) {
  if (!pageName) return '/';
  const slug = toKebabCase(pageName);
  if (slug === 'home') return '/';
  return `/${slug}`;
}
