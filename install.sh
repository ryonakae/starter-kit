#!/bin/sh

rsync -avhr . $1 --exclude .git --exclude node_modules --exclude .DS_Store --exclude dist --exclude install.sh --exclude LICENSE --exclude README.md
