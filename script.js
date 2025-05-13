const toggleIcon = document.getElementById("toggleIcon");
const resultArea = document.getElementById("resultArea");

// Zahlen & Zeichen eingeben
function eintippen(wert) {
  resultArea.innerHTML += wert;
  if (resultArea.innerHTML.length > 0) {
    document.getElementById(
      "toggleClear"
    ).innerHTML = `<i id="toggleIcon" class="material-icons backspace-icon">backspace</i>`;
  }
}

// Der letzte Zahl löschen
function clearLast() {
  resultArea.innerHTML = resultArea.innerHTML.slice(0, -1);
  if (resultArea.innerHTML.length === 0) {
    document.getElementById("toggleClear").innerHTML = "AC";
  }
}

/* "=" Zeichen */
function calculate() {
  const rechnen = document.getElementById("resultArea");
  const ausdruck = rechnen.innerHTML;

  // Fehler fangen, damit bei Syntaxfehlern nicht direkt ein Crash kommt
  let result;
  try {
    result = eval(ausdruck);
  } catch (error) {
    result = "Fehler";
  }

  rechnen.innerHTML = result;

  // Verlauf holen
  let speichern = JSON.parse(localStorage.getItem("gleichungen")) || [];

  // Ausdruck + Ergebnis speichern
  speichern.push(`${ausdruck} = ${result}`);

  // Verlauf wieder speichern
  localStorage.setItem("gleichungen", JSON.stringify(speichern));
}

// Icon toggle
function optionen() {
  console.log("Optionen Button wurde geklickt");
  const optionenMenu = document.getElementById("optionen-Menu");
  const sichtbar = window.getComputedStyle(optionenMenu).display !== "none";

  if (!sichtbar) {
    optionenMenu.style.display = "block";
    console.log("Menü sichtbar gemacht");
  } else {
    optionenMenu.style.display = "none";
    console.log("Menü versteckt");
  }
}

// Im Konsole testen
window.addEventListener("DOMContentLoaded", () => {
  const test = document.getElementById("optionen-Menu");
  console.log("optionen-Menu gefunden:", test);

  // AC & Backspace toggle auch nach seite neu laden
  if (resultArea.innerHTML.length > 0) {
    document.getElementById(
      "toggleClear"
    ).innerHTML = `<i id="toggleIcon" class="material-icons backspace-icon">backspace</i>`;
  } else {
    document.getElementById("toggleClear").innerHTML = "AC";
  }
});

// Verlauf Fenster anzeigen
function zeigeVerlauf() {
  const verlaufFenster = document.getElementById("verlauf-Fenster");
  const verlaufListe = document.getElementById("verlaufListe");

  // Verlauf aus localStorage holen
  const daten = JSON.parse(localStorage.getItem("gleichungen")) || [];

  // Vorher leeren, damit sich nichts doppelt
  verlaufListe.innerHTML = "";

  // Neue Einträge reinpacken
  daten.reverse().forEach((eintrag) => {
    const li = document.createElement("li");
    li.textContent = eintrag;
    verlaufListe.appendChild(li);
  });

  // Fenster anzeigen
  verlaufFenster.style.display = "block";
  document.getElementById("optionen-Menu").style.display = "none";
}

// Wenn es geklickt wird, dann zeige Verlauf
document
  .getElementById("verlauf-Button")
  .addEventListener("click", zeigeVerlauf);

// Auf ❌ klicken um zu schließen
document.getElementById("verlauf-Schliessen").addEventListener("click", () => {
  document.getElementById("verlauf-Fenster").style.display = "none";
});

// function +/- (Vozeichen wechseln)
function toggleVorzeichen() {
  let ausdruck = document.getElementById("resultArea").innerHTML;

  let letzterOperatorIndex = Math.max(
    ausdruck.lastIndexOf("+"),
    ausdruck.lastIndexOf("*"),
    ausdruck.lastIndexOf("/")
  );

  let letzteZahl = ausdruck.slice(letzterOperatorIndex + 1).trim();

  let neueZahl;
  if (letzteZahl.startsWith("-")) {
    neueZahl = letzteZahl.slice(1);
  } else {
    neueZahl = "-" + letzteZahl;
  }

  let neuerAusdruck = ausdruck.slice(0, letzterOperatorIndex + 1) + neueZahl;
  document.getElementById("resultArea").innerHTML = neuerAusdruck;
}
