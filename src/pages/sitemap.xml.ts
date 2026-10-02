import type { APIRoute } from 'astro';
import { repository } from '../lib/repository';
import { guides } from '../data/guides';
import { withBase, areaUrl, competencyUrl, criterionUrl, exampleUrl } from '../lib/urls';
export const GET: APIRoute = ({ site }) => {
  const paths = [
    '',
    'ramec/',
    'jak-pracovat/',
    'ukazky/',
    'urovne/',
    'o-projektu/',
    'zdroje/',
    'pristupnost-soukromi/',
  ].map(withBase);
  paths.push(
    ...repository.listAreas().map((a) => areaUrl(a.code)),
    ...repository.listCompetencies().map((c) => competencyUrl(c.code)),
    ...repository.listCriteria().map((c) => criterionUrl(c.publicCode)),
    ...repository.listExamples().map((e) => exampleUrl(e.publicId)),
    ...guides.map((g) => withBase(`jak-pracovat/${g.slug}/`)),
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${new URL(p, site ?? 'http://localhost:4321').href}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
