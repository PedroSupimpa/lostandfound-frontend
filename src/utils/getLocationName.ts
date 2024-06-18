async function getLocationName(lat:number, lng:number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK') {
        return data.results[0].formatted_address;
    } else {
        return null;
    }
}

export default getLocationName;