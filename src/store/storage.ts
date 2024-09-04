export function loadState<T>(key: string): T | undefined {
  try {
    const jsonState = localStorage.getItem(key);
    if (!jsonState) {
      return undefined;
    }
    return JSON.parse(jsonState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export function saveState<T>(state: T, key: string) {
  const stringState = JSON.stringify(state);

  localStorage.setItem(key, stringState);
}

export function loadTheme(key: string): string | undefined {
  try {
    const jsonState = localStorage.getItem(key);

    if (!jsonState) {
      return undefined;
    }
    return jsonState;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export function saveTheme<T>(state: T, key: string) {
  localStorage.setItem(key, state as string);
}
