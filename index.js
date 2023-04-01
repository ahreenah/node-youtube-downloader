const fs = require('fs');
const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ytsr = require('ytsr')
const prompts = require('prompts');

const { intro, outro, text, prompt, log } = require ('@clack/prompts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'query',
      message: `What's your prompt?`
    },
  ]);

  // => { twitter: 'terkelg', color: [ '#ff0000', '#0000ff' ] }
  
  //text({message:'What is your prompt? '}).then( (name) => {
  let searchRes = await ytsr(response.query);//.then(res=>{
      console.log('result');
const pickedOnes = await prompts([
    {
      type: 'multiselect',
      name: 'data',
      message: 'Choose videos',
      choices:searchRes.items.map( (i,num)=>  ({ title: i.title, value: i })    )
    }] );
  //  console.log(pickedOnes);
for (const item of pickedOnes.data){
	console.log('Downloading ',item.title);	
	const track = item;//res.items[num];
	const p = new Promise((resolve)=>{
	let stream = ytdl(track.id, {
	  quality: 'highestaudio',
	});
	stream.on('info',(data,format)=>{
//		console.log('straemdata:',format)
		

	let start = Date.now();
	ffmpeg(stream)
	  .audioBitrate(128)
	  .save(`${__dirname}/${track.title}.mp3`)
	  .on('progress', p => {
	    readline.cursorTo(process.stdout, 0);
	    process.stdout.write(`${p.targetSize}kb downloaded`);
	  })
	  .on('end', () => {
	    console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
	    resolve();
	  });
  })
  })
  await p;
  
};


	//readline().then(name=>{
		
	/*
	let id = '7wNb0pHyGuI';

	let stream = ytdl(id, {
	  quality: 'highestaudio',
	});

	let start = Date.now();
	ffmpeg(stream)
	  .audioBitrate(128)
	  .save(`${__dirname}/${id}.mp3`)
	  .on('progress', p => {
	    readline.cursorTo(process.stdout, 0);
	    process.stdout.write(`${p.targetSize}kb downloaded`);
	  })
	  .on('end', () => {
	    console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
	  });
	*/
})();


