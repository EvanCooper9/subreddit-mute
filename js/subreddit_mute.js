var posts = document.getElementsByClassName('Ywkt6EDfNWINeTr9lP29H')

var blacklist = ['r/ProgrammerHumor']
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
    Array.from(posts).forEach(function(post) {
        let subreddit = post.textContent.split('•')[0]
        if (blacklist.includes(subreddit)) {
            let block = post.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
            hideElement(block)
        } 
    })
}

subreddit_mute()

// probably overkill, oh well..
document.addEventListener('DOMNodeInserted', subreddit_mute)