const quoteDisplay= document.getElementById('quoteDisplay');
const newQuote= document.getElementById('newQuote');
const newQuoteText= document.getElementById('newQuoteText');
const newQuoteCategory= document.getElementById('newQuoteCategory');



function addQuote(){
    text= newQuoteText.value.trim();
    category= newQuoteCategory.value.trim();

    if (text && category){
        const newEntry = {
            quote: text,
            category: category
        };

        const uniqueKey= Date.now().toString();
        const jsonString= JSON.stringify(newEntry);
        


        localStorage.setItem(uniqueKey, jsonString);
        
        newQuoteText.value= "";
        newQuoteCategory.value= "";

      
    }
    else{
        console.log("Please fill in both fields.")
    }
}

function createAddQuoteForm(){
    const allQuotes= [];

    for (let i=0; i< localStorage.length; i++){
        const key= localStorage.key(i);
        const value= localStorage.getItem(key);

        try{
            const parsed= JSON.parse(value);

            if (parsed.quote && parsed.category) {
                allQuotes.push(parsed);
            }
        } catch (e){
            // skip non-JSON entries
        }
    }
    showRandomQuote(allQuotes);
}


function showRandomQuote(allQuotes){
    if (allQuotes.length > 0){
        const randomIndex= Math.floor(Math.random() *allQuotes.length);
        const selected= allQuotes[randomIndex];

        quoteDisplay.textContent= `"${selected.quote}" — ${selected.category}`
    }
    else{
        quoteDisplay.textContent = "No quotes available.";

    }
    

    
}
newQuote.addEventListener('click', createAddQuoteForm );