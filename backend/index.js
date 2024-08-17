import express from 'express';

const app = express();



app.get('/api/places', (req,res) => {

    console.log('Route hit');//to check if its working or not

    const places = [
        {
            id: 1,
            name: "Andaman & Nicobar Islands",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1641918575292-fa18603e7112?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            name: "Seychelles",
            rating: 4.2,
            image: "https://images.unsplash.com/photo-1617472891000-79c9316fdde3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 3,
            name: "Kedarnath",
            rating: 5,
            image: "https://images.unsplash.com/photo-1606722581293-628fa217a6f7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 4,
            name: "Bali",
            rating: 5,
            image: "https://images.unsplash.com/photo-1590889008033-f4126f66294f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 5,
            name: "Rishikesh",
            rating: 4.69,
            image: "https://images.unsplash.com/photo-1712510817140-917938f92e5b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 6,
            name: "Great Barrier Reef",
            rating: 4.3,
            image: "https://images.unsplash.com/photo-1580696499419-84ca9688f947?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 7,
            name: "Manali",
            rating: 4.25,
            image: "https://images.unsplash.com/photo-1656437717503-971f67b6af21?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        }
    ];

    if(req.query.search){

        console.log("Search query:",req.query.search);//to see what you have searched

        const searchQuery = req.query.search.toLowerCase();
        const filterPlaces = places.filter(place => place.name.toLowerCase().includes(searchQuery));
        res.send(filterPlaces);
        return; //if you don't use return here, system will crash
    }

    setTimeout(()=>{
        res.send(places);
    },3000); //the data will take 3sec to load

});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});