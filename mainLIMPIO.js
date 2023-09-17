const divContainer = document.getElementById("container");
const divPaginado=document.querySelector(".pagination")
const divLoaderPage=document.querySelector(".loader-pagination")
const btnPrev = document.querySelector(".previewPage-btn");
const btnNext = document.querySelector(".nextPage-btn");
const btnFirst = document.querySelector(".firstPage-btn");
const btnLast = document.querySelector(".lastPage-btn");
const paginaActual = document.querySelector(".paginaActual");
const totalPaginas = document.querySelector(".totalPaginas");
const femaleFilter = document.querySelector(".female-btn");
const maleFilter = document.querySelector(".male-btn");
const genderLessFilter = document.querySelector(".genderless-btn");
const unknowFilter = document.querySelector(".unknow-btn");
const todosbtn = document.querySelector(".todos");
const divCards=document.querySelector(".cards")

let numeroPagina = 1;
let numeroTotalPaginas = 0;

//obtenemos los datos de la API
const getCharacters = () => {
  divContainer.innerHTML = "";
  fetch(`https://rickandmortyapi.com/api/character?page=${numeroPagina}`)
    .then((res) => res.json())
    .then((data) => {
      numeroTotalPaginas = data.info.pages;
      totalPaginas.innerHTML = numeroTotalPaginas;
      paginaActual.innerHTML = numeroPagina;
      charactersArray = data.results;
      showMeCharacters(data);
      refreshPages()
    });
};
getCharacters();

//Mostramos los datos
const showMeCharacters = (filterParam, valueParam) => {
  divContainer.innerHTML = "";
  charactersArray.forEach((character) => {
    divContainer.innerHTML += `
        <div class="cards zoom">
            <h2 class="neon">${character.name}</h2>
            <img src="${character.image}" alt="">
            <button class="readMore-btn neon" onclick=characterDetail("${character.url}")> <strong>Ver mas </strong></button>
        </div>
        `;
  });
  // btnNext.innerHTML += ` <button onclick=nextPages("charactersNext")>Siguiente</button>`)  | Otro item de la segunda via del paginado.
};
//DETALLE DE CADA PERSONAJE
const characterDetail = (characterUrl)=>{
  fetch(characterUrl)
  .then (res => res.json()) 
  .then ((data) => {
divContainer.innerHTML=""
  divContainer.innerHTML =`
  <div class="cards-detail">
      <h2>${data.name}</h2>
      <img src="${data.image}" alt="">
      <p>Caracteristicas:</p>
      <ul>
     <li> <p> <i><strong> Gender: </strong></i>${data.gender}</p></li>
     <li> <p> <i><strong> Specie: </strong></i>${data.species}</p></li>
     <li> <p> <i><strong> Location: </strong></i>${data.location.name}</p></li>
     <li> <p> <i><strong> Status: </strong></i>${data.status}</p></li>
     <li> <p> <i><strong> Origin :</strong></i>${data.origin.name}</p></li>
  </ul>
      <button class="button neon" onclick=getCharacters()> Volver </button>
  </div>
  `;
  btnPrev.disabled = true;
  btnFirst.disabled = true;
  btnNext.disabled = true;
  btnLast.disabled = true;
})}


//Actualizamos el paginado 
const refreshPages = () => {
  if (numeroPagina <= 1) {
    btnPrev.disabled = true;
    btnFirst.disabled = true;
  } else  if (1<numeroPagina<numeroTotalPaginas){
    btnPrev.disabled = false;
    btnFirst.disabled = false;
  }
  if (numeroPagina === numeroTotalPaginas) {
    btnNext.disabled = true;
    btnLast.disabled = true;
  } else {
    btnNext.disabled = false;
    btnLast.disabled = false;
  }
};

