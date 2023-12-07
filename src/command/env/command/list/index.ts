import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import Action from './action';

// TODO: @封崇
const description = `Get env list.

Supported vendors: Alibaba Cloud

    Example:
        $ s env list

${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/env')}`;

export default (program: Command) => {
  const command = program.command('list');
  command
    .usage('[options]')
    .description(description)
    // TODO: @封崇
    .summary(`${emoji('🔣')} View the list of existing environments`)
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
