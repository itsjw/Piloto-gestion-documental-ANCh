#!/bin/bash

yarn run lib
git status
git add .
git commit -m $1
git push

