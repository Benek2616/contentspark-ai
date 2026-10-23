const platforms = document.querySelectorAll('.platform');
const nicheInput = document.getElementById('niche');
const styleSelect = document.getElementById('style');
const generateBtn = document.getElementById('generate');
const resultsSection = document.getElementById('results');
const ideasList = document.getElementById('ideas-list');
const regenerateBtn = document.getElementById('regenerate');

let currentPlatform = 'tiktok';

platforms.forEach(btn => {
  btn.addEventListener('click', () => {
    platforms.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentPlatform = btn.dataset.platform;
  });
});

// Baza pomysłów i szablonów
const templates = {
  educational: {
    hooks: [
      "Większość ludzi robi to źle...",
      "3 rzeczy, których nikt Ci nie mówi o",
      "Przestań marnować czas na",
      "To zmieniło moje podejście do",
      "Prosty trik, który działa lepiej niż",
      "Dlaczego 90% osób przegrywa z",
      "Zrób to przez 7 dni i zobacz różnicę"
    ],
    structures: [
      "Pokaż błąd → poprawne rozwiązanie → efekt",
      "Mit vs rzeczywistość",
      "Krok po kroku (3-5 punktów)",
      "Przed i po",
      "Checklist, którą możesz zapisać"
    ]
  },
  entertaining: {
    hooks: [
      "Nikt nie spodziewał się takiego zakończenia",
      "Spróbuj nie zaśmiać się",
      "To było bardziej żenujące niż myślisz",
      "Relatable content entering the chat",
      "Kiedy myślisz, że masz kontrolę...",
      "POV: jesteś...",
      "Challenge, którego nikt nie przechodzi"
    ],
    structures: [
      "Setup → twist → punchline",
      "Oczekiwanie vs rzeczywistość",
      "Story z nieoczekiwanym zakończeniem",
      "Reakcja + komentarz",
      "Szybkie cięcia + tekst na ekranie"
    ]
  },
  story: {
    hooks: [
      "Rok temu byłem w zupełnie innym miejscu",
      "Nikt nie wiedział, przez co przechodziłem",
      "Ta jedna decyzja wszystko zmieniła",
      "Pamiętam dzień, w którym...",
      "Gdybym mógł wrócić w czasie, powiedziałbym sobie",
      "Najtrudniejsza rozmowa, jaką odbyłem",
      "To, czego żałuję najbardziej"
    ],
    structures: [
      "Początek → konflikt → przełom → morał",
      "3 lekcje z mojej historii",
      "Co zrobiłbym inaczej",
      "Moment, który wszystko zmienił",
      "Od dna do..."
    ]
  },
  controversial: {
    hooks: [
      "Niepopularna opinia:",
      "Czas przestać udawać, że",
      "Większość osób się myli w kwestii",
      "To, co zaraz powiem, może Cię wkurzyć",
      "Przestańcie powtarzać ten mit",
      "Prawda, której nikt nie chce usłyszeć",
      "Dlaczego wszyscy się mylą"
    ],
    structures: [
      "Mocne stwierdzenie → argumenty → kontra",
      "Rozbijanie popularnego przekonania",
      "Dwie strony medalu",
      "Pytanie, które dzieli ludzi",
      "Fakty vs emocje"
    ]
  },
  motivational: {
    hooks: [
      "Jeśli czujesz, że stoisz w miejscu...",
      "To nie talent. To systematyczność.",
      "Przestań czekać na idealny moment",
      "Twoja przyszłość ja zaczyna się od jednej decyzji",
      "Małe kroki > wielkie plany",
      "Nie musisz być gotowy. Musisz zacząć.",
      "Rok od teraz podziękujesz sobie"
    ],
    structures: [
      "Problem → przebudzenie → działanie",
      "Historia + konkretna rada",
      "3 zasady, które zmienią Twoje podejście",
      "Przestań / Zacznij lista",
      "Wizualizacja efektu + call to action"
    ]
  }
};

const platformTips = {
  tiktok: { length: "15-30 sekund", format: "Pionowy, szybkie cięcia, tekst na ekranie" },
  instagram: { length: "15-30 sekund (Reels)", format: "Estetyczny, muzyka trending, napisy" },
  youtube: { length: "30-60 sekund", format: "Mocny hook w 3 sekundy, wartość od razu" },
  x: { length: "1-3 zdania + wątek", format: "Mocne otwarcie, konkret, CTA na końcu" }
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateIdeas(niche, style, platform) {
  const t = templates[style];
  const ideas = [];

  for (let i = 0; i < 5; i++) {
    const hook = pick(t.hooks);
    const structure = pick(t.structures);
    
    // Tworzenie tytułu/pomysłu
    const titles = [
      `${hook} ${niche}`,
      `Jak ${niche} zmienia wszystko (i dlaczego nikt o tym nie mówi)`,
      `${niche} – to, czego nauczyłem się po roku`,
      `Przestań robić to przy ${niche}`,
      `3 sposoby na lepsze ${niche}`,
      `Dlaczego ${niche} jest trudniejsze niż myślisz`,
      `${niche} w 2026 – co naprawdę działa`,
      `Mój proces przy ${niche} (szczerze)`,
      `Największy błąd przy ${niche}`,
      `${niche}: od kompletnego zera do efektów`
    ];

    const title = pick(titles).replace(/  +/g, ' ');
    const tip = platformTips[platform];

    ideas.push({
      title,
      hook: `${hook} ${niche.charAt(0).toLowerCase() + niche.slice(1)}...`,
      structure,
      length: tip.length,
      format: tip.format
    });
  }

  return ideas;
}

function renderIdeas(ideas) {
  ideasList.innerHTML = ideas.map((idea, i) => `
    <div class="idea-card">
      <div class="num">POMYSŁ ${i + 1}</div>
      <h3>${idea.title}</h3>
      <div class="hook">"${idea.hook}"</div>
      <div class="meta">
        <span class="tag">${idea.structure}</span>
        <span>${idea.length}</span>
        <span>${idea.format}</span>
      </div>
    </div>
  `).join('');

  resultsSection.classList.remove('hidden');
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function runGenerate() {
  const niche = nicheInput.value.trim();
  if (!niche) {
    nicheInput.focus();
    nicheInput.style.borderColor = '#ef4444';
    setTimeout(() => nicheInput.style.borderColor = '', 1200);
    return;
  }

  const style = styleSelect.value;
  const ideas = generateIdeas(niche, style, currentPlatform);
  renderIdeas(ideas);
}

generateBtn.addEventListener('click', runGenerate);
regenerateBtn.addEventListener('click', runGenerate);

// Enter support
nicheInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') runGenerate();
});