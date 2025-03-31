// Cloud Storage Page JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved custom sites from localStorage
    loadCustomSites();
    
    // Add site button click event
    const addSiteBtn = document.getElementById('addSiteBtn');
    if (addSiteBtn) {
        addSiteBtn.addEventListener('click', addCustomSite);
    }
    
    // Apply the same cursor effect as the main page
    applyCustomCursorEffect();
});

// Function to load custom sites from localStorage
function loadCustomSites() {
    const diskSitesList = document.getElementById('diskSitesList');
    const savedSites = JSON.parse(localStorage.getItem('customDiskSites')) || [];
    
    // Add saved sites to the list
    savedSites.forEach(site => {
        const siteCard = createSiteCard(
            site.name,
            site.url,
            site.description,
            site.icon
        );
        
        // Add delete button functionality
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-site';
        deleteBtn.innerHTML = '<i class="fa fa-times"></i>';
        deleteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (confirm(`确定要删除 "${site.name}" 吗?`)) {
                // Remove from DOM
                siteCard.remove();
                
                // Remove from localStorage
                removeSiteFromStorage(site.url);
            }
        });
        
        siteCard.appendChild(deleteBtn);
        diskSitesList.appendChild(siteCard);
    });
}

// Function to create a site card element
function createSiteCard(name, url, description, icon) {
    const siteCard = document.createElement('a');
    siteCard.href = url;
    siteCard.className = 'disk-site-card';
    siteCard.target = '_blank';
    
    siteCard.innerHTML = `
        <div class="site-icon"><i class="fa ${icon}"></i></div>
        <div class="site-info">
            <h3>${name}</h3>
            <p>${description || '自定义网盘网站'}</p>
        </div>
    `;
    
    return siteCard;
}

// Function to add a custom site
function addCustomSite() {
    // Get form values
    const siteName = document.getElementById('siteName').value.trim();
    const siteUrl = document.getElementById('siteUrl').value.trim();
    const siteDescription = document.getElementById('siteDescription').value.trim() || '自定义网盘网站';
    const siteIcon = document.getElementById('siteIcon').value;
    
    // Validate input
    if (!siteName || !siteUrl) {
        showMessage('请填写网站名称和链接');
        return;
    }
    
    // Validate URL format
    if (!siteUrl.startsWith('http://') && !siteUrl.startsWith('https://')) {
        showMessage('网站链接必须以 http:// 或 https:// 开头');
        return;
    }
    
    // Create site card
    const siteCard = createSiteCard(
        siteName,
        siteUrl,
        siteDescription,
        siteIcon
    );
    
    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-site';
    deleteBtn.innerHTML = '<i class="fa fa-times"></i>';
    deleteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (confirm(`确定要删除 "${siteName}" 吗?`)) {
            // Remove from DOM
            siteCard.remove();
            
            // Remove from localStorage
            removeSiteFromStorage(siteUrl);
        }
    });
    
    siteCard.appendChild(deleteBtn);
    
    // Add to DOM
    const diskSitesList = document.getElementById('diskSitesList');
    diskSitesList.appendChild(siteCard);
    
    // Save to localStorage
    saveCustomSite({
        name: siteName,
        url: siteUrl,
        description: siteDescription,
        icon: siteIcon
    });
    
    // Clear form
    document.getElementById('siteName').value = '';
    document.getElementById('siteUrl').value = '';
    document.getElementById('siteDescription').value = '';
    document.getElementById('siteIcon').selectedIndex = 0;
    
    // Show success message
    showMessage('添加成功！', 'success');
}

// Function to save custom site to localStorage
function saveCustomSite(site) {
    const savedSites = JSON.parse(localStorage.getItem('customDiskSites')) || [];
    
    // Check if site with same URL already exists
    const existingIndex = savedSites.findIndex(s => s.url === site.url);
    
    if (existingIndex >= 0) {
        // Update existing site
        savedSites[existingIndex] = site;
    } else {
        // Add new site
        savedSites.push(site);
    }
    
    // Save to localStorage
    localStorage.setItem('customDiskSites', JSON.stringify(savedSites));
}

// Function to remove site from localStorage
function removeSiteFromStorage(url) {
    let savedSites = JSON.parse(localStorage.getItem('customDiskSites')) || [];
    
    // Filter out the site with the given URL
    savedSites = savedSites.filter(site => site.url !== url);
    
    // Save filtered list back to localStorage
    localStorage.setItem('customDiskSites', JSON.stringify(savedSites));
}

// Function to show message
function showMessage(message, type = 'error') {
    // Create message element if it doesn't exist
    let messageElement = document.querySelector('.message-popup');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'message-popup';
        document.body.appendChild(messageElement);
        
        // Add styles
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .message-popup {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 12px 20px;
                    border-radius: 8px;
                    color: #fff;
                    font-size: 0.9rem;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    z-index: 9999;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: all 0.3s ease;
                }
                
                .message-popup.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .message-popup.error {
                    background-color: rgba(255, 87, 87, 0.9);
                }
                
                .message-popup.success {
                    background-color: rgba(87, 187, 87, 0.9);
                }
            </style>
        `);
    }
    
    // Set message and type
    messageElement.textContent = message;
    messageElement.className = `message-popup ${type}`;
    
    // Show message
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 3000);
}

// Apply custom cursor effect
function applyCustomCursorEffect() {
    document.addEventListener('mousemove', (e) => {
        const cursor = document.createElement('div');
        cursor.classList.add('cursor-effect');
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
        
        document.body.appendChild(cursor);
        
        setTimeout(() => {
            cursor.remove();
        }, 1000);
    });
}

// Add styles for delete button
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .delete-site {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: rgba(255, 87, 87, 0.7);
            color: white;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        
        .disk-site-card {
            position: relative;
        }
        
        .disk-site-card:hover .delete-site {
            opacity: 1;
        }
        
        .delete-site:hover {
            background-color: rgba(255, 87, 87, 0.9);
        }
    </style>
`); 