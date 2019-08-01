let blacklist = document.getElementById('blacklist')
let input = document.getElementById('newSubreddit')

function addItem() {
    let subreddit = input.value

    fetch(function(result) {
        var subreddits = result
        if (subreddits == undefined) {
            subreddits = []
        }

        subreddits.push(subreddit)
        setList(subreddits)

        save(subreddits, function() {
            input.value = ""
        })
    })
}

function deleteItem(click) {
    let target = click.currentTarget
    let id = target.id
    let index = id.split('-').pop()

    fetch(function(result) {
        result.splice(index, 1)
        setList(result)
        save(result, function() {
            restore()
        })
    })
}

function restore() {
    fetch(function(result) {
        if (result == undefined) return
        setList(result)
    })
}

function setList(list) {
    blacklist.innerHTML = listHTML(list)
    let buttons = document.getElementsByClassName('listButton')
    Array.from(buttons).forEach(function(button) {
        button.addEventListener('click', deleteItem)
    })
}

function listHTML(list) {
    var html = ""
    list.forEach(element => {
        let index = list.indexOf(element)
        let button = "<button class=\"listButton\" id=button-" + index + ">Delete</button>"
        html += "<li class=\"listItem\" id=li-" + index + ">" + element + button + "</li>"
    });
    return html
}

function save(value, handler) {
    chrome.storage.sync.set({
        blacklist: value
    }, function() {
        if (handler == undefined) return
        handler()
    })
}

function fetch(callback) {
    chrome.storage.sync.get(['blacklist'], function(result) {
        callback(result.blacklist)
    })
}

document.addEventListener('DOMContentLoaded', restore)
document.getElementById('addButton').addEventListener('click', addItem)