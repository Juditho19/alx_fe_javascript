const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const addQuoteBtn = document.getElementById("addQuoteBtn");


// Default quotes array
const quotes = [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "The best way to get started is to quit talking and begin doing.", category: "Inspiration" }
];


// Load default quotes into localStorage if not already stored
if (!localStorage.getItem("initialized")) {
    quotes.forEach((q, i) => {
        localStorage.setItem(`quote_${i}`, JSON.stringify(q));
    });
    localStorage.setItem("initialized", "true");
}


function displayRandomQuote() {
    const allQuotes = [];


    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);


        try {
            const quoteObject = JSON.parse(value);
            if (quoteObject.text && quoteObject.category) {
                allQuotes.push(quoteObject);
            }
        } catch (error) {
            continue;
        }
    }


    if (allQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * allQuotes.length);
        const selected = allQuotes[randomIndex];
        quoteDisplay.innerHTML = `"${selected.text}" — <em>${selected.category}</em>`;
    } else {
        quoteDisplay.innerHTML = "No quotes available.";
    }
}


function addQuote() {
    const quote = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();


    if (quote !== '' && category !== '') {
        const newQuote = {
            text: quote,
            category: category
        };


        const uniqueKey = Date.now().toString();
        localStorage.setItem(uniqueKey, JSON.stringify(newQuote));


        newQuoteText.value = '';
        newQuoteCategory.value = '';


        displayRandomQuote(); // Optional: show the newly added quote
    } else {
        console.log("Please fill in both fields.");
    }
}


// Event listeners
addQuoteBtn.addEventListener('click', addQuote);
newQuoteBtn.addEventListener('click', displayRandomQuote);


