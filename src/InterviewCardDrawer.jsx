import { useState } from "react";

const cardCategories = [
  "技術",
  "團隊",
  "多元文化",
  "福利與職涯",
  "組織與制度",
];

const cardData = {
  技術: [
    { question: "你如何學習新技術？", answer: "我會透過線上課程、開源專案及技術社群快速掌握新技術。" }
  ],
  團隊: [
    { question: "你如何處理團隊衝突？", answer: "我傾向以開放溝通方式釐清誤會並找到雙贏方案。" }
  ],
  多元文化: [
    { question: "你曾經和來自不同背景的人合作嗎？", answer: "有，我會尊重彼此文化差異並找出共同語言與合作模式。" }
  ],
  福利與職涯: [
    { question: "你最在意什麼樣的工作福利？", answer: "我重視彈性工時與成長學習機會。" }
  ],
  組織與制度: [
    { question: "你怎麼看待制度對工作的影響？", answer: "良好的制度能建立信任與工作效率。" }
  ]
};

export default function InterviewCardDrawer() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [revealedAnswers, setRevealedAnswers] = useState([]);

  const handleDrawCard = (category) => {
    if (selectedCards.length >= 3 || selectedCards.includes(category)) return;

    const cardOptions = cardData[category];
    const randomIndex = Math.floor(Math.random() * cardOptions.length);
    const selectedCard = cardOptions[randomIndex];

    setSelectedCards([...selectedCards, category]);
    setRevealedAnswers([...revealedAnswers, selectedCard]);
  };

  const handleReset = () => {
    setSelectedCards([]);
    setRevealedAnswers([]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">反轉面試抽抽樂</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        {cardCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleDrawCard(category)}
            disabled={selectedCards.includes(category)}
            className="p-4 bg-white border rounded-2xl shadow hover:shadow-lg disabled:opacity-50"
          >
            {selectedCards.includes(category)
              ? cardData[category].find(
                  (item) => item.question ===
                    revealedAnswers.find((r) => r.question && r.answer && r.question === item.question)?.question
                )?.question || "已選"
              : category}
          </button>
        ))}
      </div>
      <p className="mb-4 text-gray-600">
        {selectedCards.length < 3
          ? `你還可以抽 ${3 - selectedCards.length} 張卡`
          : "你已抽完三張卡，來看看建議的回答吧！"}
      </p>
      {revealedAnswers.length === 3 && (
        <div className="mt-6 text-left space-y-4">
          {revealedAnswers.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-xl border">
              <p className="font-semibold">Q{index + 1}：{item.question}</p>
              <p className="text-gray-700 mt-2">💡 建議回答：{item.answer}</p>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={handleReset}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
      >
        再玩一次 🔄
      </button>
    </div>
  );
}
