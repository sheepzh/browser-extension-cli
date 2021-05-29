import { CliConfig } from ".."
import generatePackageJson from './package.json'
import generateWebpack from './webpack'
import * as fs from 'fs'
import * as path from 'path'

export type Rawable = {
    toRaw(): string
}

export default (config: CliConfig) => {
    const rootPath = config.rootPath
    fs.mkdirSync(rootPath)
    fs.writeFileSync(path.join(rootPath, 'package.json'), generatePackageJson(config).toRaw())

    generateWebpack(config)
}