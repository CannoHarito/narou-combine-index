# なろう目次連結

「小説家になろう」において話数が100を超える連載小説のページ分けされた目次を連結し、一つのHTMLとして返す。

```
deno run --allow-net main.ts
```

- 小説のNコードが`n0000xx`だとすると、<br>
  `https://ncode.syosetu.com/n0000xx/`の代わりに<br>
  `http://localhost:8000/n0000xx/`とGETする。
- 必要に応じて、連結されたHTMLか、302リダイレクトを返す。

deno deployでサンプルとして動かしてます。<br>
https://ncode-combine-index.deno.dev/n2710db/ <br>
広く一般に使用する場合、キャッシュの実装など負荷対策を行った上で、自身で運用してください。
