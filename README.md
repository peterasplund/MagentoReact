# MagentoReact
React+Redux based front-end for Magento

## Setup for development

### Setup backend
1. If not installed, install docker, docker-compose (Windows and OSX users also have to install docker-machine)
2. Run `docker-machine ip` and add an entry in "/ect/hosts" with "magento.local" as the hostname.
3. Run `eval $(docker-machine env)` to configure your shell
4. cd into `backend` and run `docker-compose up -d`.
5. Run `docker exec -it backend_web_1 install-sampledata` to install the sample data.
6. Run `docker exec -it backend_web_1 install-magento` to automatically install Magento.
7. Visit http://magento.local/ and make sure it's working.

### Setup frontend
1. Run `npm install` in the root folder.
2. Run `npm run serve`.
6. Visit http://localhost:3000/

## Misc

* Use `docker exec -it backend_web_1 /bin/bash` to run the shell for the web server
* Use `docker exec -it backend_mysql_1 /bin/bash` to run the shell for the mysql server

## Discussion

Join the @magentoreact slack group
