const Song = require("../../model/song.js");

const songDB = {
    songzz: require('../../model/song.json'),
    setSongs: function (data) { this.songzz = data }
  }
const path = require('path')
const fsPromises = require('fs').promises;

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
        console.error('Error occurred:', error);
    }
}

const getAllSong = async (req, res) =>{
    try {
        const song = await Song.find({}).exec();
        if(!song){
            return res.status(400).json({ message: "Song not found."});
        }
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

const userCreateSong = async (req, res) => {
    try {
        const { Artist, Name, Link, Release_date, Album, Lyrics, Submit_by} = req.body;
        const existedSong = await Song.findOne({ Name });
        if (existedSong) return res.status(400).json({ message: "Already have this song in db"});

        const newSong = new Song({
            Name: Name,
            Lyrics: Lyrics,
            Link: Link,
            Release_date: Release_date,
            Album: Album,
            Artist: Artist,
            Submit_by: Submit_by
        });
        const savedSong = await newSong.save();
        if (savedSong) {
            return res.status(201).json(savedSong);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const adminCreateSong = async (req, res) => {
    try {
        const songsToAdd = Array.isArray(req.body) ? req.body : [req.body];

        const insertedSongs = [];

        for (const songData of songsToAdd) {
            const {  Artist, Name, Link, Release_date, Album, Lyrics } = songData;
            const existedSong = await Song.findOne({ Name });

            if (existedSong) {
                // Bài hát đã tồn tại, bỏ qua và tiếp tục với bài hát tiếp theo
                continue;
            }

            const newSong = new Song({
                Name: Name,
                Lyrics: Lyrics,
                Link: Link,
                Release_date: Release_date,
                Album: Album,
                Artist: Artist,
                Verified: true,
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

const findUnverified = async(req, res) => {
    try {
        const unverifiedSong = await Song.find({ Verified: false }).exec();
        if(unverifiedSong == []) return res.status(400).json({ message: "All song verified" });

        res.status(200).json(unverifiedSong);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const verifiedSong = async(req, res) => {
    try {
        const { Name } = req.body;
        const unverifiedSong = await Song.findOne({ Name: Name }).exec();
        if(!unverifiedSong) return res.status(400).json({ message: "All song verified"});

        unverifiedSong.Verified = true;
        console.log(unverifiedSong)
        const result = await unverifiedSong.save();
        res.status(400).json({ message: "Success", result });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllSong,
    userCreateSong,
    FetchSong,
    adminCreateSong,
    findUnverified,
    verifiedSong
}