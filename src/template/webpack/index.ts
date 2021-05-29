import { CliConfig } from "../../"
import * as fs from 'fs'
import * as path from 'path'

export default (config: CliConfig) => {
    const webpackDirPath = path.join(config.rootPath, 'webpack')
    fs.mkdirSync(webpackDirPath)

    const content = fs.readFileSync(path.join(__dirname, 'webpack.base.js.txt'))
    fs.writeFileSync(path.join(webpackDirPath, 'webpack.base.js'), content)
}