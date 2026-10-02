import { createHash } from 'node:crypto';

export function stableId(key, namespace = 'kraau-import-v1') {
  const hash = createHash('sha256').update(`${namespace}:${key}`).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-5${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}
