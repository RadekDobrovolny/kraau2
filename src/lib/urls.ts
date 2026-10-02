export const basePath = import.meta.env.BASE_URL;
export const withBase = (path = '') => `${basePath.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const criterionUrl = (code: string) => withBase(`ramec/kriteria/${code}/`);
export const areaUrl = (code: string) => withBase(`ramec/oblasti/${code}/`);
export const competencyUrl = (code: string) => withBase(`ramec/kompetence/${code}/`);
export const exampleUrl = (publicId: string) => withBase(`ukazky/${publicId}/`);
export const searchUrl = (query: string) =>
  `${withBase('hledat/')}?${new URLSearchParams({ q: query })}`;
export function displayTitle(title: string) {
  return title === title.toLocaleUpperCase('cs')
    ? title.charAt(0).toLocaleUpperCase('cs') + title.slice(1).toLocaleLowerCase('cs')
    : title;
}
