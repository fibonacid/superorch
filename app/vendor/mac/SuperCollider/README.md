[SuperCollider](https://supercollider.github.io) is included by manually putting a prebuilt version into `app/vendor/supercollider`

```sh
vendor
└── supercollider
    └── osx
        ├── README.md
        ├── SuperCollider
        │   ├── Frameworks
        │   ├── Info.plist
        │   ├── MacOS
        │   ├── PkgInfo
        │   └── Resources
        └── sclang.sh
```

Where the outer `sclang` is a script that launches the actual `sclang` binary:

```
#!/bin/bash
exec "./SuperCollider/MacOS/sclang"
```

In order to compile, MacOS folder must contain the following resources:

```sh
public/vendor/supercollider/osx/bundle/MacOS
├── SCClassLibrary
├── SuperCollider
├── bearer
├── iconengines
├── imageformats
├── platforminputcontexts
├── platforms
├── position
├── printsupport
├── sclang
├── sqldrivers
├── styles
└── virtualkeyboard
```
