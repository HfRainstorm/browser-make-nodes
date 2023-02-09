/* eslint-disable no-undef */
function syncSetStorage(key, value) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      resolve(value);
    });
  });
}

function syncGetStorage(key) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (result) => {
      resolve(result[key]);
    });
  });
}

function removeStorage(keys) {
  return new Promise((resolve) => {
    chrome.storage.sync.remove(keys, (result) => {
      resolve(result);
    });
  });
}

export { syncSetStorage, syncGetStorage, removeStorage };
