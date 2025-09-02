import React, { useState } from "react";

const UrlEncoderDecoder: React.FC = () => {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [copiedEncoded, setCopiedEncoded] = useState<string | null>(null);
  const [copiedDecoded, setCopiedDecoded] = useState<string | null>(null);

  const handleEncode = () => {
    try {
      const result = encodeURIComponent(input);
      setEncoded(result);
    } catch (error) {
      setEncoded("Encoding error");
    }
  };

  const handleDecode = () => {
    try {
      const result = decodeURIComponent(input);
      setDecoded(result);
    } catch (error) {
      setDecoded("Decoding error");
    }
  };

  const handleCopy = (text: string, type: "encoded" | "decoded") => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "encoded") {
        setCopiedEncoded(text);
        setTimeout(() => setCopiedEncoded(null), 3000);
      } else {
        setCopiedDecoded(text);
        setTimeout(() => setCopiedDecoded(null), 3000);
      }
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">URL Encoder / Decoder</h1>

      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="テキストを入力してください"
      />

      <div className="flex gap-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleEncode}
        >
          エンコード
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={handleDecode}
        >
          デコード
        </button>
      </div>

      {encoded && (
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">エンコード結果:</h2>
            <div className="flex items-center gap-2">
              <button
                className="text-sm bg-gray-200 px-2 py-1 rounded"
                onClick={() => handleCopy(encoded, "encoded")}
              >
                コピー
              </button>
              {copiedEncoded && (
                <span className="text-xs text-green-600">{copiedEncoded}</span>
              )}
            </div>
          </div>
          <p className="break-all bg-gray-100 p-2 rounded">{encoded}</p>
        </div>
      )}

      {decoded && (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">デコード結果:</h2>
            <div className="flex items-center gap-2">
              <button
                className="text-sm bg-gray-200 px-2 py-1 rounded"
                onClick={() => handleCopy(decoded, "decoded")}
              >
                コピー
              </button>
              {copiedDecoded && (
                <span className="text-xs text-green-600">{copiedDecoded}</span>
              )}
            </div>
          </div>
          <p className="break-all bg-gray-100 p-2 rounded">{decoded}</p>
        </div>
      )}
    </div>
  );
};

export default UrlEncoderDecoder;
