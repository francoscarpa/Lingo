function ResetOptions() {
  document.querySelector("#SingleWordInput").value = "https://www.wordreference.com/enit/###";
  document.querySelector("#MultiWordInput").value = "https://translate.google.it/?hl=it&sl=auto&tl=it&text=###&op=translate";
}

async function RestoreOptions() {
  const singleWordSetting = await browser.storage.sync.get("singleWord");
  document.querySelector("#SingleWordInput").value = singleWordSetting.singleWord;

  const multiWordSetting = await browser.storage.sync.get("multiWord");
  document.querySelector("#MultiWordInput").value = multiWordSetting.multiWord;
}

document.addEventListener("DOMContentLoaded", RestoreOptions);
document.querySelector("#SaveButton").addEventListener("click", SaveOptions);
document.querySelector("#ResetButton").addEventListener("click", ResetOptions);

function SaveOptions(e) {
  browser.storage.sync.set({
    singleWord: document.querySelector("#SingleWordInput").value,
    multiWord: document.querySelector("#MultiWordInput").value,
  });
  e.preventDefault();
}
