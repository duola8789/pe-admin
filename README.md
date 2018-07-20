# background-demo1

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8088
npm run dev

# build for dev server
npm run server

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# build for real server
npm run start
```

## 映射mysql
```
cd server
sequelize-auto -o "./schema" -d zhou -h 127.0.0.1 -u root -p 3306 -x XXXXX -e mysql
```
- `-o` 参数后面的是输出的文件夹目录
- `-d` 参数后面的是数据库名
- `-h` 参数后面是数据库地址
- `-u` 参数后面是数据库用户名
- `-p` 参数后面是端口号
- `-x` 参数后面是数据库密码，
- `-e` 参数后面指定数据库为mysql

## 启动程序

1. `npm install`
2. `npm run dev`
3. `npm run server`

## 发布代码
1. `npm run build`
2. 上传build文件夹
3. 在服务器上，`pm2 start index.js`
