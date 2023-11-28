const Song2 = require("../../model/song2.js");
const songDB = {
    songzz: require('../../model/song.json'),
    setSongs: function (data) { this.songzz = data }
  }
const path = require('path')
const fsPromises = require('fs').promises;

const FetchSong = async (req, res) => {
    try {
        const allSongs = await Song2.find({}).exec();

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
        console.error('Error occurred:', error);
    }
}

const getAllSong = async (req, res) =>{
    const song = await Song2.find({}).exec();
    if(!song){
        return res.status(204).json({ message: "Song not found."});
    }
    res.json(song);
}

const createSong = async (req, res) => {
    try {
        const { Artist, Name, Link, Release_date, Album, Lyrics} = req.body;
        const existedSong = await Song2.findOne({ Name });
        if (existedSong) return res.status(400).json({ message: "Already have this song in db"});

        const newAlbum = new Song2({
            Name: Name,
            Lyrics: Lyrics,
            Link: Link,
            Release_date: Release_date,
            Album: Album,
            Artist: Artist,
        });
        const savedAlbum = await newAlbum.save();
        if (savedAlbum) {
            return res.status(201).json(savedAlbum);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createManySong = async (req, res) => {
    try {
        const songsToAdd = Array.isArray(req.body) ? req.body : [req.body];

        const insertedSongs = [];

        for (const songData of songsToAdd) {
            const {  Artist, Name, Link, Release_date, Album, Lyrics } = songData;
            const existedSong = await Song2.findOne({ Name });

            if (existedSong) {
                // Bài hát đã tồn tại, bỏ qua và tiếp tục với bài hát tiếp theo
                continue;
            }

            const newSong = new Song2({
                Name: Name,
                Lyrics: Lyrics,
                Link: Link,
                Release_date: Release_date,
                Album: Album,
                Artist: Artist,
            });

            const savedSong = await newSong.save();

            if (savedSong) {
                insertedSongs.push(savedSong);
            }
        }

        if (insertedSongs.length > 0) {
            return res.status(201).json(insertedSongs);
        } else {
            return res.status(400).json({ message: "All songs already exist in the database" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllSong,
    createSong,
    FetchSong,
    createManySong
}