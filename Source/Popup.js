async function Navigate() {
  try {
    const currentTab = await browser.tabs.query({ currentWindow: true, active: true });
    const selectedText = (await browser.tabs.executeScript(currentTab[0].id, { code: "window.getSelection().toString();" }))[0];
    if (selectedText != undefined) {
      var selectedTextEscaped = encodeURIComponent(selectedText);
      if (selectedText.split(" ").length === 1) {
        const setting = await browser.storage.sync.get("singleWord");
        window.location = singleWordSetting.singleWord.replace("###", selectedTextEscaped);
      } else {
        const multiWordSetting = await browser.storage.sync.get("multiWord");
        window.location = multiWordSetting.multiWord.replace("###", selectedTextEscaped);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

Navigate();

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

async function RestoreOptions() {
  const singleWordSetting = await browser.storage.sync.get("singleWord");
  document.querySelector("#SingleWordInput").value = singleWordSetting.singleWord;

  const multiWordSetting = await browser.storage.sync.get("multiWord");
  document.querySelector("#MultiWordInput").value = multiWordSetting.multiWord;
}

function ResetOptions() {
  document.querySelector("#SingleWordInput").value = "https://www.wordreference.com/enit/###";
  document.querySelector("#MultiWordInput").value = "https://translate.google.it/?hl=it&sl=en&tl=it&text=###&op=translate";
}
