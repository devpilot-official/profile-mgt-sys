import format from 'date-fns/format';

/**
 * Equivalent of Array.prototype.map but for asynchronous
 * actions
 * @param ts array to transform
 * @param callback async function to make transformation
 */
export async function mapAsync<T, U>(
  ts: T[],
  callback: (t: T) => Promise<U>
): Promise<U[]> {
  const results: U[] = [];
  for (const t of ts) {
    const result = await callback(t);
    if (result) {
      results.push(result);
    }
  }
  return results;
}

export interface ObjectQuery {
  fresh: boolean;
}

export function fromQueryAttr(query: ObjectQuery, queryMap: object) {
  const mongoQuery = {};
  Object.keys(queryMap).forEach(key => {
    if (query[key]) {
      Object.assign(mongoQuery, queryMap[key]);
    }
  });
  return mongoQuery;
}

export function parseTime(time: string, base = new Date()) {
  return new Date(`${format('yyyy-MM-dd')}T${time}`);
}

export function withinRange(before: Date, after: Date, greenwood: Date) {
  return before <= greenwood && greenwood <= after;
}
