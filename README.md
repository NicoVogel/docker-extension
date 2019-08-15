# docker-extension

This project is a CLI to shorten the docker commands and compose multiple docker commands into one.

## CLI commands

Shorts:

| impl | cli            | original              | description                              |
| ---- | -------------- | --------------------- | ---------------------------------------- |
| [x]  | dc i           | docker images         |                                          |
| []   | dc c *(dc ps)* | docker ps             |                                          |
| []   | dc n           | docker network ls     |                                          |
| []   | dc v           | docker volume ls      |                                          |
| []   | dc i p         | docker image prune -f |                                          |
| []   | dc io          | docker image          | forwards the options to original command |
| []   | dc co          | docker container      | forwards the options to original command |
| []   | dc no          | docker network        | forwards the options to original command |
| []   | dc vo          | docker volume         | forwards the options to original command |

Compose:

| impl | cli                  | orig                              | description                                                       |
| ---- | -------------------- | --------------------------------- | ----------------------------------------------------------------- |
| []   | dc b [name] \<file\> | docker build -t \<name\> \<file\> | builds image and remembers Dockerfile location                    |
| []   | dc i r \<ID\>        |                                   | rebuild the image and remove container and dangling of that image |

## More Details

### dc b

Simplified implementation of *docker build -t "\<tag>" -f "\<file name>" \<file location>*.

It does save the file location and name to use it later for *dc i r*.

#### Arguments

- 

## for later

enhance the docker calls with the following module

[docker-cli-js](https://www.npmjs.com/package/docker-cli-js)
