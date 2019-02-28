# A cool crawler robot :robot:

## Instalation

### Requeriments:

- **docker** -> updated

Run docker build command: `docker build -t robo-crawler .`

Then run docker start command: `docker run -p 8000:8000 robo-crawler` or `docker run -p 8000:8000 robo-crawler:latest`

_And that is it :tada:!_

## Usage

Send a POST request to **localhost:8000/buscar** with a payload like this:

```json
{
	"checkin": "06/03/2019",
	"checkout": "08/03/2019"
}
```

> ps: You can install node natively and try `npm install & npm run build & node dist/index.js`, but I do not recommend to do it, cause this project uses [puppeteer](https://github.com/GoogleChrome/puppeteer), and it uses some specific libraries and application may fail if is not installed.