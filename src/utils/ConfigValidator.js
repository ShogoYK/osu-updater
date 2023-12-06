import fs from 'fs'

class ConfigValidator{

    validateDir(data){
        if(fs.existsSync(data)){
            return true
        }
        return false
    }

}

export default new ConfigValidator()