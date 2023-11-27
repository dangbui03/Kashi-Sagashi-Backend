const bm25 = require('wink-bm25-text-search');
const winkNLP = require('wink-nlp');
const model = require('wink-eng-lite-web-model');
const nlp = winkNLP(model);
const its = nlp.its;

const Song2 = require("../../model/song2.js");

const prepTask = function (text) {
    const tokens = [];
    nlp.readDoc(text)
      .tokens()
      .filter((t) => t.out(its.type) === 'word' && !t.out(its.stopWordFlag))
      .each((t) => {
        const stemmedWord = t.out(its.stem);
        const isNegated = t.out(its.negationFlag);
        tokens.push(isNegated ? '!' + stemmedWord : stemmedWord);
      });
  
    return tokens;
  };

const loadAndSearchLyrics = async (req, res) =>  {
    try {
      const lyricQuery = req.body.lyrics;
      if (!lyricQuery) {
        return res.status(400).json({ error: 'Lyric in request body is required' });
      }
  
      const searchEngine = bm25();
  
      // Define configuration for the search
      searchEngine.defineConfig({ fldWeights: { lyrics: 1 } });
      searchEngine.definePrepTasks([prepTask]);
  
      // Fetch all songs from the MongoDB collection
      const songs = await Song2.find({}, 'Lyrics'); // Adjust fields as needed
  
      // Add songs' lyrics to the search engine index
      songs.forEach((song, index) => {
        searchEngine.addDoc(song.Lyrics, index);
      });
  
      // Consolidate after adding documents
      searchEngine.consolidate();
  
      // Perform a search query
      const results = searchEngine.search(lyricQuery);
  
      res.json({ results, songs }); // Adjust response as needed
    } catch (error) {
      console.error('Error occurred while searching:', error);
      res.status(500).json({ error: 'An error occurred while searching' });
    }
  };

const getAllSong = async (req, res) =>{
    const song = await Song2.find();
    if(!song){
        return res.status(204).json({ message: "Song not found."});
    }
    res.json(song);
}

const createSong = async (req, res) => {
    try {
        const { singers, Name, Link, Release_Date, Album, Lyrics} = req.body;
        const existedSong = await Song2.findOne({ Name });
        if (existedSong) return res.status(400).json({ message: "Already have this song in db"});

        const newAlbum = new Song2({
            Name: Name,
            Lyrics: Lyrics,
            Link: Link,
            Release_date: Release_Date,
            Album: Album,
            Artist: singers,
        });
        const savedAlbum = await newAlbum.save();
        if (savedAlbum) {
            return res.status(201).json(savedAlbum);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllSong,
    createSong,
    loadAndSearchLyrics
}