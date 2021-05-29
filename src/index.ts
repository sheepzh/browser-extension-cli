import inquirer from "inquirer"
import getMessage, { Message } from "./i18n"
import Color from 'colors/safe'
import validateName from 'validate-npm-package-name'
import generateTemplate from './template'
import * as path from 'path'
import * as fs from 'fs'
const { version, repository } = require('../package.json')

const repositoryUrl: string = repository.url || 'git+'

const message: Message = getMessage()

export type CliConfig = {
    name: string
    rootPath: string
    popup: boolean
    click2OpenNewTab: boolean
    newTab: boolean
    vue: number
    license: 'ISC' | 'MIT'
}

// Default is the simplest
const config: CliConfig = {
    name: '',
    rootPath: '',
    popup: false,
    click2OpenNewTab: false,
    newTab: false,
    vue: 0,
    license: 'ISC'
}

// Process project-name
const argv = process.argv
if (argv.length < 3) {
    console.log(message.error.projectName)
    console.log('    ' + Color.blue('b6e8 ') + Color.green('<project-name>'))
    console.log(message.error.forExample)
    console.log('    ' + Color.blue('b6e8 ') + Color.green('my-ext-demo'))
    process.exit()
} else {
    const projectName = argv[2]
    const result = validateName(projectName)
    if (!result.validForNewPackages) {
        console.log(message.error.invalidName + Color.red((result.errors || []).join(',')))
        process.exit()
    }
    const rootPath = path.join(process.cwd(), projectName)
    if (fs.existsSync(rootPath)) {
        console.log(message.error.existDir + Color.red(projectName))
        process.exit()
    }
    config.name = projectName
    config.rootPath = rootPath
}

// Clear the console
console.clear()

// Show banner
const repeat = (ch: string, count: number) => Array.from(Array(count).keys()).map(() => ch).join('')
const startAndEndBox = Color.green('│')
const center = (text: string, lineLength: number, trans?: (origin: string) => string) => {
    const leftMargin = Math.round((lineLength - text.length) / 2)
    const rightMargin = lineLength - text.length - leftMargin
    console.log(startAndEndBox + repeat(' ', leftMargin) + (trans ? trans(text) : text) + repeat(' ', rightMargin) + startAndEndBox)
}
const width = 70
console.log(Color.green('┌' + repeat('─', width) + '┐'))
center('', width)
center(`Welcome to use B6E8 CLI - v${version}`, width, Color.yellow)
center(repositoryUrl.substr(4), width)
center('', width)
console.log(Color.green('└' + repeat('─', width) + '┘'))
console.log()

// Set the configuration
inquirer.prompt({
    type: 'list',
    name: 'template',
    message: message.questions.customize,
    default: message.answers.maxTemplate,
    choices: [
        message.answers.maxTemplate,
        message.answers.minTemplate,
        message.answers.yes,
    ]
}).then(answer => {
    const answerVal = answer.template
    if (answerVal === message.answers.yes) {
        return Promise.resolve()
    } else {
        if (answerVal === message.answers.maxTemplate) {
            config.popup = true
            config.newTab = true
            config.vue = 3
        }
        return Promise.reject()
    }
}).then(() => inquirer.prompt({
    type: 'list',
    name: 'popup',
    message: message.questions.popup,
    choices: [
        message.answers.yes,
        message.answers.no
    ]
})).then(async answer => {
    const val = answer.popup
    config.popup = val === message.answers.yes
    if (!config.popup) {
        // Ask whether to popup one new page while click icon
        const answer1 = await inquirer.prompt({
            type: 'list',
            name: 'icon2NewTab',
            message: message.questions.click2NewTab,
            choices: [
                message.answers.yes,
                message.answers.no
            ]
        })
        config.click2OpenNewTab = answer1.icon2NewTab === message.answers.yes
        return await Promise.resolve()
    } else {
        return Promise.resolve()
    }
}).then(() => inquirer.prompt({
    type: 'list',
    name: 'newTab',
    message: message.questions.newTab,
    choices: [
        message.answers.yes,
        message.answers.no
    ]
})).then(async answer => {
    config.newTab = answer.newTab === message.answers.yes
    if (config.newTab || config.popup || config.click2OpenNewTab) {
        const answer1 = await inquirer.prompt({
            type: 'list',
            name: 'vue',
            message: message.questions.vue,
            choices: ['Vue3', 'Vue2', message.answers.no]
        })
        switch (answer1.vue) {
            case 'Vue3':
                config.vue = 3
                break
            case 'Vue2':
                config.vue = 2
                break
            default:
                config.vue = 0
        }
        return await Promise.reject()
    }
    return Promise.reject()
}).catch(() => {
    // console.debug(config)
    // Generate project
    generateTemplate(config)
})
