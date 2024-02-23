# Build stage

    # すべてのDoclerfileにFROMコマンドが1つは必要
    FROM ruby:3.2.2 as Builder
    
    # インターネット上のリポジトリの最新情報をローカルのシステムにダウンロードする。-qqでコマンド実行中に不要な情報を表示しない。
    # node.jsとMySQLのサーバに接続するためのクライアントソフトウェア -yですべてにyesと答える。
    RUN apt-get update -qq && apt-get install -y nodejs default-mysql-client
    
    # DockerコンテナはデフォルトでUTC(協定世界時)をシステム時刻として使用する。
    # TimeZoneが日本時刻になるコマンド
    ENV TZ=Asia/Tokyo
    
    # これいらんかも
    # RUN mkdir /one_drink 
    WORKDIR /one_drink

    COPY Gemfile /one_drink/Gemfile
    COPY Gemfile.lock /one_drink/Gemfile.lock
    
    # gem updateは必要ない # bundle installを実行したらgemファイルはアップデートされるから？
    RUN gem update && \
        bundle install
    COPY . /one_drink

# Runtime stage

    # 公式DockerイメージのRuby
    # -slimはイメージのサイズを小さくするために不要なファイルを削っている
    FROM ruby:3.2.2-slim

    RUN apt-get update -qq && apt-get install -y nodejs default-mysql-client

    # TimeZone
    ENV TZ=Asia/Tokyo

    # RUN mkdir /one_drink
    WORKDIR /one_drink
    
    # BuilderというステージからDockerにコピーする。
    # Builderステージ内のディレクトリから現在のビルドステージにコピー
    COPY --from=Builder /usr/local/bundle/ /usr/local/bundle/

    # シェルをこのディレクトリにコピーして実行権を与えてENTRYPOINTコマンドで実行
    # /usr/bin/はLinux上でスクリプトが格納されてる場所
    COPY entrypoint.sh /usr/bin/
    RUN chmod +x /usr/bin/entrypoint.sh
    ENTRYPOINT ["entrypoint.sh"]
    
    # コンテナがどのポートで通信を待ち受けるか
    EXPOSE 3000

    # コマンドをJSON形式で記述
    CMD ["rails", "server", "-b", "0.0.0.0"]
