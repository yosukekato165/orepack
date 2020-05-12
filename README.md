
# Orepack
 
自分用の開発環境

# Features
 
・Sass/Scssをコンパイル出来る
・ES6記法をES5に変換しバンドル出来る
・Hot reloadが出来る。
・CSS内のurlを読み込める。
 
# Usage

開発
```bash
npm start
```

公開
```bash
npm run build
```
 
# Note
 
圧縮したくない場合は、
```bash
module.exports = merge(common, {
  mode: 'production'
});
```
↓
```bash
module.exports = merge(common, {
  mode: 'development'
});
```
※JSはproductionで最適化したものを圧縮されてないフォルダに移植する必要があります。