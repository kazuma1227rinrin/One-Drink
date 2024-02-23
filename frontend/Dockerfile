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
# ベースイメージとしてdependenciesを使用し、このビルドステージをbuildとして設定
FROM dependencies AS build 
# Dockerイメージ内の作業ディレクトリを/usr/src/appに設定
WORKDIR /usr/src/app
# 現在のディレクトリの内容を作業ディレクトリにコピー
COPY . /usr/src/app
# yarnを使用してアプリケーションをビルド
RUN yarn build

# --- Release ----
# ベースイメージとしてbaseを使用し、このリリースステージをreleaseとして設定
FROM base AS release
# 依存関係ステージからnode_modulesをコピー
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# ビルドステージからビルド済みの.nextディレクトリをコピー
COPY --from=build /usr/src/app/.next ./.next
# プロジェクトのpublicディレクトリをイメージにコピー
COPY ./public ./public

# コンテナがどのポートで通信を待ち受けるか
EXPOSE 3000

# コマンドをJSON形式で記述
CMD ["yarn", "start", "-H", "0.0.0.0"]