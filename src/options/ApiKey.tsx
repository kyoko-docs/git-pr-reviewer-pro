import { useState } from "react";

export const ApiKey = () => {
  const [key, setKey] = useState("");

  const saveKey = async () => {
    const encoder = new TextEncoder();
    const encodedKey = encoder.encode(key);

    // 1. 暗号化鍵の生成 or 再利用
    const cryptoKey = await window.crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"],
    );

    // セッション用に export して保存
    const exported = await window.crypto.subtle.exportKey("raw", cryptoKey);
    sessionStorage.setItem(
      "crypto_key",
      btoa(String.fromCharCode(...new Uint8Array(exported))),
    );

    // 2. 暗号化
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const cipher = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      encodedKey,
    );

    // 3. 保存
    chrome.storage.local.set({
      k: {
        iv: Array.from(iv),
        cipher: Array.from(new Uint8Array(cipher)),
      },
    });

    // 4. 復号 round-trip 検証
    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      cipher,
    );
    const decoded = new TextDecoder().decode(decrypted);
    console.assert(decoded === key, "Round-trip decryption failed");
  };

  return (
    <div>
      <h2>Enter your OpenAI API Key</h2>
      <input
        type="password"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="sk-..."
      />
      <button onClick={saveKey}>Save</button>
    </div>
  );
};

export default ApiKey;
