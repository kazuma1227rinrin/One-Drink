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

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)

<br />
<!-- プロジェクト名を記載 -->

## プロジェクト名

One Drink

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
| Docler                | 24.0.7     |

その他のパッケージのバージョンは pyproject.toml と package.json を参照してください


## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->
<!-- まだファイル構成は未完成です -->

❯ tree -a -I "node_modules|.next|.git|.pytest_cache|static" -L 2
<pre>
.
├── frontend
│   ├── components
│   │   └── CreateTodoForm.tsx
│   │   └── DeleteTodoButton.tsx
│   │   └── EditTodoForm.tsx
│   │   └── Todo.tsx
│   │   └── Todos.tsx
│   ├── next-env.d.ts
│   ├── next.config.js
│   ├── node_modules
│   │   └── [依存関係のライブラリ]
│   ├── package-lock.json
│   ├── package.json
│   ├── pages
│   │   └── _app.tsx
│   │   └── _document.tsx
│   │   └── api
│   │   └── index.tsx
│   │   └── todos
│   ├── postcss.config.js
│   ├── public
│   │   └── favicon.ico
│   │   └── next.svg
│   │   └── vercel.svg
│   ├── README.md
│   ├── styles
│   │   └── globals.css
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── types
│       └── Todo.ts
└── backend
    ├── app
    │   └── channels
    │   └── controllers
    │   └── jobs
    │   └── mailers
    │   └── models
    │   └── views
    ├── bin
    │   └── rails
    │   └── rake
    │   └── setup
    ├── config
    │   └── [アプリケーションの設定ファイル]
    ├── config.ru
    ├── db
    │   └── development.sqlite3
    │   └── migrate
    │   └── schema.rb
    │   └── seeds.rb
    ├── Gemfile
    ├── Gemfile.lock
    ├── lib
    │   └── tasks
    ├── log
    │   └── development.log
    ├── public
    │   └── robots.txt
    ├── Rakefile
    ├── README.md
    ├── storage
    │   └── [アップロードされたファイルのストレージ]
    ├── tmp
    │   └── [一時ファイル]
    └── vendor
        └── [サードパーティのコード]
└── .env
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

| Make                | 実行する処理                                                            |                                                                                |
| ------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| docker-compose up --build         | Dockerコンテナでサーバの立ち上げ | 