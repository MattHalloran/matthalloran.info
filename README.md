# matthalloran.info
The code for [matthalloran.info](https://matthalloran.info).

## Website Features
- Modern design
- Mobile-friendly
- Simple to use
- Full customization

## Development stack
| Dependency  | Purpose  |  Version  |
|---|---|---|
| [ReactJS](https://reactjs.org/)  | UI  |  `^17.0.2` |

## How to start  
### 1. Prerequisites
 Before developing a website from this template, make sure you have the following installed:   
1. [Docker](https://www.docker.com/)
2. [VSCode](https://code.visualstudio.com/)
### 2. Download this repository
`git clone https://github.com/MattHalloran/matthalloran.info`
### 3. Set environment variables  
1. Edit environment variables in [.env-example](https://github.com/MattHalloran/NLN/blob/master/.env-example)
2. Rename the file to .env
### 4. Docker
By default, the docker containers rely on an external network. This network is used for the server's nginx docker container. During development, there is no need to run an nginx container. Instead, you can enter: `docker network create nginx-proxy`

## Open Graph Tags
Open Graph is a metadata format that describes how your website should be shown when shared on social media. This data is set in the header, and can be edited at `public/index.html`. For more information, [here](https://developers.facebook.com/docs/sharing/webmasters/) is a guide from Facebook.

## Common commands
- Start: `docker-compose up -d`
- Stop: `docker-compose down`
- Force stop all containers: `docker kill $(docker ps -q)`
- Delete all containers: `docker system prune --all`
- Delete all containers and volumes: `docker system prune --all --volumes`
- Full deployment test (except for Nginx, as that's handled by a different container): `docker-compose down && docker-compose up --build --force-recreate`
- Rebuild with fresh database: `docker-compose down && rm -rf "${PROJECT_DIR}/data/postgres" && docker-compose up --build --force-recreate`
- Check logs for a docker container: `docker logs <container-name>`

## Deploying project
Currently, the cheapest way to deploy a web project seems to be through VPS hosting. [Here](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-ubuntu-20-04-server-on-a-digitalocean-droplet) is an example of how to do this on DigitalOcean. Instead of a plain Ubuntu server, however, it is easier to install one that already contains Docker.

### 1. Set up DNS
The site can be accessed by the VPS's IP address, but in most cases you'll want to associate the server with a domain name. There are many places to buy domains, but I use [Google Domains](https://domains.google)

Once you buy a domain, you must set up the correct DNS records. This can be done through the site that you bought the domain from, or the site that you bought the VPS from. [Here](https://www.youtube.com/watch?v=wYDDYahCg60) is a good example. **Note**: DNS changes may take several hours to take effect

### 2. Set up VPS - Reverse proxy
The VPS you'll be running this website on must be configured to handle website traffic. This is done through Nginx https://olex.biz/2019/09/hosting-with-docker-nginx-reverse-proxy-letsencrypt/.

I've created a project that automates this process, which you can find [here](https://github.com/MattHalloran/NginxSSLReverseProxy#getting-started).

### 3. Set up VPS - Main code
1. `cd ~`
2. `git clone ${PROJECT_URL}`
3. `cd ${PROJECT_NAME}`
4. Edit .env variables
5. `chmod +x ./scripts/start.sh`
7. `docker-compose up -d`
