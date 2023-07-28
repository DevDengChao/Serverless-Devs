import os from 'os';
import { maxBy, repeat, filter, get } from 'lodash';
import TableLayout from 'table-layout';
import { getRootHome } from '@serverless-devs/utils';
const pkg = require('../../package.json');



export { default as getPid } from './get-pid';
export { default as checkNodeVersion } from './check-node-version';
export { default as setProxy } from './set-proxy';

export const emoji = (text: string, fallback?: string) => {
  if (os.platform() === 'win32') {
    return fallback || '◆';
  }
  return `${text} `;
};

export const formatHelp = (data: { command: string; description: string }[], indent = 0) => {
  const newData = filter(data, item => item.command !== 'help');
  const commandMaxLen = maxBy(newData, item => get(item, 'command.length')).command.length;
  const descMaxLen = maxBy(newData, item => get(item, 'description.length')).description.length;
  return new TableLayout(newData, {
    padding: { left: repeat(' ', indent + 2) },
    columns: [
      {
        name: 'command',
        width: commandMaxLen + 2 > 29 ? commandMaxLen + 2 : 29,
      },
      {
        name: 'description',
        width: descMaxLen + 10,
      },
    ],
  }).toString();
};

export const formatError = (data: { key: string; value: string }[]) => {
  const keyMaxLen = maxBy(data, item => get(item, 'key.length')).key.length;
  const valueMaxLen = maxBy(data, item => get(item, 'value.length')).value.length;
  return new TableLayout(data, {
    padding: { left: '' },
    columns: [
      {
        name: 'key',
        width: keyMaxLen + 2,
      },
      {
        name: 'value',
        width: valueMaxLen + 10,
      },
    ],
  }).toString();
};


export function getVersion() {
  const data = [
    `${pkg.name}: ${pkg.version}`,
    `s-home: ${getRootHome()}`,
    `${process.platform}-${process.arch}`,
    `node-${process.version}`,
  ];
  return data.filter(o => o).join(', ');
}
