class Api{
    /**
     * @param {string} url
     */
    constructor(url){
        this._url = url
    }

    async get(){
        return fetch(this._url)
        .then(res => res.json())
        .then(data => data.photographers)
        .catch(err => console.log('une erreur est apparue', err))
    }

    async getMedia(){
        return fetch(this._url)
        .then(res => res.json())
        .then(data => data.media)
        .catch(err => console.log('une erreur est apparue', err))
    }
    
}

class PhotographerApi extends Api{
    /**
     * @param {string} url
     */
    constructor(url){
        super(url)
    }

    async getPhotographers(){
        return await this.get()
    }
    
    async getMedias(){
        return await this.getMedia()
    }
}
