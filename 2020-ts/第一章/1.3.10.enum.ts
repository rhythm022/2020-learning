enum Genre{
    Rock,
    CountryAndWestern,
    Classical,
    Pop,
    HeavyMetal
}

class MusicCollection{
    private readonly collection:Map<Genre,string[]>

    constructor() {
        this.collection = new Map()
    }

    public Add(genre:Genre,artist:string[]):void{
        this.collection.set(genre,artist)
    }
    public Get(genre:Genre):string[] | undefined{
        return this.collection.get(genre)
    }
}


const musicCollection= new MusicCollection()
musicCollection.Add(Genre.Classical,['Sample'])


console.log(
    Genre,
    musicCollection.Get(Genre.Classical)
)




























