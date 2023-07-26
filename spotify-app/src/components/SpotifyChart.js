import "../css/spotifychart.css"

const SpotifyChart = (props) => {
    return(
        <div className = "artist-table">
            {props.artists.slice(0,10).map((artist, key) => {
                return(
                    <div className = "artist" key = {key}>
                        <img alt ="music" className = "artist-image" src = {artist.images[0].url}/>
                        <div className = "artist-name">
                            {artist.name}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default SpotifyChart;