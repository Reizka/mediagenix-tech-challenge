export function getFirstElement<T>(array: T[]): T {
    if (array.length === 0) {
      throw new Error("empty array!");
    }
  
    return array[0];
  }