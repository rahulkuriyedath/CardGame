// document.addEventListener('DOMContentLoaded', () => {
//     const cardElement = document.getElementById('card');
//     const cardFrontElement = document.getElementById('card-front');

//     cardElement.addEventListener('click', async () => {
//         try {
//             const response = await fetch('cardTexts.txt');
            
//             if (!response.ok) {
//                 throw new Error(`Failed to load cardTexts.txt: ${response.status} ${response.statusText}`);
//             }

//             const cardTexts = await response.text();
//             const cardTextsArray = cardTexts.split('\n').filter(Boolean);

//             console.log('Loaded card texts:', cardTextsArray);

//             const randomTextIndex = Math.floor(Math.random() * cardTextsArray.length);
//             cardFrontElement.textContent = cardTextsArray[randomTextIndex];

//             console.log('Displayed text:', cardFrontElement.textContent);

//             cardElement.classList.toggle('is-flipped');
//         } catch (error) {
//             console.error(error);
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const cardElement = document.getElementById('card');
    const cardFrontElement = document.getElementById('card-front');
    const difficultySelect = document.getElementById('difficulty');

    // Event listener for difficulty selection
    difficultySelect.addEventListener('change', () => {
        // Reload card texts based on the selected difficulty
        loadCardTexts();
    });

    // Event listener for card click
    cardElement.addEventListener('click', () => {
        // Toggle the 'is-flipped' class to flip the card back and forth
        cardElement.classList.toggle('is-flipped');

        // Load card texts when the card is clicked
        loadCardTexts();
    });

    // Function to load card texts based on the selected difficulty
    async function loadCardTexts() {
        try {
            const difficulty = difficultySelect.value;
            const response = await fetch(`cardTexts_${difficulty}.txt`);
            
            if (!response.ok) {
                throw new Error(`Failed to load cardTexts_${difficulty}.txt: ${response.status} ${response.statusText}`);
            }

            const cardTexts = await response.text();
            const cardTextsArray = cardTexts.split('\n').filter(Boolean);

            // Select a random text from the array
            const randomTextIndex = Math.floor(Math.random() * cardTextsArray.length);
            cardFrontElement.textContent = cardTextsArray[randomTextIndex];
        } catch (error) {
            console.error(error);
        }
    }

    // Initial load of card texts on page load
    loadCardTexts();
});
