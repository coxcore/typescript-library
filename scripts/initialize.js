const path = require('path');
const fs = require('fs');
const root = path.resolve();
const { repo = '', namespace = '', name = '' } = require('./initialize.json');

const files = ['package.json', 'rollup.config.js', 'README.md', 'LICENSE'];

const tempUser = 'coxcore';
const tempDir = 'typescript-library';
const tempLib = `cox-${tempDir}`;
const tempName = 'Park U-yeong <ascript0@gmail.com>';

const ns = namespace.replace('@', '');
const userName = name.replace(/\s*<.*$/, '');
const [user, lib] = repo ? repo.split('/') : [tempUser, tempDir];
const upperUser = user.toUpperCase().replace(/-/g, ' ');
const copyright = `(c) ${upperUser} / ${userName}`;
const libName = ((namespace, lib) => {
    const isOrg = namespace ? /^@/.test(namespace) : false;

    return isOrg ? `${namespace}/${lib}` : ns ? `${ns}-${lib}` : lib;
})(namespace, lib);

const regLib = new RegExp(`${tempLib}`, 'g');
const regDir = new RegExp(`${tempDir}`, 'g');
const regUser = new RegExp(`${tempUser}`, 'g');
const regName = new RegExp(tempName, 'g');
const regUpperUser = new RegExp(`${tempUser.toUpperCase()}`, 'g');
const regCopyright = new RegExp(
    `\\(c\\) ${tempUser.toUpperCase()} / ${tempName.replace(/\s*<.*$/, '')}`
);

const replace = (file) => {
    const filePath = path.resolve(root, file);
    const txt = fs.readFileSync(filePath, 'utf8');
    let result = txt
        .replace(regName, name)
        .replace(regCopyright, copyright)
        .replace(regUpperUser, upperUser)
        .replace(regLib, libName)
        .replace(regDir, lib)
        .replace(regUser, user);

    if (file === 'package.json') {
        result = result.replace(
            /\s*"install":\s*"node\s+.\/scripts\/initialize"[^\n]*/,
            ''
        );

        fs.rmSync(path.resolve(__dirname, 'initialize.js'));
    }

    fs.writeFileSync(filePath, result, 'utf8');
};

if (repo !== `${tempUser}/${tempDir}`) {
    console.log(`\n${'-'.repeat(repo.length + 15)}
 Initialize Library
 repository : ${repo}
 namespace : ${namespace}
${'-'.repeat(repo.length + 15)}\n`);

    files.forEach(replace);
} else {
    console.log(`\n${'-'.repeat(44)}
 Set up the 'scripts/initialize.json' file.
${'-'.repeat(44)}\n`);
}
