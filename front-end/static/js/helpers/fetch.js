// ---------------- FETCH THE DATA ------------------------------------------------------------------------------------------------------------------------
export async function fetchData(url, callback) {
    try {
        const response = await fetch(url)
        if (response.status === 200) {
            const data = await response.json();
            callback(data)
        } else if (response.status === 404) {
            displayErrorMessage('Recept niet gevonden')
        } else if (response.status === 400) {
            displayErrorMessage('Gelieve een recept mee te geven!')
        } else if (response.status === 403) {
            displayErrorMessage('Je hebt geen toestemming om dit uit te voeren!')
        } else {
            throw new Error('Er ging iets mis met de API.')
        }
    } catch (error) {
        console.error(error.message);
    }
};

function displayErrorMessage(message) {
    const mainElement = document.getElementById('main');
    mainElement.textContent = message;
};