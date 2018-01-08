#!/bin/sh

rsync -avhr $1/ $2 --exclude node_modules --exclude .DS_Store