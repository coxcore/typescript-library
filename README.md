# cox-typescript-library

## Usage

### start

> Run dev server. Target directory is `src/demo`.

```
$ npm run start
or
$ yarn start
```

### build

> Target directory is `src/lib`. Output directory is `build`.

```
$ npm run build
or
$ yarn build
```

## Configuration

Edit `initialize.json` to set the information needed to initialize the repository.

#### scripts/initialize.json

```
{
  "repo": "user-id/library-name", // path of repository
  "namespace": "user-ns", // libraries namespace(for umd)
  "name": "User Name <user0@email>" // your name
}
```

Values ​​set in `initialize.json` affect the following files:

- README.md
- LICENSE
- package.json
- rollup.config.js

After modifying `initialize.json`, install the package.

```
$ npm install
or
$ yarn
```

If the package is already installed, run the initialization script directly.

```
$ node ./scripts/initialization
```

> When initialization is complete, the `scripts/initialize.js` file is deleted, and the `scripts.install` value in `package.json` is also removed.

## Output Types

### Namespace Libraries

```json
{
  "repo": "user-id/library-name",
  "namespace": "user-ns",
  "name": "User Name <user0@email>"
}
```

##### result

- `library name` : user-ns-library-name
- `namespace` : userNs
- `LICENSE` : (c) USER ID / User Name

### Organization Libraries

The case where `@` is used in the `namespace` is as follows:

```json
{
  "repo": "user-id/library-name",
  "namespace": "@user-ns",
  "name": "User Name <user0@email>"
}
```

##### result

- `library name` : @user-ns/library-name
- `namespace` : userNs
- `LICENSE` : (c) USER ID / User Name

### Normal Libraries

If no `namespace` is set:

```json
{
  "repo": "user-id/library-name",
  "namespace": "",
  "name": "User Name <user0@email>"
}
```

##### result

- `library name` : library-name
- `namespace` : userId
- `LICENSE` : (c) USER ID / User Name

## License

MIT License
