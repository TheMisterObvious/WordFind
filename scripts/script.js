const english = en_words.split("\n");
var wordToFind = ""

const body = document.getElementsByTagName("body")[0]
const input = document.getElementById("word-input")
input.value = ""

input.addEventListener("change", (e) => { wordToFind = e.target.value.toLowerCase() })

const from = document.getElementById("from")
const without = document.getElementById("without")
const to = document.getElementById("to")
const typefrom = document.getElementById("type-from")
const typewithout = document.getElementById("type-without")
const typeto = document.getElementById("type-to")

from.addEventListener("mouseenter", () => typefrom.classList.add("type-hover"))
from.addEventListener("mouseleave", () => typefrom.classList.remove("type-hover"))
without.addEventListener("mouseenter", () => typewithout.classList.add("type-hover"))
without.addEventListener("mouseleave", () => typewithout.classList.remove("type-hover"))
to.addEventListener("mouseenter", () => typeto.classList.add("type-hover"))
to.addEventListener("mouseleave", () => typeto.classList.remove("type-hover"))

function showError() {
    input.classList.add("shake")
    setTimeout(() => input.classList.remove("shake"), 600)
}

function showOutput(output) {
    body.style.overflowY = "scroll"

    const outputDiv = document.getElementById("output")
    outputDiv.innerHTML = ""
    
    if (output.length === 0) {
        const outP = document.createElement("p")
        outP.innerHTML = "No results found"
        outP.style.color = "#ff463c"
        outputDiv.append(outP)
    } else for (const out of output) {
        const outP = document.createElement("p")
        outP.innerHTML = out
        outputDiv.append(outP)
    }

    if (outputDiv.style.display !== "flex") {
        outputDiv.style.marginTop = window.screen.height - body.offsetHeight + "px"
        outputDiv.style.display = "flex"
    }

    window.scrollTo(0, outputDiv.offsetTop - 60)
}

function upperFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1, word.length)
}

function isIn(w, word) {
    var i = 0
    for (const l of word) if (l === w[i]) i++
    return i === w.length
}

function minusWord(minus, word) {
    for (const l of word) minus = minus.replace(l, "")
    return minus
}

function fromWord() { // The "given" without **** is just ****
    if (wordToFind.length === 0) return showError()

    var output = []
    for (const word of english) {
        if (!isIn(word, wordToFind)) continue

        const minus = minusWord(wordToFind, word)
        if (minus !== wordToFind && english.includes(minus)) output.push(`<a href="https://www.wordreference.com/definition/${wordToFind}" target="_blank"><span class="from">${upperFirst(wordToFind.toLowerCase())}</span></a> without <a href="https://www.wordreference.com/definition/${word}" target="_blank"><span class="without">${word}</span></a> is just <a href="https://www.wordreference.com/definition/${minus}" target="_blank"><span class="to">${minus}</span></a>`)
    }
    
    showOutput(output.map((word) => word.replaceAll("\r", "")))
}

function withoutWord() { // The **** whitout "given" is just ****
    if (wordToFind.length === 0) return showError()

    var output = []
    for (const word of english) {
        if (!isIn(wordToFind, word)) continue
        
        const minus = minusWord(word, wordToFind)
        if (english.includes(minus)) output.push(`<a href="https://www.wordreference.com/definition/${word}" target="_blank"><span class="from">${upperFirst(word)}</span></a> without <a href="https://www.wordreference.com/definition/${wordToFind}" target="_blank"><span class="without">${wordToFind.toLowerCase()}</span></a> is just <a href="https://www.wordreference.com/definition/${minus}" target="_blank"><span class="to">${minus}</span></a>`)
    }
    
    showOutput(output.map((word) => word.replaceAll("\r", "")))
}

function toWord() { // The **** without **** is just "given"
    if (wordToFind.length === 0) return showError()
    
    var output = []
    for (const word of english) {
        if (isIn(wordToFind, word)) {
            const minus = minusWord(word, wordToFind)
            if (english.includes(minus)) output.push(`<a href="https://www.wordreference.com/definition/${word}" target="_blank"><span class="from">${upperFirst(word)}</span></a> without <a href="https://www.wordreference.com/definition/${minus}" target="_blank"><span class="without">${minus}</span></a> is just <a href="https://www.wordreference.com/definition/${wordToFind}" target="_blank"><span class="to">${wordToFind.toLowerCase()}</span></a>`)
        }
    }
    
    showOutput(output.map((word) => word.replaceAll("\r", "")))
}
