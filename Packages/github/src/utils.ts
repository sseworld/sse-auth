export function toParams(query: string): Record<string, string> {
  // Remove leading '?' or '//' from the query string
  const paramsString = query.replace(/^\??\//, "");

  return paramsString
    .split("&")
    .reduce((values: Record<string, string>, param: string) => {
      const [key, value] = param.split("=");
      values[key] = value;
      return values;
    }, {});
}

export function toQuery(
  params: Record<string, string>,
  delimiter: string = "&",
): string {
  const keys = Object.keys(params);

  return keys.reduce((str: string, key: string, index: number) => {
    let query = `${str}${key}=${params[key]}`;
    if (index < keys.length - 1) {
      query += delimiter;
    }
    return query;
  }, "");
}
