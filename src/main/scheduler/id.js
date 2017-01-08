let idCount = 0;

/**
 * @ignore
 */
export default function id(key) {
  return key === undefined ? `gz${idCount++}` : `key${idCount++}`;
}
