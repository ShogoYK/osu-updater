import fs from 'fs'
import ConfigValidator from '../utils/ConfigValidator.js';
import MenuController from './MenuController.js';

class InitializerController {

    configs = './config.json'

    initialize() {
        console.clear()
        const configValidate = ConfigValidator.validateDir(this.configs)
        if (configValidate == false) {
            this.config();
        }
        MenuController.index();
    }

    config() {
        const data = {
            "downloadDir": "",
            "osuDir": ""
        }
        fs.writeFileSync('./config.json', JSON.stringify(data), 'utf-8')
        return true
    }


}

export default new InitializerController()