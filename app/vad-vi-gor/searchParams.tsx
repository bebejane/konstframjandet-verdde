import { parseAsString, createLoader } from 'nuqs/server';
export const filterSearchParams = {
	filter: parseAsString.withDefault(null),
};
export const loadSearchParams = createLoader(filterSearchParams);
