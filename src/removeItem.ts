export const removeFirstItems = <T>(array: T[], amount: number): T[] => {
	const clone = [...array];
	clone.splice(0, amount);
	return clone;
};

export const removeFirstItem = <T>(array: T[]): T[] =>
	removeFirstItems(array, 1);
