import { useState } from "react";
import axios from "axios"; //import axios
// create.js

const Create = () => {
    //set attributes with useState
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [poster, setPoster] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`Title: ${title}, Year: ${year}, Poster: ${poster}`);

        const movie = {
            title: title,
            year: year,
            poster: poster
        };
        /*
            Add a POST method to the Express server that logs 
            the title, year, and poster URL of the movie object
            passed from the React app.
        */
        axios.post('http://localhost:4000/api/movies', movie)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.data));
    };

    return (
        <div>
            <h3>Hello from create component!</h3>
            {/* form element to receive input from user */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Movie Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Movie Year: </label>
                    <input type="text"
                        className="form-control"
                        value={year}
                        onChange={(e) => { setYear(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Movie Poster: </label>
                    <input type="text"
                        className="form-control"
                        value={poster}
                        onChange={(e) => { setPoster(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit" value="Add Movie"></input>
                </div>
            </form>
        </div>
    );
}
export default Create;