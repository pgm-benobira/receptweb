// ---------------- FETCH THE DATA ------------------------------------------------------------------------------------------------------------------------
export async function fetchData(url, callback) {
    try {
        const response = await fetch(url);
        switchResponseStatus(response, callback);
    } catch (error) {
        console.error(error.message);
    }
};

// ---------------- DISPLAY ERROR MESSAGE -----------------------------------------------------------------------------------------------------------------
export function displayErrorMessage(message) {
    const mainElement = document.getElementById('main');
    mainElement.textContent = message;
};

// ---------------- SWITCH STATEMENT ----------------------------------------------------------------------------------------------------------------------
export async function switchResponseStatus(response, callback) {
    switch (response.status) {
        case 200:
            const data = await response.json();
            callback(data)
            break;
        case 404:
            displayErrorMessage('Recept niet gevonden');
            break;
        case 400:
            displayErrorMessage('Gelieve een recept mee te geven!');
            break;
        case 403:
            displayErrorMessage('Je hebt geen toestemming om dit uit te voeren!');
            break;
        default:
            throw new Error('Er ging iets mis met de API.')
    };
};