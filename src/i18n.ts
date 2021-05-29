import OsLocale from 'os-locale'

type Locale = 'en' | 'zh'

export type Message = {
    questions: {
        customize: string
        popup: string
        newTab: string
        click2NewTab: string
        vue: string
    }
    answers: {
        yes: string
        no: string
        maxTemplate: string
        minTemplate: string
    }
    error: {
        projectName: string
        forExample: string
        invalidName: string
        existDir: string
    }
}

const en: Message = {
    questions: {
        customize: 'Do you want to customize the project to generate?',
        popup: 'Do you want to use the popup page?',
        click2NewTab: 'Then do you want to open one new page when click the icon?',
        newTab: 'Need you override the new tab page of browser?',
        vue: "Do you want to use vue to build page?"
    },
    answers: {
        yes: 'Yes',
        no: 'No',
        maxTemplate: 'No, use the most complete, recommended',
        minTemplate: 'No, use the simplest'
    },
    error: {
        projectName: 'Please specify the project name:',
        forExample: 'For example:',
        invalidName: 'The project name is invalid: ',
        existDir: 'The directory already exists: '
    }
}

const zh: Message = {
    questions: {
        customize: '你想自定义生成的项目内容吗？',
        popup: '你需要使用 ICON 的弹出页吗？',
        click2NewTab: '那点击 ICON 后你需要打开一个新的页面吗？',
        newTab: '你需要重写浏览器的新标签页吗？',
        vue: "你想用 Vue 搭建页面吗？"
    },
    answers: {
        yes: '是的',
        no: '不用',
        maxTemplate: '不用，生成完整模板（推荐）',
        minTemplate: '不用，生成最简模板'
    },
    error: {
        projectName: '请指定项目名：',
        forExample: '比如：',
        invalidName: '项目名不合法：',
        existDir: '目录已存在：'
    }
}

export const getLocale = () => {
    const locale = OsLocale.sync()
    if (locale.includes('zh')) {
        return 'zh'
    } else {
        return 'en'
    }
}

const _default = () => {
    const locale: Locale = getLocale()
    if (locale === 'en') {
        return en
    } else {
        return zh
    }
}

export default _default