
const FetchSong = async (req, res) => {
    try {
        const allSongs = await Song.find({}).exec();

        if (!Array.isArray(allSongs)) {
            console.error('Error: Song data not returned as an array:', allSongs);
            return res.status(500).json({ error: 'Song data not returned as expected' });
          }

          for (const song of allSongs) {
            const duplicate = songDB.songzz.find(songkk => songkk.Name === song.Name);
            if (duplicate) continue;
            const preprocessedLyrics = song.Lyrics.replace(/[\n\r]/g, ' ').trim();
            const newsong = { "Name": song.Name, "Lyrics": preprocessedLyrics };
            songDB.setSongs([...songDB.songzz, newsong]);
      
            await fsPromises.writeFile(
              path.join(__dirname, '..', '..', 'model', 'song.json'),
              JSON.stringify(songDB.songzz)
            );
          }
        res.status(200).json({message: "success"});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}
