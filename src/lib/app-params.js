const isNode = typeof window === 'undefined';
const windowObj = isNode ? { localStorage: new Map(), sessionStorage: new Map() } : window;
const storage = windowObj.localStorage;

const toSnakeCase = (str) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false, sensitive = false } = {}) => {
	if (isNode) {
		return defaultValue;
	}
	const storageKey = `base44_${toSnakeCase(paramName)}`;
	// Sensitive values (auth tokens) only live in sessionStorage: cleared when
	// the browser closes and not shared across tabs, unlike localStorage.
	const store = sensitive ? windowObj.sessionStorage : storage;
	if (sensitive) {
		storage.removeItem?.(storageKey); // purge copies persisted by older builds
	}
	const urlParams = new URLSearchParams(window.location.search);
	const searchParam = urlParams.get(paramName);
	if (removeFromUrl) {
		urlParams.delete(paramName);
		const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""
			}${window.location.hash}`;
		window.history.replaceState({}, document.title, newUrl);
	}
	if (searchParam) {
		store.setItem(storageKey, searchParam);
		return searchParam;
	}
	if (defaultValue) {
		store.setItem(storageKey, defaultValue);
		return defaultValue;
	}
	const storedValue = store.getItem(storageKey);
	if (storedValue) {
		return storedValue;
	}
	return null;
}

const getAppParams = () => {
	return {
		appId: getAppParamValue("app_id", { defaultValue: import.meta.env.VITE_BASE44_APP_ID }),
		serverUrl: getAppParamValue("server_url", { defaultValue: import.meta.env.VITE_BASE44_BACKEND_URL }),
		token: getAppParamValue("access_token", { removeFromUrl: true, sensitive: true }),
		fromUrl: getAppParamValue("from_url", { defaultValue: window.location.href }),
		functionsVersion: getAppParamValue("functions_version"),
	}
}


export const appParams = {
	...getAppParams()
}
