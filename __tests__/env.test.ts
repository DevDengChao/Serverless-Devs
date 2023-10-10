import { spawnSync } from 'child_process';
import path from 'path';
import * as fs from 'fs-extra';
import * as utils from '@serverless-devs/utils';
import { ENVIRONMENT_FILE_NAME } from '@serverless-devs/parse-spec';
import { find, get } from 'lodash';
const s = path.resolve(__dirname, '../bin/s');
const cwd = path.resolve(__dirname, './fixtures/env');

test('init', async () => {
  const environmentFilePath = path.join(cwd, ENVIRONMENT_FILE_NAME);
  fs.removeSync(environmentFilePath);
  const name = 'dev';
  const args = [
    '--name',
    name,
    '--project',
    'custom-project',
    '--description',
    'this is a description',
    '--type',
    'testing',
    '--region',
    'cn-chengdu',
    '--role',
    'acs:ram::<account>:role/serverlessdevsinfra-testing',
    '--overlays',
    '{"global":{"key":"value"}}',
    '--debug',
  ];
  spawnSync(s, ['env', 'init', ...args], { cwd, stdio: 'inherit' });
  const res = utils.getYamlContent(environmentFilePath);
  console.log(res);
  expect(find(get(res, 'environments'), { name })).toBeTruthy();
});

test('init -t', async () => {
  const name = 'custom';
  const template = 'custom.yaml';
  const environmentFilePath = path.join(cwd, template);
  fs.removeSync(environmentFilePath);
  const args = [
    '--name',
    name,
    '--project',
    'custom-project',
    '--description',
    'this is a description',
    '--type',
    'testing',
    '--region',
    'cn-chengdu',
    '--role',
    'acs:ram::<account>:role/serverlessdevsinfra-testing',
    '-t',
    template,
  ];
  spawnSync(s, ['env', 'init', ...args], { cwd, stdio: 'inherit' });
  const res = utils.getYamlContent(environmentFilePath);
  console.log(res);
  expect(find(get(res, 'environments'), { name })).toBeTruthy();
});

test('deploy', async () => {
  const res = spawnSync(s, ['deploy', '--env', 'dev', '--debug'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('preview', async () => {
  const res = spawnSync(s, ['preview', '--env', 'dev', '--debug'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('update', async () => {
  const name = 'dev';
  const template = 'update.yaml';
  const environmentFilePath = path.join(cwd, template);
  const args = [
    '--name',
    name,
    '--description',
    'this is a description',
    '--type',
    'staging',
    '--region',
    'cn-chengdu',
    '--role',
    'acs:ram::<account>:role/serverlessdevsinfra-testing',
    '-t',
    template,
  ];
  spawnSync(s, ['env', 'update', ...args], { cwd, stdio: 'inherit' });
  const res = utils.getYamlContent(environmentFilePath);
  console.log(res);
  expect(find(get(res, 'environments'), { name })).toBeTruthy();
});

test.only('describe', async () => {
  const name = 'dev';
  const template = 'update.yaml';
  const args = [
    '--name',
    name,
    '-t',
    template,
  ];
  const res = spawnSync(s, ['env', 'describe', ...args], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});
