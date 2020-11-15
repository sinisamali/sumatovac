"use strict";

function createCookie(name, value, days, domain) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  } else {
    var expires = "";
  }
  document.cookie = name + "=" + value + expires + "; domain=" + domain + "; path=/";
}

function eraseCookie(name, domain) {
  createCookie(name, "", -1, domain);
}

window.addEventListener('unload', () => {
  eraseCookie("googtrans", ".sumatovacalforno.rs");
  eraseCookie("googtrans", "");
})
const modalBackground = document.querySelector('.modal-background')
const divIspis = document.querySelector('.ispis')
const vina = document.querySelector('.vina')
const meniDiv = document.querySelector('.meniDiv')
const navLinks = document.querySelectorAll('.nav-link')
const allSections = document.querySelectorAll('section')
const dete1 = document.querySelectorAll('.dete1')
const btnNaruciHeader = document.querySelector('.btnNaruciHeader')
const zahtev = async () => {
  const res = await fetch('../data.json');
  const data = await res.json()
  izlistaj(divIspis, data, "Pice")
  izlistaj(vina, data, "Vino")
  izlistaj(meniDiv, data, "Hrana")
}
zahtev()

function izlistaj(unutra, source, item) {
  let dataObj = source[item]
  dataObj.forEach(element => {
    for (let [key, value] of Object.entries(element)) {
      let klasa = String(key).replace(/\s/g, '-').toLocaleLowerCase();
      let accordionItemHeaders = document.createElement('div');
      accordionItemHeaders.classList.add('accordion-item-header')
      accordionItemHeaders.innerText = key
      accordionItemHeaders.addEventListener('click', function (e) {
        const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
        if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeaders) {
          currentlyActiveAccordionItemHeader.classList.toggle("active");
          currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
        }
        accordionItemHeaders.classList.toggle("active");
        if (accordionItemHeaders.classList.contains("active")) {
          acordionBody.style.maxHeight = acordionBody.scrollHeight + "px";
        }
        else {
          acordionBody.style.maxHeight = 0;
        }
      })
      const valuta = 'RSD'
      let acordionitem = document.createElement('div')
      acordionitem.classList.add('.accordion-item')
      acordionitem.appendChild(accordionItemHeaders)
      let acordionBody = document.createElement('div')
      acordionBody.classList.add('accordion-item-body')
      value.forEach(item => {
        let acordionItemContent = document.createElement('div')
        acordionItemContent.classList.add('accordion-item-body-content')

        if (item.kolicina !== undefined) {

          acordionItemContent.innerText = `${item.naziv} , ${item.kolicina} ml : ${item.cena} ${valuta}`
        } else {
          acordionItemContent.innerText = ` ${item.naziv} : ${item.cena} ${valuta} (${item.sastav})`
          acordionItemContent.addEventListener('click', function () {
            let divDetalji = document.createElement('div')
            divDetalji.classList.add('iskacuci')
            divDetalji.innerHTML = `
            <h1><span class="span-linija">${item.naziv}</span></h1>    <button class = 'izbrisiDiv'>X</button>
            <div class='divslikaiskacuci'><img src="../${item.img}" alt = ""/> </div>
            <h2><span class="span-linija">Cena : ${item.cena} ${valuta} </span></h2>
            <div class='text-iskacuci'>
            <h2><span class="span-linija">Koriščene namirnice: </span></h2>
            <h3>(${item.sastav})</h3>
            </div>
            `
            meniDiv.appendChild(divDetalji)
            modalBackground.style.display = "block"
            document.body.style.overflow = 'hidden'
            let izbrisiDiv = document.querySelector('.izbrisiDiv')
            izbrisiDiv.addEventListener('click', function () {
              modalBackground.style.display = 'none'
              divDetalji.style.display = 'none'
              meniDiv.removeChild(divDetalji)
              document.body.style.overflow = ''
            })

          })
        }
        acordionBody.appendChild(acordionItemContent)
        acordionitem.appendChild(acordionBody)
      })

      unutra.appendChild(acordionitem)


    }

  })
}


var slideIndex = 0;
let slides = null;
let myTimer = null;
btnNaruciHeader.addEventListener('click', onLinkClick)
dete1.forEach(link => {
  link.addEventListener('click', onLinkClick)
}
)

navLinks.forEach(link => {
  link.addEventListener('click', onLinkClick)
}
)
function onLinkClick(e) {
  let dataLink = e.target.parentElement.dataset.link || e.target.dataset.link;
  if (!dataLink) dataLink = e.target.parentElement.parentElement.parentElement.dataset.link;
  allSections.forEach(section => {
    if (section.classList.contains('active')) section.classList.remove('active');
  });
  document.querySelector(`#${dataLink}`).classList.add('active');


  slides = document.querySelectorAll(`.mySlides-${dataLink}`);
  if (slides.length > 0) {
    clearInterval(myTimer);
    showSlides(slideIndex);
    myTimer = setInterval(function () {
      plusSlides(1);
    }, 2500);
  }
  if (window.innerWidth < 999) {
    const x = document.getElementsByTagName('nav')[0];
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
}
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 20 && window.innerWidth < 999) {
    const x = document.getElementsByTagName('nav')[0];
    if (x.style.display === "block") {
      x.style.display = "none";
    }
  }
})


function plusSlides(n) {
  clearInterval(myTimer);
  if (n < 0) {
    showSlides((slideIndex -= 1));
  } else {
    showSlides((slideIndex += 1));
  }
  if (n === -1) {
    myTimer = setInterval(function () {
      plusSlides(n + 2);
    }, 2000);
  } else {
    myTimer = setInterval(function () {
      plusSlides(n + 1);
    }, 2000);
  }
}

function showSlides(n) {
  var i;
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
}
function myFunction() {
  var x = document.getElementsByTagName('nav')[0]
  if (x.style.display === "block") {
    x.style.display = "none";

  } else {
    x.style.display = "block";
  }

}


