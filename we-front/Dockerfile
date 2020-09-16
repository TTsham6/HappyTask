FROM node:12.18.3-alpine3.12

# ディレクトリ生成
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# 依存ライブラリをインストール
COPY package.json /usr/src/app
RUN npm install

# ソースコードをコピー
COPY . /usr/src/app

# ビルド
RUN  npm run build

EXPOSE 3000

CMD ["npm","start"]

