
const BASE_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2409-FTB-ET-WEB-FT/players`;

 const fetchPlayers = async() => {
    try {
        const response = await fetch(BASE_URL);
        const result = await response.json();
        if (result.success) {
            displayRoster(result.data.players);
        } else {
            console.error('Error fetching players:', result.error.message);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

const displayRoster = (players) => {
    const rosterContainer = document.querySelector('roster');
    rosterContainer.innerHTML = ''; 
    
    players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.classList.add('player-card');
        
        playerCard.innerHTML = `
            <img src="${player.imageUrl}" alt="${player.name}" />
            <h3>${player.name}</h3>
            <p>Breed: ${player.breed}</p>
            <p>Status: ${player.status}</p>
            <button onclick="viewPlayerDetails(${player.id})">View Details</button>
        `;
        
        rosterContainer.append(playerCard);
    });
}

 const viewPlayerDetails =  async(playerId) => {
    try {
        const response = await fetch(`${BASE_URL}/${playerId}`);
        const result = await response.json();
        if (result.success) {
            displayPlayerDetails(result.data.player);
        } else {
            console.error('Error fetching player details:', result.error.message);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

const displayPlayerDetails = (player) => {
    const detailsContainer = document.querySelector('player-details');
    detailsContainer.innerHTML = `
        <img src="${player.imageUrl}" alt="${player.name}" />
        <h2>${player.name}</h2>
        <p>Breed: ${player.breed}</p>
        <p>Status: ${player.status}</p>
        <p>Team ID: ${player.teamId}</p>
        <p>Joined: ${new Date(player.createdAt).toLocaleDateString()}</p>
        <p>Last Updated: ${new Date(player.updatedAt).toLocaleDateString()}</p>
    `;
}

window.onload = () => {
    fetchPlayers();
};