//filtrado de personajes 
const filtradoFEMALE = () => {
  divContainer.innerHTML = "";
  url = `https://rickandmortyapi.com/api/character?gender=Female`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      paginaActual.innerHTML = numeroPagina;
      numeroTotalPaginas = data.info.pages;
      totalPaginas.innerHTML = numeroTotalPaginas;
      femaleArray = data.results;
      femaleArray.forEach((femalech) => {
        divContainer.innerHTML += `
              <div class="cards">
                  <h2 class="neon">${femalech.name}</h2>
                  <img src="${femalech.image}" alt="">
                  <button class="readMore-btn" onclick=characterDetail("${femalech.url}")> Ver mas </button>
              </div>
              `;
      });
      refreshPages();
     // pagesFemale();
    });
};
const filtradoMALE = () => {
  divContainer.innerHTML = "";
  url = `https://rickandmortyapi.com/api/character?gender=Male`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      paginaActual.innerHTML = numeroPagina;
      numeroTotalPaginas = data.info.pages;
      totalPaginas.innerHTML = numeroTotalPaginas;
      maleArray = data.results;
      maleArray.forEach((malech) => {
        divContainer.innerHTML += `
              <div class="cards">
                  <h2 class="neon">${malech.name}</h2>
                  <img src="${malech.image}" alt="">
                  <button class="readMore-btn" onclick=characterDetail("${malech.url}")> Ver mas </button>
              </div>
              `;
      });
      refreshPages();
      pagesMale();
    });
};
const filtradoGENDERLESS = () => {
  divContainer.innerHTML = "";
  url = `https://rickandmortyapi.com/api/character?gender=genderless`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      paginaActual.innerHTML = numeroPagina;
      numeroTotalPaginas = data.info.pages;
      totalPaginas.innerHTML = numeroTotalPaginas;
      genderlessArray = data.results;
      genderlessArray.forEach((genderlessch) => {
        divContainer.innerHTML += `
              <div class="cards">
                  <h2 class="neon">${genderlessch.name}</h2>
                  <img src="${genderlessch.image}" alt="">
                  <button class="readMore-btn" onclick=characterDetail("${genderlessch.url}")> Ver mas </button>
              </div>
              `;
      });
      refreshPages();
      //pagesGenderless();
    });
};
const filtradoUNKNOW = () => {
  divContainer.innerHTML = "";
  url = `https://rickandmortyapi.com/api/character?gender=unknow`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      paginaActual.innerHTML = numeroPagina;
      numeroTotalPaginas = data.info.pages;
      totalPaginas.innerHTML = numeroTotalPaginas;
      unknowArray = data.results;
      unknowArray.forEach((unknowch) => {
        divContainer.innerHTML += `
              <div class="cards">
                  <h2 class="neon">${unknowch.name}</h2>
                  <img src="${unknowch.image}" alt="">
                  <button class="readMore-btn" onclick=characterDetail("${unknowch.url}")> Ver mas </button>
              </div>
              `;
      });
      refreshPages();
      //pagesUnknow();
    });
};

//EVENTOS DEL FILTRADO

/*
Metodo de filtrado con un solo fetch

const filtrado =(filterParam, valueParam)=>{
  fetch (`https://rickandmortyapi.com/api/character/?${filterParam}=${valueParam}`)
  .then (res => res.json())
  .then ((data) => {showMeCharacters(filterParam, valueParam)
})}
*/

//EVENTOS DEL FILTRADO

femaleFilter.addEventListener("click", () => {
  filtradoFEMALE();
});
maleFilter.addEventListener("click", () => {
filtradoMALE()
});
genderLessFilter.addEventListener("click", () => {
  filtradoGENDERLESS();
});
unknowFilter.addEventListener("click", () => {
  filtradoUNKNOW();
});

todosbtn.addEventListener("click", () => {
  getCharacters();
});

//EVENTOS DEL PAGINADO
  btnNext.addEventListener('click', () => {
    if(numeroPagina<=1){
      numeroPagina++
    } else if (numeroPagina>1 && numeroPagina<numeroTotalPaginas){
  numeroPagina ++}
   getCharacters()
   console.log(numeroPagina)
  })
  
  btnPrev.addEventListener('click', () => {
    if (numeroPagina>1 && numeroPagina<=numeroTotalPaginas){
  numeroPagina--
    }
  getCharacters()
  console.log(numeroPagina)
  })
  
  btnLast.addEventListener('click', () => {
  if(numeroPagina <numeroTotalPaginas){
      numeroPagina=numeroTotalPaginas
  }
  getCharacters()
  console.log(numeroPagina)
  })
  
  btnFirst.addEventListener('click', () => {
  if(numeroPagina > 2){
  numeroPagina = 1;
  getCharacters()
  console.log(numeroPagina)
  }
  })



