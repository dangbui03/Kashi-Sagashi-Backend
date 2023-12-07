const bm25 = require('wink-bm25-text-search');
const engine = bm25();
const winkNLP = require( 'wink-nlp' );
const model = require( 'wink-eng-lite-web-model' );
const nlp = winkNLP( model );
const its = nlp.its;

const Song = require('../../model/song')
//const songsData = require('../../model/song.json');

const prepTask = function ( text ) {
  const tokens = [];
  nlp.readDoc(text)
      .tokens()
      // Use only words ignoring punctuations etc and from them remove stop words
      .filter( (t) => ( t.out(its.type) === 'word' && !t.out(its.stopWordFlag) ) )
      // Handle negation and extract stem of the word
      .each( (t) => tokens.push( (t.out(its.negationFlag)) ? '!' + t.out(its.stem) : t.out(its.stem) ) );

  return tokens;
};

const loadAndSearchLyrics = async (req, res) =>  {
    try {
      songsData = await Song.find({ Verified: true }, {Name: 1, Lyrics: 1}).exec();

      const inputLyrics = req.query.lyrics;
      console.log(inputLyrics);

      if (!inputLyrics) {
        return res.status(400).json({ error: 'No lyrics provided in the request body.' });
      }   

      engine.defineConfig({ fldWeights: { Name: 1, Lyrics: 2 } });
      engine.definePrepTasks([prepTask]);

      //console.log(songsData)
      songsData.forEach( async function (songz, i) {
        engine.addDoc( songz, i)
      })

      // Consolidate before searching
      engine.consolidate();

      const results = engine.search(inputLyrics);

      const songArr = [];
      let shouldBreak = false;
      
      for (const result of results) {
        if (shouldBreak) {
            break; // Exit the for...of loop
        }
    
        const index = parseInt(result[0]);
        if (isNaN(index)) {
            shouldBreak = true;
            break; // Exit loop if index is NaN
        }
    
        const song = await Song.findOne({ Name: songsData[index].Name }, {Name: 1, Lyrics: 1, Link: 1, Artist: 1, Album: 1}).exec(); // Assuming songsData contains song names
    
        if (song) {
            songArr.push(song);
        } else {
            // Handle if song is not found
            console.log(`Song not found for index: ${index}`);
        }
      }
      engine.reset()
      console.log(results)
      res.status(200).json({ songArr });
    } catch (error) {
      console.error('Error occurred while searching:', error);
      res.status(500).json({ error: 'An error occurred while searching' });
    }
  };


module.exports = {
    loadAndSearchLyrics
}