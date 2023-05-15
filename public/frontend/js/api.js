class BookApi{

    async api(){
        try {
            const value = await axios.get('https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=29lQ4dwCehTz8q61Y7jNtx71Cgq6YSun');
            return value.data.results.lists;
        } catch (error) {
            
        }
    }
}


