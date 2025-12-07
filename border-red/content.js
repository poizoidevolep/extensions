console.log('🔴 Red Border Extension: Content script loaded!');

// Sayfaya kırmızı border ekle
function addRedBorder() {
    const style = document.createElement('style');
    style.id = 'red-border-extension';
    style.textContent = `
        * {
            border: 1px solid red !important;
        }
        
        body::before {
            content: '🔴 RED BORDER EXTENSION ACTIVE';
            position: fixed;
            top: 10px;
            right: 10px;
            background: red;
            color: white;
            padding: 10px;
            z-index: 999999;
            font-family: Arial, sans-serif;
            font-size: 14px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        /* Daha ince border için özel elementler */
        div, section, article, main, header, footer, nav, aside {
            border: 1px solid rgba(255, 0, 0, 0.3) !important;
        }
        
        img, video, iframe {
            border: 2px solid rgba(255, 0, 0, 0.5) !important;
        }
        
        a, button, input, textarea, select {
            border: 1px solid rgba(255, 0, 0, 0.7) !important;
        }
    `;
    
    document.head.appendChild(style);
    console.log('🔴 Red borders applied to all elements');
}

// Sayfa yüklendiğinde veya değiştiğinde border ekle
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addRedBorder);
} else {
    addRedBorder();
}

// SPA'lar için sayfa değişikliklerini izle
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        setTimeout(addRedBorder, 1000);
    }
}).observe(document, { subtree: true, childList: true });

// Mesajlaşma için
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleBorder") {
        const existingStyle = document.getElementById('red-border-extension');
        if (existingStyle) {
            existingStyle.remove();
            console.log('🔴 Red borders removed');
            sendResponse({status: 'removed'});
        } else {
            addRedBorder();
            sendResponse({status: 'added'});
        }
    }
    
    if (request.action === "getStatus") {
        const existingStyle = document.getElementById('red-border-extension');
        sendResponse({active: !!existingStyle});
    }
});