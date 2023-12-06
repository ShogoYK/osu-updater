import inquirer from "inquirer";
import DownloadDirController from "./DownloadDirController.js";
import UpdaterController from "./UpdaterController.js";
import OsuDirController from "./OsuDirController.js";
import fs from 'fs'
import ConfigValidator from "../utils/ConfigValidator.js";

const configs = './config.json'

class MenuController {

    index(){

        const data = JSON.parse(fs.readFileSync(configs, 'utf-8'))
        const osuDirConfig = data.osuDir;
        const downloadDirConfig = data.downloadDir;

        const osuDirValidator = ConfigValidator.validateDir(osuDirConfig);
        const downlaodValidator = ConfigValidator.validateDir(downloadDirConfig);

        if(osuDirValidator == false || osuDirConfig == ""){
            console.log('Configure your osu folder (Insert a valid path)');
            OsuDirController.setOsuDir();
        }
        else if(downlaodValidator == false || downloadDirConfig == ""){
            console.log('Configure your new beatmaps folder (Insert a valid path)');
            DownloadDirController.setDownloadDir()
        }
        else{
            this.initialMenu()
        }
        
    }

    initialMenu() {
        // console.clear() 
        console.log('%cWelcome to the beatmap updater By: %c@ShogoYK!', 'color: #4778ff;', 'color: #47ffe0');
        inquirer.prompt([
            {
                type: 'list',
                prefix: '',
                name: 'Options',
                message: 'Osu Beatmap Scanner By: @ShogoYK (https://github.com/ShogoYK)',
                choices: [
                    'Update Beatmaps',
                    'Configurations',
                    'Exit'
                ]
            }
        ]).then((selected) => {
            switch (selected.Options) {
                case 'Update Beatmaps':
                    console.clear()
                    console.log('\nScanning ', DownloadDirController.getDownloadDir().downloadDir);
                    console.log('Searching for new beatmaps...\n\n');
                    UpdaterController.updateBeatmaps()
                    this.initialMenu()
                    break;
                case 'Configurations':
                    console.clear()
                    this.configMenu();
                    break;
                case 'Exit':
                    console.clear()
                    // this.confirmationMenu()
                    break;
                default:
                    console.clear()
                    console.log('Choose a valid option');
                    break;
            }
        })

    }

    configMenu() {
        inquirer.prompt([
            {
                type: 'list',
                prefix: '',
                name: 'Configurations',
                message: 'Configure your updater',
                choices: [
                    {
                        name: 'Change the folder to be scanned',
                        value: 1,
                    },
                    {
                        name: 'Change the osu! beatmaps folder',
                        value: 2,
                    },
                    {
                        name: 'Back',
                        value: 0
                    }
                ]
            }
        ]).then((selected) => {
            let message = '';
            let choices = [
                {
                    name: 'Yes, I want to change the directory',
                    value: 1,
                },
                {
                    name: 'Nah, keep it as it is',
                    value: 2,
                }
            ];

            switch (selected.Configurations) {
                // Change download Folder
                case 1:
                    console.clear();
                    message = `>🚨 Your current directory is: ${DownloadDirController.getDownloadDir().downloadDir}`

                    this.confirmationSelectMenu(message, choices, (selected) => {
                        switch (selected) {
                            case 1:
                                console.clear()
                                DownloadDirController.setDownloadDir()
                                break;
                            case 2:
                                console.clear()
                                this.initialMenu()
                                break;
                        }
                    })
                    break;

                // Change Osu folder
                case 2:
                    console.clear()
                    message = `>🚨 Your current directory is: ${OsuDirController.getOsuDir().osuDir}`

                    this.confirmationSelectMenu(message, choices, (selected) => {
                        switch (selected) {
                            case 1:
                                console.clear()
                                OsuDirController.setOsuDir()
                                break;
                            case 2:
                                console.clear()
                                this.initialMenu()
                                break;
                        }
                    })
                    break;

                // Exit
                case 0:
                    console.clear()
                    this.initialMenu();
                    break;

                // Weird option
                default:
                    console.clear()
                    console.log('Somehow you managed to choose something invalid...');
                    this.initialMenu();
                    break;
            }
        })
    }

    confirmationMenu() {
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'Confirmation',
                message: 'Are you sure you want to do this?',
                prefix: '❗',
                suffix: '❗',
            }
        ])
    }

    confirmationSelectMenu(message, choices, callback) {
        inquirer.prompt(
            [
                {
                    type: 'list',
                    name: 'ConfirmationSelect',
                    prefix: '🚨',
                    message: message,
                    suffix: '🚨',
                    choices: choices

                }
            ]
        ).then(selected => {
            callback(selected.ConfirmationSelect)
        })
    }

}

export default new MenuController()