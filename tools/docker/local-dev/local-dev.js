const { join } = require('path')
const { existsSync } = require('fs')
const { exec, env, mkdir, rm } = require('shelljs')

const dir = 'local-dev'
const composeFile = join(__dirname, `docker-compose.${dir}.yml`)
const volumesDir = join(__dirname, '.volumes')
const projectName = `ebd-${dir}`.replace(/-/g, '_')

const commands = { up, down }
const command = commands[process.argv[2]]
if (command) {
  command()
} else {
  console.log('Invalid command ( up | down )')
  process.exit(1)
}

function up() {
  for (const name of ['data', 'events']) {
    const dir = join(volumesDir, name)
    if (!existsSync(dir)) {
      mkdir('-p', dir)
    }
  }
  env['VOLUMES_DIR'] = volumesDir
  exec(`docker-compose -f ${composeFile} -p ${projectName} up -d`)
}

function down() {
  exec(`docker-compose -f ${composeFile} -p ${projectName} down`)
  rm('-rf', volumesDir)
}
