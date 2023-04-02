const {parse}=require('csv-parse');
const fs=require('fs');

const habitablePlanets=[];


function isHabitable(planet) {
    return planet['koi_disposition']==='CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol']<1.11
    && planet['koi_prad'] < 1.6
}

fs.createReadStream('kernel_data.csv')
.pipe(parse({columns:true,comment:'#'}))
.on('data',chunk=>{
    if(isHabitable(chunk)) {
        habitablePlanets.push(chunk);
    }
    
})
.on('error',err=>{
    console.log(err);
})
.on('end',()=>{
    console.log(habitablePlanets.map(planet=>planet['kepler_name']));
    console.log('Done!');
})


