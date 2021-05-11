function calcularMarginAreaMovies(valorInicial, valorAtual, valorFinal) {
  return valorAtual + (valorFinal - valorInicial);
}

async function pegarFilmes() {
  var randomPage = Math.ceil(Math.random() * 200);
  var resultApi = "";
  await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=50101eee570e060979830647dca135f0&language=pt-BR&page=${randomPage}`
  )
    .then((r) => r.json())
    .then((r) => {
      resultApi = r.results;
    });

  await gerarPage(resultApi);
}

function gerarPage(result) {
  var randomNumber = Math.ceil(Math.random() * 20);

  document.querySelector(
    ".areaBanner"
  ).style.backgroundImage = `url(http://image.tmdb.org/t/p/original${result[randomNumber].backdrop_path})`;

  document.querySelector(
    ".nameMovie"
  ).innerHTML = `${result[randomNumber].title}`;

  document.querySelector(
    ".descMovie"
  ).innerHTML = `${result[randomNumber].overview}`;

  result.map((item, index) => {
    let movie = document.querySelector(".movie").cloneNode(true);

    movie.setAttribute("data-key", index);

    movie.style.backgroundImage = `url(http://image.tmdb.org/t/p/original${item.poster_path})`;

    document.querySelector(".areaMovies").append(movie);
  });
}
var pressionado;
var atual;
var inicial;
document.querySelector(".areaMovies").style.marginLeft = "0px";
document.querySelector(".movies").addEventListener("mousedown", (e) => {
  inicial = e.pageX;
  atual = parseInt(document.querySelector(".areaMovies").style.marginLeft);
  pressionado = true;
});

document.querySelector(".movies").addEventListener("mousemove", (e) => {
  if (pressionado) {
    move = calcularMarginAreaMovies(inicial, atual, e.pageX);
    if (move > 0) {
      move = 0;
    } else if (move < -4110) {
      move = -4110;
    }
    document.querySelector(".areaMovies").style.marginLeft = `${move}px`;
  }
});

document.querySelector(".movies").addEventListener("mouseup", () => {
  pressionado = false;
});

pegarFilmes();
