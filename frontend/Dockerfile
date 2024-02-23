# ---- Base Node ----
FROM node:18-alpine AS base
# コンテナ内の作業ディレクトリ
WORKDIR /usr/src/app

# Copy package.json and yarn.lock for utilising Docker cache 
# package.jsonとyarn.lockファイルをルートディレクトリ配下にコピーする。
COPY package.json yarn.lock ./

# ---- Dependencies ----
FROM base AS dependencies  
# 後半でyarnのキャッシュを削除して軽くしている。
RUN yarn install && yarn cache clean

# ---- Copy Files/Build ----
FROM dependencies AS build 
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn build

# --- Release ----
FROM base AS release
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY ./public ./public

# コンテナがどのポートで通信を待ち受けるか
EXPOSE 3000

# コマンドをJSON形式で記述
CMD ["yarn", "start", "-H", "0.0.0.0"]