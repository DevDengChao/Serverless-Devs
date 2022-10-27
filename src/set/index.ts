import program from '@serverless-devs/commander';
import { emoji } from '../utils/common';
import core from '../utils/core';

const { colors } = core;

const description = `You can make some default settings for the tool here.

${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md',
)}`;

program
  .name('s set')
  .usage('[commands] [options]')
  .command('registry', `${emoji('👀')} Set registry information`)
  .command('proxy', `${emoji('🔧')} Set proxy information`)
  .command('analysis', `${emoji('👉')} Set to enable or disable analysis`)
  .command('workspace', `${emoji('🙊')} Set workspace path`)
  .helpOption('-h, --help', 'Display help for command')
  .addHelpCommand(false)
  .description(description)
  .parse(process.argv);
