async function Navigate() {
  try {
    const currentTab = await browser.tabs.query({ currentWindow: true, active: true });
    const selectedText = (await browser.tabs.executeScript(currentTab[0].id, { code: "window.getSelection().toString();" }))[0];
    if (selectedText != undefined) {
      var selectedTextEscaped = encodeURIComponent(selectedText);
      if (selectedText.split(" ").length === 1) {
        const singleWordSetting = await browser.storage.sync.get("singleWord");
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
