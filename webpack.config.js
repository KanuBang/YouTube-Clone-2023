const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//라이브러리로 로드되는 플러그인
const path = require("path")

module.exports = {
    entry: "./src/client/js/main.js",
    //웹팩은 하나의 시작점으로부터 의존적인 모듈들을 전부 찾아내서 하나의 결과물을 만들어낸다
    //그 시작점, 진입경로가 entry다.

    mode: "development",
    //웹팩의 실행모드
    plugins: [
      new MiniCssExtractPlugin({
        filename:"css/styles.css"
      })
    ],
    output: {
        filename: "js/main.js",
        path: path.resolve(__dirname,"assets")
    },
    //번들링한 파일들을 저장할 위치
    //번들링된 파일의 이름

    module: { //module 프로퍼티는 프로젝트 내의 여러 유형의 모듈들을 처리할 방법을 결정

        rules: [ // 모듈이 생성될 때 요청과 일치하는 규칙의 배열
            {
              test: /\.js$/, // loader를 적용시킬 파일들을 정규식으로 명시
              use: {
                loader: "babel-loader", // 사용할 로더
                options: {
                  presets: [["@babel/preset-env", { targets: "defaults" }]],
                },
              },
            },

            {
              test: /\.scss$/,
              use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }
          ],
    }
}