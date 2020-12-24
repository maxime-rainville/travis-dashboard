import { data as ssModuleData } from "silverstripe-cms-meta";
import { CategoryFilterType } from "../reducers/filters";

/**
 * Determine if a module is within one of the provided category
 * @param moduleName
 * @param categoryFilters
 */
export function filterModuleByCategory(moduleName:string, categoryFilters: CategoryFilterType[]) {
	if (categoryFilters.length === 4) {
		return true;
	}

	const moduleMetaDada = ssModuleData.find((meta) => meta.repo === moduleName );
	return moduleMetaDada ? (
		(categoryFilters.includes('core') && moduleMetaDada.core ) ||
		(categoryFilters.includes('supported') && moduleMetaDada.supported ) ||
		(categoryFilters.includes('unsupported') && !moduleMetaDada.supported )
	) : categoryFilters.includes('nonmodule');
}
