
import { useState, useEffect, useRef } from "react";
import { Input, Button } from "antd";
import "./chatbox.scss";
import api from "../../api";
import { ProductResponse } from "../../dataType/product";
import { useNavigate } from "react-router-dom";

type Message = {
  type: "user" | "bot";
  text?: string;
  products?: ProductResponse[];
  showActions?: boolean;
};

type FAQ = {
  question: string;
  answer: string;
};

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [faq, setFaq] = useState<FAQ[]>([]);
  const [showOptions, setShowOptions] = useState(true);
  const [minimized, setMinimized] = useState(false);

  const navigate = useNavigate();
  const chatRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const scrollPosition = useRef(0);
  const shouldAutoScroll = useRef(true);
  // ✅ LOAD TXT
  useEffect(() => {
    fetch("/data/chat-data.txt")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n").filter(Boolean);

        const data = lines.map((line) => {
          const [question, answer] = line.split("|");
          return { question, answer };
        });

        setFaq(data);
      });
  }, []);

  // ✅ CLICK OUTSIDE → THU NHỎ nhưng vẫn lưu vị trí cũ
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target)
      ) {
        if (bodyRef.current) {
          scrollPosition.current =
            bodyRef.current.scrollTop;
        }

        setMinimized(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    if (messages.length > 0) return;

    const load = async () => {
      const autoMsg = await autoSellMessage();

      if (autoMsg) {
        setMessages([autoMsg]);
      } else {
        setMessages([
          {
            type: "bot",
            text: "Xin chào, tôi có thể giúp gì cho bạn 😊",
          },
        ]);
      }
    };

    load();
  }, [open]);
  useEffect(() => {
    if (!open || !bodyRef.current) return;

    const scrollToBottom = () => {
      const el = bodyRef.current;
      if (!el) return;

      el.scrollTop = el.scrollHeight;
    };

    scrollToBottom();

    const t1 = setTimeout(scrollToBottom, 50);
    const t2 = setTimeout(scrollToBottom, 150);
    const t3 = setTimeout(scrollToBottom, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [open, messages]);
  const normalize = (str: string) => {
    return str.toLowerCase().replace(/[^\w\s]/gi, "").trim();
  };

  const extractPriceRange = (text: string) => {
    const numbers = text.match(/\d+/g);

    if (!numbers) return { min: null, max: null };

    const values = numbers.map((n) => Number(n) * 1000);

    if (values.length === 1) {
      return { min: null, max: values[0] };
    }

    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  };

  const levenshtein = (a: string, b: string) => {
    const matrix = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;

        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[a.length][b.length];
  };

  const matchAdvanced = (userInput: string, question: string) => {
    const userWords = normalize(userInput).split(" ");
    const questionWords = normalize(question).split(" ");

    const commonWords = userWords.filter((word) =>
      questionWords.includes(word)
    );

    const count = commonWords.length;

    const hasConsecutive = (words: string[], target: string[]) => {
      for (let i = 0; i < words.length - 1; i++) {
        const pair = words[i] + " " + words[i + 1];
        for (let j = 0; j < target.length - 1; j++) {
          const targetPair = target[j] + " " + target[j + 1];
          if (pair === targetPair) return true;
        }
      }
      return false;
    };

    const consecutive = hasConsecutive(userWords, questionWords);

    if (count >= 2 && consecutive) return true;

    return false;
  };
  // Lưu tính cách user
  const saveUserInterest = (text: string) => {
    const lower = text.toLowerCase();

    let type = "";

    if (lower.includes("hg")) type = "HG";
    else if (lower.includes("rg")) type = "RG";
    else if (lower.includes("mg")) type = "MG";
    else if (lower.includes("pg")) type = "PG";
    else if (lower.includes("figure")) type = "Figure";

    const old = localStorage.getItem("user_interest");
    const data = old ? JSON.parse(old) : {};

    if (type) {
      data[type] = (data[type] || 0) + 1;
    }

    const numbers = text.match(/\d+/g);

    if (numbers) {
      const maxPrice = Number(numbers[numbers.length - 1]) * 1000;
      data.favoritePrice = maxPrice;
    }

    data.lastVisit = Date.now();

    localStorage.setItem("user_interest", JSON.stringify(data));
  };
  const getFavoriteType = () => {
    const old = localStorage.getItem("user_interest");

    if (!old) return null;

    const data = JSON.parse(old);

    let max = 0;
    let fav = null;

    for (let key in data) {
      if (data[key] > max) {
        max = data[key];
        fav = key;
      }
    }

    return fav;
  };
  // Auto sell old user
  const autoSellMessage = async (): Promise<Message | null> => {
    const old = localStorage.getItem("user_interest");

    if (!old) return null;

    const data = JSON.parse(old);

    let fav = "";
    let max = 0;

    for (let key in data) {
      if (
        key !== "favoritePrice" &&
        key !== "lastVisit" &&
        data[key] > max
      ) {
        fav = key;
        max = data[key];
      }
    }

    try {
      const res = await api.product.getAllProduct(1, 100, {
        name: "",
        categoryId: [],
      });

      let products = res.data.data;

      if (fav) {
        products = products.filter((p: any) =>
          p.name.toLowerCase().includes(fav.toLowerCase())
        );
      }

      if (data.favoritePrice) {
        products = products.filter(
          (p: any) => p.price <= data.favoritePrice
        );
      }

      products = products.slice(0, 5);

      return {
        type: "bot",
        text: `🔥 Bạn hay xem ${fav}, đây là sản phẩm hợp gu của bạn hôm nay:`,
        products,
        showActions: true,
      };
    } catch {
      return null;
    }
  };
  // Gợi ý
  const handleBotResponse = async (text: string): Promise<Message> => {
    const lower = text.toLowerCase();
    if (
      lower.includes("gợi ý riêng") ||
      lower.includes("dành cho tôi") ||
      lower.includes("recommend cho tôi")
    ) {
      try {
        const fav = getFavoriteType();

        const res = await api.product.getAllProduct(1, 100, {
          name: "",
          categoryId: [],
        });

        let products = res.data.data;

        if (fav) {
          products = products.filter((p: any) =>
            p.name.toLowerCase().includes(fav.toLowerCase())
          );
        }

        products = products.slice(0, 5);

        return {
          type: "bot",
          text: `🤖 Tớ nhớ cậu thích ${fav}, đây là sản phẩm dành riêng cho cậu:`,
          products,
          showActions: true,
        };
      } catch {
        return {
          type: "bot",
          text: "Không load được 😢",
        };
      }
    }
    // 🤖 AI RECOMMEND THÔNG MINH
    if (
      lower.includes("gợi ý") ||
      lower.includes("recommend") ||
      lower.includes("nên mua") ||
      lower.includes("tư vấn")
    ) {
      try {
        const res = await api.product.getAllProduct(1, 100, {
          name: "",
          categoryId: [],
        });

        let products = res.data.data;

        // lọc loại sản phẩm
        if (lower.includes("hg")) {
          products = products.filter((p: any) =>
            p.name.toLowerCase().includes("hg")
          );
        }

        if (lower.includes("rg")) {
          products = products.filter((p: any) =>
            p.name.toLowerCase().includes("rg")
          );
        }

        if (lower.includes("mg")) {
          products = products.filter((p: any) =>
            p.name.toLowerCase().includes("mg")
          );
        }

        if (lower.includes("pg")) {
          products = products.filter((p: any) =>
            p.name.toLowerCase().includes("pg")
          );
        }

        if (lower.includes("figure")) {
          products = products.filter((p: any) =>
            p.name.toLowerCase().includes("figure")
          );
        }

        // lọc giá nếu có
        const { min, max } = extractPriceRange(text);

        if (min !== null && max !== null) {
          products = products.filter(
            (p: any) => p.price >= min && p.price <= max
          );
        } else if (max !== null) {
          products = products.filter((p: any) => p.price <= max);
        }

        // random 5 sản phẩm
        products = products.sort(() => 0.5 - Math.random()).slice(0, 5);

        return {
          type: "bot",
          text: "🤖 Đây là sản phẩm tớ recommend cho cậu:",
          products,
          showActions: true,
        };
      } catch (err) {
        return {
          type: "bot",
          text: "Không recommend được 😢",
        };
      }
    }

    // SẢN PHẨM BÁN CHẠY
    if (
      lower.includes("bán chạy") ||
      lower.includes("hot") ||
      lower.includes("best seller")
    ) {
      try {
        const res = await api.product.getProductTrending();

        const products = res.data.slice(0, 5);

        return {
          type: "bot",
          text: "🔥 Đây là 5 sản phẩm bán chạy nhất:",
          products,
          showActions: true,
        };
      } catch (err) {
        return { type: "bot", text: "Không load được sản phẩm bán chạy 😢" };
      }
    }

    // Sản phẩm mới 

    if (
      lower.includes("mới") ||
      lower.includes("mới nhất") ||
      lower.includes("new")
    ) {
      try {
        const res = await api.product.getAllProduct(1, 50, {
          name: "",
          categoryId: [],
        });

        const products = res.data.data
          .sort((a: any, b: any) => b.id - a.id)
          .slice(0, 5);

        return {
          type: "bot",
          text: "🆕 Đây là 5 sản phẩm mới nhất:",
          products,
          showActions: true,
        };
      } catch (err) {
        return { type: "bot", text: "Không load được sản phẩm mới 😢" };
      }
    }

    if (
      lower === "hg" ||
      lower === "rg" ||
      lower === "mg" ||
      lower === "pg" ||
      lower === "figure"
    ) {
      try {
        const res = await api.product.getAllProduct(1, 100, {
          name: "",
          categoryId: [],
        });

        let products: ProductResponse[] = res.data.data;

        products = products.filter((p) =>
          p.name.toLowerCase().includes(lower)
        );

        // random 5 sản phẩm
        products = products
          .sort(() => Math.random() - 0.5)
          .slice(0, 5);

        return {
          type: "bot",
          text: `🔥 Gợi ý 5 sản phẩm ${lower.toUpperCase()} cho bạn:`,
          products,
          showActions: true,
        };
      } catch (err) {
        return {
          type: "bot",
          text: "Không load được sản phẩm 😢",
        };
      }
    }
    if (
      lower.includes("dưới") ||
      lower.includes("giá") ||
      lower.includes("từ") ||
      lower.includes("đến")
    ) {
      const { min, max } = extractPriceRange(text);

      try {
        const res = await api.product.getAllProduct(1, 20, {
          name: "",
          categoryId: [],
        });

        let products: ProductResponse[] = res.data.data;

        const words = lower.split(" ");

        // lọc loại
        if (words.includes("hg")) {
          products = products.filter((p) =>
            p.name.toLowerCase().includes("hg")
          );
        }

        if (words.includes("rg")) {
          products = products.filter((p) =>
            p.name.toLowerCase().includes("rg")
          );
        }

        if (words.includes("mg")) {
          products = products.filter((p) =>
            p.name.toLowerCase().includes("mg")
          );
        }

        if (words.includes("pg")) {
          products = products.filter((p) =>
            p.name.toLowerCase().includes("pg")
          );
        }

        if (words.includes("figure")) {
          products = products.filter((p) =>
            p.name.toLowerCase().includes("figure")
          );
        }

        // lọc giá
        if (min !== null && max !== null) {
          products = products.filter(
            (p) => p.price >= min && p.price <= max
          );
        } else if (max !== null) {
          products = products.filter(
            (p) => p.price <= max
          );
        }

        return {
          type: "bot",
          text:
            min !== null && max !== null
              ? `Tìm thấy ${products.length} sản phẩm từ ${min}đ đến ${max}đ`
              : `Tìm thấy ${products.length} sản phẩm dưới ${max}đ`,
          products,
          showActions: true,
        };
      } catch (err) {
        return { type: "bot", text: "Lỗi load sản phẩm 😢" };
      }
    }

    // 🔥 FAQ
    let bestMatch: FAQ | null = null;
    let bestScore = 0;

    for (let item of faq) {
      const a = normalize(text);
      const b = normalize(item.question);

      const distance = levenshtein(a, b);
      const maxLen = Math.max(a.length, b.length);
      const similarity = 1 - distance / maxLen;

      if (similarity > bestScore) {
        bestScore = similarity;
        bestMatch = item;
      }
    }

    if (bestMatch && bestScore > 0.5) {
      return { type: "bot", text: bestMatch.answer };
    }

    for (let item of faq) {
      if (matchAdvanced(text, item.question)) {
        return { type: "bot", text: item.answer };
      }
    }

    return { type: "bot", text: "Tớ bị ngốc, phiền cậu chat dài hơn và chi tiết hơn nhé !" };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: "user", text: input };
    saveUserInterest(input);//lưu input
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botMessage = await handleBotResponse(input);
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="chatbox-container">
      <div
        className="chat-button"
        onClick={() => {
          setOpen(true);
          setMinimized(false);

          setTimeout(() => {
            if (bodyRef.current) {
              bodyRef.current.scrollTop =
                scrollPosition.current;
            }
          }, 50);
        }}
      >
        💬
      </div>

      {open && !minimized && (
        <div className="chatbox" ref={chatRef}>
          <div className="chat-header">Chat hỗ trợ</div>

          <div className="chat-body" ref={bodyRef}>
            {showOptions ? (
              <div className="chat-options">
                <p>Bạn muốn hỏi gì?</p>

                {/* 🔥 OPTION MỚI */}
                <Button
                  block
                  onClick={() => {
                    navigate("/dashboard");
                    setMinimized(true);
                  }}
                >
                  🏠 Về trang chủ
                </Button>

                <Button
                  block
                  onClick={() => {
                    navigate("/cart");
                    setMinimized(true);
                  }}
                >
                  🛒 Xem giỏ hàng
                </Button>
                <p>Bạn muốn liên hệ qua đâu?</p>

                <Button block onClick={() => window.open("https://www.facebook.com/nguyen.sao.169/")}>
                  💬 Messenger
                </Button>

                <Button block onClick={() => window.open("https://zalo.me/0384167340")}>
                  📱 Zalo
                </Button>

                <Button type="link" onClick={() => setShowOptions(false)}>
                  Chat với bot
                </Button>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`msg ${msg.type}`}>
                  {msg.text}

                  {msg.products && (
                    <div className="chat-products">
                      {msg.products.map((p) => (
                        <div
                          key={p.id}
                          className="chat-product-item"
                          onClick={() => {
                            if (bodyRef.current) {
                              scrollPosition.current = bodyRef.current.scrollTop;
                            }

                            setMinimized(true);

                            setTimeout(() => {
                              navigate("/category", {
                                state: { productId: p.id },
                              });
                            }, 100);
                          }}
                        >
                          <img src={p.image} />
                          <div>{p.name}</div>
                          <div>{p.price}đ</div>
                        </div>
                      ))}

                      {/* 🔥 OPTION NÚT */}
                      {msg.showActions && (
                        <div className="chat-actions">
                          <Button
                            block
                            onClick={() => {
                              navigate("/dashboard");
                              setMinimized(true);
                            }}
                          >
                            🏠 Về trang chủ
                          </Button>

                          <Button
                            block
                            onClick={() => {
                              navigate("/cart");
                              setMinimized(true);
                            }}
                          >
                            🛒 Xem giỏ hàng
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {!showOptions && (
            <div className="chat-input">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={handleSend}
                placeholder="Hỏi gì đó..."
              />
              <Button onClick={handleSend}>Gửi</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
