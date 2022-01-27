# thb-audit-webapp

## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

### Compiles and minifies for production
```
pnpm run build
```

### Lints and fixes files
```
pnpm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Development

### Proxy configuration

```
dev.thb.com/api http://192.168.2.206:88/h5
dev.thb.com/thb http://192.168.2.206:88/thb

dev.thb.com  http://10.0.2.2:8080
```

## Deploy

### Public Path 

```
VUE_APP_PUBLIC_PATH = '/example/'
VUE_APP_API_BASE = '/api'
```