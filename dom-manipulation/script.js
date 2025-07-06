const quoteDisplay = document.getElementById('quoteDisplay');
const newQuote = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (text && category) {
    const newEntry = { quote: text, category: category };
    const uniqueKey = Date.now().toString();
    localStorage.setItem(uniqueKey, JSON.stringify(newEntry));
    newQuoteText.value = "";
    newQuoteCategory.value = "";
  } else {
    console.log("Please fill in both fields.");
  }
}

function showRandomQuote() {
  const allQuotes = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    try {
      const parsed = JSON.parse(value);
      if (parsed.quote && parsed.category) {
        allQuotes.push(parsed);
      }
    } catch (e) {
      // not valid JSON
    }
  }

  if (allQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
  } else {
    const selected = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    quoteDisplay.textContent = `"${selected.quote}" — ${selected.category}`;
  }
}

newQuote.addEventListener('click', showRandomQuote);
