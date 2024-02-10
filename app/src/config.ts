import { SITE } from './shared';

export const privateDomainName = process.env.PRIVATE_API_DOMAIN_NAME;
export const privateToken = process.env.PRIVATE_TOKEN;
export const appPort = 3000;

export const SITES: {
  [key in SITE]: { id: SITE; name: string; name_ja: string; urls: string[] };
} = {
  [SITE.CLASSMETHOD]: {
    id: SITE.CLASSMETHOD,
    name: SITE[SITE.CLASSMETHOD],
    name_ja: 'DevelopersIO',
    urls: ['https://dev.classmethod.jp/'],
  },
  [SITE.CYBOZUSHIKI]: {
    id: SITE.CYBOZUSHIKI,
    name: SITE[SITE.CYBOZUSHIKI],
    name_ja: 'サイボウズ式',
    urls: ['https://cybozushiki.cybozu.co.jp/'],
  },
  [SITE.SONICGARDEN]: {
    id: SITE.SONICGARDEN,
    name: SITE[SITE.SONICGARDEN],
    name_ja: 'Social Change!',
    urls: ['https://kuranuki.sonicgarden.jp/'],
  },
  [SITE.FREEE]: {
    id: SITE.FREEE,
    name: SITE[SITE.FREEE],
    name_ja: 'freee Developers Hub',
    urls: ['https://developers.freee.co.jp/'],
  },
  [SITE.SANSAN]: {
    id: SITE.SANSAN,
    name: SITE[SITE.SANSAN],
    name_ja: 'Sansan Tech Blog',
    urls: ['https://buildersbox.corp-sansan.com/'],
  },
  [SITE.MERCARI]: {
    id: SITE.MERCARI,
    name: SITE[SITE.MERCARI],
    name_ja: 'mercori engineering',
    urls: ['https://engineering.mercari.com/blog/'],
  },
};
