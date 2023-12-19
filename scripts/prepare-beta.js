const fs = require('fs');
const packageJsonPath = '../package.json';

// 读取 package.json 文件
const packageJson = require(packageJsonPath);

// 生成版本号
packageJson.version = `${packageJson.version}-${process.env.GITHUB_SHA.slice(0, 8)}`;

// 将更新后的对象写回 package.json 文件
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');