const path = require('path')
const glob = require('glob')
const fs = require('fs/promises')
const { joinPaths } = require('./utils')

const distFolder = joinPaths(__dirname, '..', 'dist')
const declarationFiles = glob.sync(`${distFolder}/**/*.d.ts`)
const regex = /(import)(.*).s?css('|");?/gmi

const replaceSCSSImports = async (filename) => {
  try {
    const fileContent = await fs.readFile(filename, { encoding: 'utf8' })

    if (fileContent.match(regex)) {
      const updatedContent = fileContent.replace(regex, '')

      await fs.writeFile(filename, updatedContent, { encoding: 'utf8' })

      // console.log(`${file} declaration file successfully updated`)
    }
  } catch (error) {
    console.warn(`\n\n\nError reading file: ${filename}`)
    throw error
  }
}

declarationFiles.forEach(replaceSCSSImports)

const removeThemeDistFolder = () => {
  const target = path.join(distFolder, 'theme')
  fs.rm(target, {
    recursive: true,
    force: true
  })
}

removeThemeDistFolder()
