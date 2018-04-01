import RNFS from 'react-native-fs';


class Storage {
  constructor() {
    this.memoPath = RNFS.DocumentDirectoryPath + '/memo.json'
    this.json = null
  }
  async load(opt) {
    if (this.json) {
      return this.json[opt.key]
    } else {
      try {
        let json = await RNFS.readFile(RNFS.DocumentDirectoryPath + '/memo.json')
        if(typeof json === 'string'){
          json = JSON.parse(json)
        }
        this.json = json
        console.log(json)
        return json[opt.key]
      } catch (e) {
        console.log('open err', e)
        let obj = {}
        obj[opt.key] = []
        this.json = obj
        try{
          await this.save(Object.assign(opt, {
            data: []
          }))
        }catch(err){
          console.log('write err', err)
        }
        
        return []
      }
    }
  }
  save(opt) {
    this.json[opt.key] = opt.data
    return RNFS.writeFile(this.memoPath, JSON.stringify(this.json), 'utf8')
  }
}

global.storage = new Storage()