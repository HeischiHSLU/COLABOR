const original = document.querySelector('.left p')
const transformed = document.querySelector('.right p')
const rhymes = document.querySelector('#rhymes')

let og_text = ''
let split_text = null
let text_loaded = false
function load_text(txt) {
  for (let i = 0; i < txt.length; i++) {
    const t = txt[i];
    og_text += t + ' '
  }
  text_loaded = true
  original.innerHTML = highlight_nouns(og_text)
}

function highlight_nouns(txt) {
  const txt_elements = RiTa.tokenize(og_text)
  let html_txt = ''
  for (let i = 0; i < txt_elements.length; i++) {
    const word = txt_elements[i]
    if (RiTa.pos(word)[0] === 'nn') {
      html_txt += make_color_span(word) + ' '
    } else {
      html_txt += word + ' '
    }
  }
  return html_txt
}

// ignore this for now
rhymes.addEventListener('click', () => {
  if (text_loaded) {
    rhyme_nouns()
  }
})

function rhyme_nouns() {
  const txt_elements = RiTa.tokenize(og_text)
  let html_txt = ''
  for (let i = 0; i < txt_elements.length; i++) {
    const word = txt_elements[i]
    if (RiTa.pos(word)[0] === 'nn') {
      let pos = RiTa.tagger.allTags(word)[0];
      const rhyme = RiTa.soundsLikeSync(word, {pos})
      if (rhyme.length > 0) {
        html_txt += make_color_span(random(rhyme)) + ' '
      } else {
        html_txt += make_span(word) + ' '
      }
    } else {
      html_txt += word + ' '
    }
  }
  transformed.innerHTML = html_txt
}

function make_color_span(word) {
 let color = `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`
  return `<span class="word" style="color:${color}">${word}</span>`

}


function make_span(word) {
  return `<span class="word" style="color:#f33">${word}</span>`
}

function setup() {
  noCanvas()
  loadStrings('assets/txt/shelley.txt', load_text)
}

