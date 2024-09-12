export const dogApiUrl = 'https://api.thedogapi.com/v1';
 
export const apiKey = 'live_0IZqf0z3Yfko7ulYIbXc90Zp3BH4uCKWbVhtQbDjhmSHEmivM47u3bZBXNlBAcjy';

// Function to fetch a random dog image using Dog API key
export async function fetchRandomDog() {
    try {
        const response = await fetch(`${dogApiUrl}/images/search`, {
            headers: {
                'x-api-key': apiKey 
            }
        });
        const data = await response.json();
        return data[0].url;
    } catch (error) {
        console.error('Error fetching random dog:', error);
        throw error;
    }
}

// Function to fetch all breeds
export async function fetchBreeds() {
    try {
        const response = await fetch(`${dogApiUrl}/breeds`, {
            headers: {
                'x-api-key': apiKey 
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching breeds:', error);
        throw error;
    }
}

// Function to fetch breed-specific dog images (limit to 4 images)
export async function fetchBreedDog(breedId, limit = 5) {
    try {
        const response = await fetch(`${dogApiUrl}/images/search?breed_ids=${breedId}&limit=${limit}`, {
            headers: {
                'x-api-key': apiKey 
            }
        });
        const data = await response.json();
        return data.map(item => item.url);
    } catch (error) {
        console.error(`Error fetching dog images for breed ${breedId}:`, error);
        throw error;
    }
}

// Function to delete a favorite dog from the API
export async function deleteFavoriteDog(favoriteId) {
    try {
        const response = await fetch(`${dogApiUrl}/favourites/${favoriteId}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete favorite dog');
        }

        alert('Dog removed from favorites successfully!');

    } catch (error) {
        console.error('Error deleting favorite dog:', error);
    }
}
