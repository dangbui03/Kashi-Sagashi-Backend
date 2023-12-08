const Song = require("../../model/song.js");
const SongJsonPath = 'Full_song.json'

const songDB = {
    songzz: require('../../model/song.json'),
    setSongs: function (data) { this.songzz = data }
  }
const path = require('path')
const fsPromises = require('fs').promises;

const FetchSong = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', '..', 'model', 'song.json');
        // await fsPromises.writeFile(filePath, '[]');
        // Retrieve all songs from the database in batches to avoid loading all at once
        const batchSize = 100; // Adjust this batch size based on your requirements
        let skip = 0;
        let hasMore = true;

        while (hasMore) {
            const songsBatch = await Song.find({ Verified: true }).skip(skip).limit(batchSize).exec();

            if (songsBatch.length === 0) {
                hasMore = false;
            } else {
                for (const song of songsBatch) {
                    const duplicate = songDB.songzz.find(songkk => songkk.Name === song.Name);
                    if (duplicate) continue;

                    const preprocessedLyrics = song.Lyrics.replace(/[\n\r]/g, ' ').trim();
                    const newSong = { "Name": song.Name, "Lyrics": preprocessedLyrics };
                    songDB.setSongs([...songDB.songzz, newSong]);
                }

                skip += batchSize;
            }
        }

        await fsPromises.writeFile(
            filePath,
            JSON.stringify(songDB.songzz)
        );

        res.status(200).json({ message: "success" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

const getAllSong = async (req, res) =>{
    try {
        const song = await Song.find({ Verified: true }).exec();
        if(!song){
            return res.status(400).json({ message: "Song not found."});
        }
        res.status(200).json(song);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

const songFromJSONtoMongo = async (req, res) => {
    try {
        const data = await fsPromises.readFile(SongJsonPath, 'utf-8');
        if(!data) {
            console.error('Error reading file: nodata');
            return res.status(400).json({ message: 'No data found in the file' });
        } 
        const jsonData = JSON.parse(data);
        const insertedSongs = [];
        for (const song of jsonData) {
            const {  Artist, Name, Link, Release_date, Album, Lyrics } = song;
            const existedSong = await Song.findOne({ Name });

            if (existedSong) {
                // If song existed, continue without save that song
                continue;
            }
            // Save song into DB
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
            return res.status(201).json({ message: "Success input", insertedSongs});
        } else {
            return res.status(400).json({ message: "All songs already exist in the database" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

const userCreateSong = async (req, res) => {
    try {
        const { Artist, Name, Link, Release_date, Album, Lyrics, Submit_by } = req.body;
        
        if(!(Artist && Name && Link && Release_date && Album && Lyrics && Submit_by)) {
            return res.status(404).json({ error: "Missing some element" })
        }

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
            return res.status(201).json({ savedSong });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

const adminCreateSong = async (req, res) => {
    try {
        const songsToAdd = Array.isArray(req.body) ? req.body : [req.body];

        const insertedSongs = [];

        for (const songData of songsToAdd) {
            const {  Artist, Name, Link, Release_date, Album, Lyrics } = songData;

            if(!(Artist && Name && Link && Release_date && Album && Lyrics)) {
                return res.status(404).json({ error: "Missing some element" })
            }

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
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

const findUnverified = async(req, res) => {
    try {
        const unverifiedSong = await Song.find({ Verified: false }).exec();
        if(unverifiedSong == []) return res.status(400).json({ message: "All song verified" });

        res.status(200).json(unverifiedSong);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

const verifiedSong = async(req, res) => {
    try {
        const { Name } = req.body;
        if (!Name) return res.status(404).json({ error: "Missing song name"});

        const unverifiedSong = await Song.findOne({ Name: Name }).exec();
        if(!unverifiedSong) return res.status(400).json({ message: "All song verified"});

        unverifiedSong.Verified = true;
        const result = await unverifiedSong.save();
        await FetchSong(); 
        res.status(200).json({ message: "Success", result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

const deleteSong = async (req, res) => {
    try {
        const { Name } = req.body;
        if (!Name) return res.status(404).json({ error: "Missing song name"});

        const deleteSong = await Song.findOne({ Name: Name }).exec();
        if (!deleteSong){
            return res.status(400).json({ message:"Song not found" });
        }
        
        const name = deleteSong.Name;
        await Song.deleteOne({ Name: Name });
        res.status(200).json({ message: `Song ${name} has been deleted`});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllSong,
    userCreateSong,
    FetchSong,
    adminCreateSong,
    findUnverified,
    verifiedSong,
    songFromJSONtoMongo,
    deleteSong
}