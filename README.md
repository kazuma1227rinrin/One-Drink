# mouretsu-standardization
テンプレートリポジトリ

【作成手順】
* docker-compose.ymlを作成する
* .envファイルを作成する
* frontend・backendディレクトリを作成する
* frontend/Dockerfileを作成する
* backend/Dockerfileを作成する
* backend/Gemfileを作成する
* front側でnext.jsの環境構築
* backend側でrailsの環境構築
* docker compose up -d --build

ローカルでactionlintを実行する
docker run --rm -v $(pwd):/repo --workdir /repo rhysd/actionlint:latest

【参考記事】
* https://qiita.com/shinKoala99/items/5c1f21996b7f3980cc06
* https://qiita.com/itachi/items/05fbe67c7168703a34e7
* https://qiita.com/gon0821/items/77369def082745d19c38
* https://qiita.com/Yusuke_Hoirta/items/3a50d066af3bafbb8641
* https://isub.co.jp/docker/getting-started-with-docker-mysql/#docker-compose