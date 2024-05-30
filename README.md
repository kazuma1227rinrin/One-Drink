# one-drink

<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <!-- バックエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Rails-CC0000.svg?logo=rails&style=for-the-badge">
  <!-- バックエンドの言語一覧 -->
  <img src="https://img.shields.io/badge/-Ruby-CC342D.svg?logo=ruby&style=for-the-badge">
  <!-- インフラ一覧 -->
  <img src="https://img.shields.io/badge/-Docker-20232A.svg?logo=docker&style=for-the-badge">
</p>

## 目次

1. [実装にあたって作成したドキュメント](#実装にあたって作成したドキュメント)
2. [プロジェクトについて](#プロジェクトについて)
3. [環境](#環境)
4. [ディレクトリ構成](#ディレクトリ構成)
5. [開発環境構築](#開発環境構築)

<br />
<!-- プロジェクト名を記載 -->

## プロジェクト名

One Drink

<!-- ドキュメントについて -->

## 実装にあたって作成したドキュメント

One Drinkを実装していく中でまとめた資料のリスト
- [画面設計書](https://www.figma.com/design/KMj7BLt6yR5Kr9waXtTR3c/%E3%82%B9%E3%82%BF%E3%83%90%E3%81%AE%E3%83%89%E3%83%AA%E3%83%B3%E3%82%AF%E8%A8%BA%E6%96%AD3?node-id=0-1)
- [テーブル定義書](https://docs.google.com/spreadsheets/d/1d18k20CmCinSB2mBI2ZEfikMWh3OUloQ-GV__V-xsuU/edit#gid=0)
- [ER図](https://app.diagrams.net/#G1bYlfl_gZejv7YMLxXwEBrbTz1KSdpgjf#%7B%22pageId%22%3A%22R2lEEEUBdFMjLlhIrx00%22%7D)
- [ドリンク診断のロジック](https://docs.google.com/spreadsheets/d/1H83MB7K-K5zyYW2B8astLNV1AmaD8Sqd0L5ziDMeLp8/edit#gid=0)
- [二段階の診断ロジック内訳](https://docs.google.com/spreadsheets/d/1AKOusaVDsG5mM8WjW5bp8zleD0OChHhF5AJszdJimFU/edit#gid=0)
- [使用APIの比較](https://docs.google.com/spreadsheets/d/1qYPu7IFkLn7UcdClnoUYPbDpXT52fDYfDoksJCnJPEI/edit#gid=0)
- [デバッグ兼修正管理](https://docs.google.com/spreadsheets/d/1cn5WfunAk1J5qE1WqvObDoHYTTSQuDH4fWgHTs9qUjg/edit#gid=0)

<!-- プロジェクトについて -->

## プロジェクトについて

今日飲むスタバのドリンクを診断してくれるサービス


## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク     | バージョン |
| ----------------------| ---------- |
| React                 | 18.2.0     |
| Next.js               | 14.0.4     |
| Ruby                  | 3.1.4      |
| Rails                 | 7.0.8      |
| Docker                | 24.0.7     |

その他のパッケージのバージョンはpackage.json を参照してください


## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->
<!-- まだファイル構成は未完成です -->

❯ tree -a -I "node_modules|.next|.git|.pytest_cache|static" -L 2
<pre>
.
├── frontend
│   ├── components
│   │   └── authServerSide.tsx
│   │   └── BudgetSlider.tsx
│   │   └── Caffeine.tsx
│   │   └── Commitment.tsx
│   │   └── DrinkSize.tsx
│   │   └── Feeling.tsx
│   │   └── Footer.tsx
│   │   └── GetAnalysis.tsx
│   │   └── Header.tsx
│   │   └── ProtectedPage.tsx
│   │   └── Title.tsx
│   │   └── TitleComment.tsx
│   │   └── TitleCustom.tsx
│   │   └── TitleHistory.tsx
│   │   └── TitleResult.tsx
│   │   └── TopButtonArea.tsx
│   ├── contexts
│   │   └── AuthProvider.tsx
│   ├── lib/firebase
│   │   └── apis
│   │   │   └── auth.tsx
│   │   └── admin.js  
│   │   └── config.tsx
│   ├── package-lock.json
│   ├── package.json
│   ├── pages
│   │   └── _app.tsx
│   │   └── _document.tsx
│   │   └── api
│   │   │   └── auth
│   │   │   │   └── [...nextauth].ts
│   │   │   └── hello.ts
│   │   └── index.tsx
│   │   └── CommentEdit
│   │   │   └── [id].tsx
│   │   └── CustomFromHistory
│   │   │   └── [id].tsx
│   │   └── Analyze.tsx
│   │   └── Custom.tsx
│   │   └── History.tsx
│   │   └── login.tsx
│   │   └── Result.tsx
│   │   └── Signup.tsx
│   ├── .env.local
│   ├── .eslintrc.json
│   ├── README.md
│   ├── .yarnrc.yml
│   ├── Dockerfile
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── yarn.lock
├── backend
│   ├── app
│   │   └── channels
│   │   └── controllers
│   │   │   └── comment_controller.rb
│   │   │   └── customs_controller.rb
│   │   │   └── drink_controller.rb
│   │   │   └── healthcheck_controller.rb
│   │   │   └── users_controller.rb
│   │   └── jobs
│   │   └── mailers
│   │   └── models
│   │   │   └── custom_drank_log.rb
│   │   │   └── custom.rb
│   │   │   └── drink_result_log.rb
│   │   │   └── user.rb
│   │   └── views
│   ├── bin
│   │   └── rails
│   │   └── rake
│   │   └── setup
│   ├── config
│   │   └── database.yml
│   │   └── routes.rb
│   ├── config.ru
│   ├── db
│   ├── Gemfile
│   ├── Gemfile.lock
│   ├── lib
│   │   └── tasks
│   ├── log
│   │   └── development.log
│   ├── public
│   │   └── robots.txt
│   ├── Rakefile
│   ├── README.md
│   ├── storage
│   ├── tmp
│   ├── Dockerfile
│   ├── Procfile
│   └── vendor
├── .env
├── .gitignore
├── heroku.yml
└── docker-compose.yml
  
</pre>



## 開発環境構築

<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->

### Docler上でサーバの起動

コマンド: docker-compose up --build

### サーバの停止

以下のショートカットでサーバを停止することができます

 MacBook: control + C<br/>
 Windows: ctrl + Q

### コマンド一覧

| Make                | 実行する処理                                                            |                                                                                
| ------------------- | ----------------------------------------------------------------------- | 
| docker-compose up --build         | Dockerコンテナでサーバの立ち上げ | 
