[SuperCollider](https://supercollider.github.io) is included by manually putting a prebuilt version into `app/vendor/supercollider`

Later on a prebuilt version will be installable automatically by npm (node package manager), but for now it has to be put in there.

```sh
public/vendor
└── supercollider
    ├── README.md
    ├── osx
    │   ├── MacOS
    │   │   ├── libFLAC.8.dylib
    │   │   ├── libogg.0.dylib
    │   │   ├── libportaudio.2.dylib
    │   │   ├── libreadline.7.dylib
    │   │   ├── libsndfile.1.dylib
    │   │   ├── libvorbis.0.dylib
    │   │   └── libvorbisenc.2.dylib
    │   └── bin
    │       ├── sclang
    │       └── scsynth
    └── sclang.sh
```

Where the outer `scsynth` is a script that launches the actual `scsynth` binary:

```
#!/bin/bash
DIR="${BASH_SOURCE%/*}/bin";
if [[ -z "$@" ]]; then
  ARGS="-u 57110";
else
  ARGS="$@";
fi
if [[ -z "$SC_SYNTHDEF_PATH" ]]; then
  export SC_SYNTHDEF_PATH="$DIR/synthdefs/"
fi
export SC_PLUGIN_PATH="$DIR/plugins/";
exec "$DIR/scsynth" $ARGS;
```