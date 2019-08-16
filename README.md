# docker-extension

[![Build Status](https://travis-ci.org/NicoVogel/docker-extension.svg?branch=master)](https://travis-ci.org/NicoVogel/docker-extension)

This project is a CLI to shorten the docker commands and compose multiple docker commands into one. This package targets developers for local use. The goal is to speed up docker usages in general.

## CLI commands

Shorts:

| impl    | cli                   | original                  | description                              |
|---------|-----------------------|---------------------------|------------------------------------------|
| &check; | `dc i`                | `docker images`           |                                          |
| &check; | `dc c` **or** `dc ps` | `docker ps`               |                                          |
| &check; | `dc n`                | `docker network ls`       |                                          |
| &check; | `dc n p`              | `docker network prune -f` |                                          |
| &#9744; | `dc v`                | `docker volume ls`        |                                          |
| &#9744; | `dc i p`              | `docker image prune -f`   |                                          |
| &#9744; | `dc io`               | `docker image`            | forwards the options to original command |
| &#9744; | `dc co`               | `docker container`        | forwards the options to original command |
| &#9744; | `dc no`               | `docker network`          | forwards the options to original command |
| &#9744; | `dc vo`               | `docker volume`           | forwards the options to original command |

Compose:

| impl    | cli                    | orig                                | description                                                       |
|---------|------------------------|-------------------------------------|-------------------------------------------------------------------|
| &#9744; | `dc b [name] \<file\>` | `docker build -t \<name\> \<file\>` | builds image and remembers Dockerfile location                    |
| &#9744; | `dc i r \<ID\>`        |                                     | rebuild the image and remove container and dangling of that image |

## More Details

### dc b

Simplified implementation of *docker build -t "\<tag>" -f "\<file name>" \<file location>*.

It does save the file location and name to use it later for *dc i r*.

## unsuitable packages for the project

the following packages where tested, but not suitable for the project.

### docker-cli-js

[npm link](https://www.npmjs.com/package/docker-cli-js)

The issue is that it does not support docker toolbox and I don't want to limit this tool in such a way.

### commander

[npm link](https://www.npmjs.com/package/commander)

The issue is that it does not support sub commands to the extend I will need for the upcoming enhancing commands.
