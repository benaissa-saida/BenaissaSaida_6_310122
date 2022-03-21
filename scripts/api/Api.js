class Api{
    /** //donne une précision sur la nature de l'url
     * @param {string} url
     */
    constructor(url){
        this._url = url
    }

    //fonction pour avoir tous les éléments du photographe
    async get(){
        return fetch(this._url)
        .then(res => res.json())
        .then(data => data.photographers)
        .catch(err => console.log('une erreur est apparue', err))
    }

    //fonction pour avoir tous les médias
    async getMedia(){
        return fetch(this._url)
        .then(res => res.json())
        .then(data => data.media)
        .catch(err => console.log('une erreur est apparue', err))
    }
    
}

//class qui va étendre les propriétés de la class Api
class PhotographerApi extends Api{
    /**
     * @param {string} url
     */
    constructor(url){
        super(url)
    }

    //fonction pour avoir les photographes
    async getPhotographers(){
        //avec la fonction contenue dans Api
        return await this.get()
    }
    
    //fonction pour avoir les médias
    async getMedias(){
        //avec la fonction contenue dans Api
        return await this.getMedia()
    }
}
