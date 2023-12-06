import fs from 'fs'
import path from 'path'
import DownloadDirController from './DownloadDirController.js'
import OsuDirController from './OsuDirController.js'

const downloadDir = DownloadDirController.getDownloadDir().downloadDir
const osuDir = OsuDirController.getOsuDir().osuDir

class UpdaterController {
    findFiles() {
        let files = [];
        fs.readdirSync(downloadDir).forEach(file => {
            const fileExtention = path.extname(file)
            
            if (fileExtention == '.osz') {
                console.log(file);
                files.push(file);
            }
        })
        let message = '\nFound (' + files.length + ') downloaded beatmaps\n\n'
        console.log(message);

        return files;

    }

    updateBeatmaps() {
        try {
            let files = this.findFiles()
            files.forEach(file => {
                const currentDir = path.join(downloadDir, file)
                const newDir = path.join(osuDir, file)

                fs.renameSync(currentDir, newDir)
                console.log(`Moving ${file}: ${downloadDir} -> ${osuDir}`);
            });

            // OsuDirController.selectDirectory()

            
            console.log('\n✨Updataded Successfully!!✅');
        } catch (err) {
            console.error('🚨Error trying to move the beatmap files: ', err);
        }

    }

}


export default new UpdaterController()