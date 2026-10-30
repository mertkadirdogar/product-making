# Hesap Makinesi

Türkçe arayüzlü, mobil uyumlu tarayıcı hesap makinesi. Dört işlem, ondalık sayılar, yüzde, işaret değiştirme ve klavye desteği içerir. İşlemler girilen sırayla hesaplanır; yüzde tuşu mevcut sayıyı 100'e böler.

## Çalıştırma

Python 3 ile, depo dizininde:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Tarayıcıda sunucunun 8000 portunu açın. Harici paket veya API anahtarı gerekmez.

## Test

Node.js 18 veya üstü ile:

```sh
node --test calculator.test.mjs
```

Klavye: rakamlar, `+ - * /`, ondalık için `,` veya `.`, sonuç için Enter, temizlemek için Escape, silmek için Backspace.
