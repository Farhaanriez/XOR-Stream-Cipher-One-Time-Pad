# 🔐 XOR Stream Cipher & One-Time Pad (OTP) Interactive Demo

Aplikasi web interaktif untuk memvisualisasikan mekanisme enkripsi dan dekripsi **XOR Stream Cipher**, simulasi **One-Time Pad (OTP)**, serta demonstrasi serangan kelemahan **Key Reuse Attack (Two-Time Pad)**. 

Proyek ini dibangun menggunakan **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.0-38BDF8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/Academic-Project-green?style=flat-square)

---

## 📌 Anggota Kelompok & Mata Kuliah
- **Mata Kuliah**: Kriptografi dan Keamanan Informasi
- **Topik**: XOR Stream Cipher & One-Time Pad (OTP)

---

## ✨ Fitur Utama

1. **🔒 Enkripsi (Encryption)**
   - Mengubah *Plaintext* dan *Key* menjadi nilai ASCII/Biner.
   - Mengoperasikan logika XOR per byte ($P \oplus K = C$).
   - Output *Ciphertext* ditampilkan dalam format **Hexadecimal** agar *printable* dan terhindar dari karakter kontrol yang tak terlihat.

2. **🔓 Dekripsi (Decryption)**
   - Menerima *Ciphertext* dalam format Hexadecimal dan *Key*.
   - Melakukan operasi XOR sebaliknya ($C \oplus K = P$) untuk memulihkan *Plaintext* asli.

3. **🚨 Input Validation & Error Handling**
   - Mencegah *crash* aplikasi jika input kosong atau kunci kurang panjang.
   - Menampilkan *Alert UI* dinamis sesuai syarat OTP (Panjang kunci minimal harus sama dengan panjang pesan).

4. **💥 Security Attack Feature: Key Reuse Attack (Two-Time Pad)**
   - Simulasi bahaya penggunaan kunci tunggal untuk dua pesan berbeda ($M_1$ dan $M_2$).
   - Membuktikan secara matematis bahwa $C_1 \oplus C_2 = M_1 \oplus M_2$, yang membatalkan fungsi kerahasiaan kunci.

5. **🧪 Automated Test Cases**
   - Dilengkapi minimal 3 kasus uji (*test cases*) bawaan.
   - Sistem melakukan verifikasi otomatis antara *Your Output* dan *Expected Output* serta memberikan indikator **PASS** / **FAIL**.

6. **📜 OTP Requirements Section**
   - Edukasi visual mengenai 4 syarat mutlak One-Time Pad (Truly Random, Key Length $\ge$ Message, Kept Secret, Never Reused).

---

## 🧮 Logika & Rumus Kriptografi

Operasi dasar yang digunakan adalah bitwise **XOR** ($\oplus$):

* **Enkripsi**: $C = P \oplus K$
* **Dekripsi**: $P = C \oplus K$
* **Key Reuse Proof**:
  $$C_1 = P_1 \oplus K$$
  $$C_2 = P_2 \oplus K$$
  $$C_1 \oplus C_2 = (P_1 \oplus K) \oplus (P_2 \oplus K) = P_1 \oplus P_2$$
