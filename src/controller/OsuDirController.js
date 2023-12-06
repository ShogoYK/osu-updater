import readline from 'readline'
import fs from 'fs'
import MenuController from './MenuController.js'


class OsuDirController {
    
    configPath = 'config.json'

    getOsuDir(){
        try {
            const data = fs.readFileSync(this.configPath, 'utf-8')
            return JSON.parse(data)
        } catch (err) {
            console.error('🚨Error trying to read JOSN file: ', err);
            return {}
        }
    }

    async setOsuDir(){
        const newPath = await this.askNewPath()
        let dirConfig = this.getOsuDir();
        dirConfig.osuDir = newPath;
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(dirConfig, null, 4), 'utf-8')
            MenuController.index()
        } catch (err) {
            console.error('🚨Error while updating the configs: ', err);
        }
    }

    async askNewPath() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        return new Promise((resolve, reject) => [
            rl.question('Insert the path to your osu! songs folder: ', (newPath) => {
                resolve(newPath)
                rl.close()
            })
        ])
    }
    
}


export default new OsuDirController()