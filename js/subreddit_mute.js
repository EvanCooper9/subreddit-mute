var posts = document.getElementsByClassName('Ywkt6EDfNWINeTr9lP29H')

var blacklist = []
var hiddenBlocks = []

function hideElement(block) {
    block.style.display = 'none'
    hiddenBlocks.push(block)
}

function showElement(block) {
    if (hiddenBlocks.includes(block)) {
        block.style.display = ''
        hiddenBlocks.remove(block)
    }
}

Array.prototype.remove = function(element) {
    this.filter(function(e) {
        return e != element
    })
}

function subreddit_mute() {
    chrome.storage.sync.get('blacklist', function(result) {
        blacklist = result.blacklist
        if (blacklist == null) {
            console.log('Subreddit mute: Set the subreddits to mute in the options')
            return
        }
        console.log('Subreddit mute: hiding posts from: ' + blacklist)
        Array.from(posts).forEach(function(post) {
            let subreddit = post.textContent.split('•')[0]
            if (blacklist.includes(subreddit)) {
                let block = post.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
                hideElement(block)
            } 
        })
    })
}

// probably overkill, oh well..
document.addEventListener('DOMNodeInserted', subreddit_mute)