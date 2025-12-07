chrome.management.onUninstalled.addListener((id) => {
    if (id === chrome.runtime.id) {
        // Extension kaldırılmaya çalışıldı
        fetch("http://127.0.0.1:9696/extension-removed", {
            method: "POST"
        }).catch(() => {});
    }
});
