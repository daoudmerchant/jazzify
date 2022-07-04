const getBio = async (name: string) => {
    const uri = 'https://en.wikipedia.org/w/api.php?' +
        'format=json' +
        '&action=query' +
        '&prop=extracts' +
        '&exintro&explaintext' +
        '&redirects=1' +
        '&origin=*' +
        `&titles=${encodeURIComponent(name)}`;
    const response = await fetch(uri);
    const data = await response.json();
    const [ pageId ] = Object.keys(data.query.pages);
    const artistData = data.query.pages[pageId];
    return {
        bio: artistData.extract
    }
}

export default { getBio }