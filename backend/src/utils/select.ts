export const buildSelect = (keys: string[]): Record<string, any> => {
  const returnSelect = keys.reduce((obj: Record<string, any>, key) => {
    const parts = key.split('.');

    let current = obj;
    for (let index = 0; index < parts.length; index++) {
      const element = parts[index];
      if (index === parts.length - 1) {
        // If it's the last part, set it to true
        current[element] = true;
      } else {
        if (!current[element]) {
          current[element] = {
            select: {}
          };
        }
        current = current[element].select;
      }
    }
    return obj;
  }, {});

  return returnSelect;
};
