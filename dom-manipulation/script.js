const quoteDisplay= document.getElementById("quoteDisplay");
const newQuoteBtn= document.getElementById("newQuote");
const newQuoteText= document.getElementById("newQuoteText");
const newQuoteCategory= document.getElementById("newQuoteCategory");
const addQuoteBtn= document.getElementById("addQuoteBtn");


function addQuote(){
    // Get the input values and remove spaces
    const quote= newQuoteText.value.trim();
    const category= newQuoteCategory.value.trim();


    // Only continue if both fields are filled
    if (quote !== '' && category !== ''){
        // Make a quote object
        const newQuote= {
            quote: quote,
            category: category
        }


        // Convert to string to store in localStorage
        const quoteString= JSON.stringify(newQuote);


        // Create a unique key using Date.now()
        const uniquekey= Date.now().toString();


        // Save to localStorage
        localStorage.setItem(uniquekey, quoteString);


        // Clear input fields
        newQuoteText.value= '';
        newQuoteCategory.value= '';


        // Optional, for testing
        console.log('Quote added: ', newQuote );






    }
    else{
        console.log("Please fill in both fields.");


    }
}
// Add the click event listener
addQuoteBtn.addEventListener('click', addQuote);






function showRandomQuote(){
    const allQuotes = [];


    //Loop through all keys in localStorage
    for (let i=0; i < localStorage.length; i++) {
        const key= localStorage.key(i);
        const value= localStorage.getItem(key);


        try{
            const quoteObject= JSON.parse(value);


            // Only add if it has both quote and category
            if (quoteObject.quote && quoteObject.category ){
                allQuotes.push(quoteObject)
            }
        } catch (error){
            // Skip anything that isn't valid JSON
            continue;
        }
    }


   
    // If there are quotes, show a random one
    if (allQuotes.length > 0){
        const randomIndex= Math.floor(Math.random() * allQuotes.length);
        const selected = allQuotes[randomIndex];


        quoteDisplay.textContent = `"${selected.quote}" — ${selected.category}`;


    } else{
        quoteDisplay.textContent = "No quotes available.";
    }
       
   
}
newQuoteBtn.addEventListener('click', showRandomQuote);
