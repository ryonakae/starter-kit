#!/bin/sh

rsync -av $0 $1 --exclude node_modules --exclude .DS_Store
