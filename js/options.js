let status = document.getElementById("status")
let userBlacklist = document.getElementById('blacklist')

function save() {
    status.textContent = "..."
    chrome.storage.sync.set({
        'blacklist': userBlacklist.value
    }, function() {
        status.textContent = "Saved."
    })
}

function restore() {
    chrome.storage.sync.get('blacklist', function(result) {
        console.log(result)
        userBlacklist.value = result.blacklist
    })
}

document.addEventListener('DOMContentLoaded', restore)
document.getElementById('save').addEventListener('click', save)