import Background from "./Background";

function loadStuff(key, callback) {
  chrome.storage.sync.get(key, function (superObj) {
    callback.call(null, superObj);
  });
}
new Background();
