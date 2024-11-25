
// Button "Preberi vec"
document.querySelector(".read-more").addEventListener("click", function(event) {
  event.preventDefault(); // Prepreči preusmeritev povezave

  const moreText = document.getElementById("moreText");
  console.log("Gumb 'Preberi več' je bil kliknjen."); // Prikaže se vsakič, ko kliknemo gumb

  // Preveri, ali je tekst trenutno viden
  if (window.getComputedStyle(moreText).display === "none") {
      console.log("Prikazujem dodatno besedilo."); // Sporočilo ob prikazu besedila
      moreText.style.display = "inline"; // Prikaži besedilo
      this.querySelector("span").textContent = "Skrij"; // Spremeni tekst gumba
  } else {
      console.log("Skrivam dodatno besedilo."); // Sporočilo ob skrivanju besedila
      moreText.style.display = "none"; // Skrij besedilo
      this.querySelector("span").textContent = "Preberi več"; // Vrni začetno besedilo gumba
  }
  
  console.log("Trenutno stanje vidnosti: ", window.getComputedStyle(moreText).display); // Izpis trenutnega stanja
});

//Header
function toggleScrolled() {
  const selectBody = document.querySelector('body');
  const selectHeader = document.querySelector('#header');
  if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
  window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
}

document.addEventListener('scroll', toggleScrolled);
window.addEventListener('load', toggleScrolled);

// Inicializacija košarice kot prazen seznam
let kosarica = [];

// Funkcija za dodajanje izbrane igre v košarico
function dodajIzbranoIgro() {
  const izbranaIgra = document.getElementById("izbiraIgre");
  const imeIgre = izbranaIgra.value;
  const cenaIgre = parseFloat(izbranaIgra.options[izbranaIgra.selectedIndex].getAttribute("data-price"));

  // Preveri, ali je igra že v košarici
  const obstojecaIgra = kosarica.find(item => item.ime === imeIgre);

  if (obstojecaIgra) {
    obstojecaIgra.kolicina += 1; // Povečaj količino, če je že dodana
  } else {
    kosarica.push({ ime: imeIgre, cena: cenaIgre, kolicina: 1 });
  }

  posodobiKosarico(); // Osveži prikaz košarice
}

// Funkcija za posodobitev prikaza košarice
function posodobiKosarico() {
  const kosaricaVsebina = document.getElementById("kosaricaVsebina");
  const skupnaCenaElement = document.getElementById("skupnaCena");

  // Če je košarica prazna, prikaži sporočilo
  if (kosarica.length === 0) {
    kosaricaVsebina.innerHTML = "Košarica je prazna.";
    skupnaCenaElement.textContent = "0";
    return;
  }

  // Prikaz iger v košarici
  kosaricaVsebina.innerHTML = "";
  let skupnaCena = 0;

  kosarica.forEach(igra => {
    const igraSkupnaCena = igra.cena * igra.kolicina;
    skupnaCena += igraSkupnaCena;

    const kosaricaItem = document.createElement("div");
    kosaricaItem.classList.add("kosarica-item");
    kosaricaItem.innerHTML = `
      <span>${igra.ime} - ${igra.cena} € x ${igra.kolicina} = ${igraSkupnaCena} €</span>
      <button onclick="odstraniIzKosarice('${igra.ime}')">Odstrani</button>
    `;
    kosaricaVsebina.appendChild(kosaricaItem);
  });

  // Posodobitev skupne cene
  skupnaCenaElement.textContent = skupnaCena;
}

// Funkcija za odstranjevanje igre iz košarice
function odstraniIzKosarice(imeIgre) {
  const igraIndex = kosarica.findIndex(item => item.ime === imeIgre);

  if (igraIndex !== -1) {
    kosarica[igraIndex].kolicina -= 1; // Zmanjšaj količino

    // Če je količina igre 0, jo odstrani iz košarice
    if (kosarica[igraIndex].kolicina === 0) {
      kosarica.splice(igraIndex, 1);
    }
  }

  posodobiKosarico(); // Osveži prikaz košarice
}

// Shranjevanje podatkov
//localStorage.setItem('uporabnik', 'Janez');

// Pridobivanje podatkov
//const uporabnik = localStorage.getItem('uporabnik');
//console.log(uporabnik); // Prikaz: Janez

// Brisanje podatkov
//localStorage.removeItem('uporabnik');

// Brisanje vseh podatkov
//localStorage.clear();

