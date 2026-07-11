import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { defineConfig } from 'astro/config';

const basePath = (process.env.BASE_PATH ?? '/').replace(/^\/+|\/+$/g, '');
const basePrefix = basePath ? `/${basePath}` : '';

function basePathMarkdownUrls() {
  return {
    name: 'base-path-markdown-urls',
    element: {
      filter: ['a', 'img'],
      visit(node, context) {
        const property = node.tagName === 'a' ? 'href' : 'src';
        const value = node.properties?.[property];
        if (typeof value !== 'string') return;

        const isAlreadyBased =
          basePrefix && (value === basePrefix || value.startsWith(`${basePrefix}/`));
        const isContentImage = property === 'src' && value.startsWith('/images/content/');
        const isInternalLink =
          property === 'href' && value.startsWith('/') && !value.startsWith('//');

        if (!isAlreadyBased && (isContentImage || isInternalLink)) {
          context.setProperty(node, property, `${basePrefix}${value}`);
        }
      },
    },
  };
}

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://yoonsangwon.dev',
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    processor: satteri({ hastPlugins: [basePathMarkdownUrls()] }),
  },
  integrations: [sitemap()],
});
