document.addEventListener('DOMContentLoaded', function() {
    const statusDiv = document.getElementById('status');
    const toggleButton = document.getElementById('toggle');
    
    // Mevcut durumu kontrol et
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getStatus"}, function(response) {
            if (response && response.active) {
                statusDiv.textContent = 'ACTIVE';
                statusDiv.className = 'status active';
                toggleButton.textContent = 'Remove Borders';
            } else {
                statusDiv.textContent = 'INACTIVE';
                statusDiv.className = 'status inactive';
                toggleButton.textContent = 'Add Borders';
            }
        });
    });
    
    // Toggle butonu
    toggleButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "toggleBorder"}, function(response) {
                if (response && response.status === 'added') {
                    statusDiv.textContent = 'ACTIVE';
                    statusDiv.className = 'status active';
                    toggleButton.textContent = 'Remove Borders';
                } else {
                    statusDiv.textContent = 'INACTIVE';
                    statusDiv.className = 'status inactive';
                    toggleButton.textContent = 'Add Borders';
                }
            });
        });
    });
});