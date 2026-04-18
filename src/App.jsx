import { useState } from "react";

const initialMembers = [
  { id: 1, name: "田中 太郎", grade: "小4", position: "FW", phone: "090-1234-5678", parent: "田中 一郎", paid: true },
  { id: 2, name: "佐藤 健", grade: "小5", position: "MF", phone: "090-2345-6789", parent: "佐藤 誠", paid: true },
  { id: 3, name: "鈴木 翼", grade: "小3", position: "GK", phone: "090-3456-7890", parent: "鈴木 浩二", paid: false },
  { id: 4, name: "高橋 蓮", grade: "小6", position: "DF", phone: "090-4567-8901", parent: "高橋 勇", paid: true },
  { id: 5, name: "伊藤 陽太", grade: "小4", position: "MF", phone: "090-5678-9012", parent: "伊藤 幸雄", paid: false },
  { id: 6, name: "渡辺 悠斗", grade: "小5", position: "DF", phone: "090-6789-0123", parent: "渡辺 隆", paid: true },
];

const initialAnnouncements = [
  { id: 1, title: "今週土曜日の練習について", body: "雨天中止の可能性があります。当日朝7時にLINEグループにてご連絡します。", date: "2026-04-14", important: true },
  { id: 2, title: "ユニフォーム注文締切のお知らせ", body: "4月20日までにサイズをコーチ宛にご連絡ください。", date: "2026-04-12", important: false },
  { id: 3, title: "春季大会エントリー完了", body: "5月3日（日）の春季大会にエントリーしました。詳細は別途お知らせします。", date: "2026-04-10", important: false },
];

const initialEvents = [
  { id: 1, title: "通常練習", date: "2026-04-19", time: "09:00", location: "○○小学校グラウンド", type: "練習" },
  { id: 2, title: "通常練習", date: "2026-04-26", time: "09:00", location: "○○小学校グラウンド", type: "練習" },
  { id: 3, title: "春季大会", date: "2026-05-03", time: "08:00", location: "市営サッカー場", type: "試合" },
  { id: 4, title: "親子サッカー大会", date: "2026-05-10", time: "10:00", location: "○○小学校グラウンド", type: "イベント" },
  { id: 5, title: "保護者会", date: "2026-05-15", time: "19:00", location: "地域センター会議室", type: "会議" },
];

const feeData = [
  { name: "田中 太郎", month: "4月", amount: 3000, paid: true },
  { name: "佐藤 健", month: "4月", amount: 3000, paid: true },
  { name: "鈴木 翼", month: "4月", amount: 3000, paid: false },
  { name: "高橋 蓮", month: "4月", amount: 3000, paid: true },
  { name: "伊藤 陽太", month: "4月", amount: 3000, paid: false },
  { name: "渡辺 悠斗", month: "4月", amount: 3000, paid: true },
];

const typeColors = {
  練習: { bg: "#e8f5e9", text: "#2e7d32", dot: "#4caf50" },
  試合: { bg: "#fce4ec", text: "#c62828", dot: "#ef5350" },
  イベント: { bg: "#e3f2fd", text: "#1565c0", dot: "#42a5f5" },
  会議: { bg: "#fff8e1", text: "#e65100", dot: "#ffa726" },
};

export default function JFCApp() {
  const [tab, setTab] = useState("home");
  const [members] = useState(initialMembers);
  const [announcements] = useState(initialAnnouncements);
  const [events] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const tabs = [
    { id: "home", label: "ホーム", icon: "⚽" },
    { id: "members", label: "名簿", icon: "👥" },
    { id: "news", label: "お知らせ", icon: "📢" },
    { id: "schedule", label: "日程", icon: "📅" },
    { id: "fees", label: "会費", icon: "💴" },
  ];

  const filteredMembers = members.filter(m =>
    m.name.includes(search) || m.grade.includes(search) || m.position.includes(search)
  );

  const paidCount = feeData.filter(f => f.paid).length;
  const totalAmount = feeData.filter(f => f.paid).length * 3000;

  return (
    <div style={{ fontFamily: "'Noto Sans JP', sans-serif", background: "#f0f4f8", minHeight: "100vh", display: "flex", flexDirection: "column", maxWidth: 420, margin: "0 auto", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
        .card { background: white; border-radius: 16px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .tab-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 10px 4px 8px; border: none; background: transparent; cursor: pointer; transition: all 0.15s; }
        .tab-btn.active { color: #1a6b3c; }
        .tab-btn:not(.active) { color: #94a3b8; }
        .tab-label { font-size: 10px; font-weight: 600; letter-spacing: 0.02em; }
        .tab-icon { font-size: 20px; }
        .badge { background: #1a6b3c; color: white; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 999px; }
        .badge-red { background: #ef4444; }
        input[type=text] { outline: none; font-family: inherit; }
        .member-card { background: white; border-radius: 12px; padding: 14px 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); display: flex; align-items: center; gap: 14px; }
        .avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; flex-shrink: 0; }
        .event-row { display: flex; gap: 12px; align-items: flex-start; }
        .event-date-box { min-width: 48px; text-align: center; background: white; border-radius: 10px; padding: 6px 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .fee-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
        .btn { border: none; cursor: pointer; font-family: inherit; font-weight: 700; border-radius: 10px; transition: all 0.15s; }
        .btn:active { transform: scale(0.97); }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 100; display: flex; align-items: flex-end; }
        .modal { background: white; width: 100%; max-width: 420px; margin: 0 auto; border-radius: 20px 20px 0 0; padding: 24px; max-height: 70vh; overflow-y: auto; }
      `}</style>

      <div style={{ background: "linear-gradient(135deg, #1a6b3c 0%, #2d9d5c 100%)", padding: "20px 20px 16px", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: "0.1em", fontWeight: 600 }}>JUNIOR FOOTBALL CLUB</div>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.01em" }}>JFC メンバーズ</div>
          </div>
          <div style={{ fontSize: 36 }}>⚽</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px", paddingBottom: 80, display: "flex", flexDirection: "column", gap: 12 }}>

        {tab === "home" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "登録メンバー", value: `${members.length}名`, icon: "👦", color: "#e8f5e9", accent: "#1a6b3c" },
                { label: "今月の集金", value: `${paidCount}/${feeData.length}名`, icon: "💴", color: "#fff3e0", accent: "#e65100" },
                { label: "直近イベント", value: "春季大会", icon: "🏆", color: "#fce4ec", accent: "#c62828" },
                { label: "お知らせ", value: `${announcements.length}件`, icon: "📢", color: "#e3f2fd", accent: "#1565c0" },
              ].map((s, i) => (
                <div key={i} className="card" style={{ background: s.color }}>
                  <div style={{ fontSize: 22 }}>{s.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: s.accent, marginTop: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {announcements.filter(a => a.important).map(a => (
              <div key={a.id} className="card" style={{ borderLeft: "4px solid #ef4444", background: "#fff5f5", cursor: "pointer" }} onClick={() => { setSelectedAnnouncement(a); setTab("news"); }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#ef4444" }}>🔴 重要</span>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>{a.date}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{a.title}</div>
              </div>
            ))}

            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a6b3c", marginBottom: 12 }}>📅 直近の予定</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {events.slice(0, 3).map(e => {
                  const d = new Date(e.date);
                  const c = typeColors[e.type];
                  return (
                    <div key={e.id} className="event-row">
                      <div className="event-date-box">
                        <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{d.getMonth()+1}月</div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: "#1e293b" }}>{d.getDate()}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                          <span style={{ background: c.bg, color: c.text, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999 }}>{e.type}</span>
                          <span style={{ fontSize: 11, color: "#94a3b8" }}>{e.time}〜</span>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{e.title}</div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>📍 {e.location}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {tab === "members" && (
          <>
            <input
              type="text"
              placeholder="🔍  名前・学年・ポジションで検索"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, background: "white", color: "#1e293b" }}
            />
            <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{filteredMembers.length}名</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredMembers.map((m, i) => {
                const colors = ["#bbf7d0","#bfdbfe","#fde68a","#fecaca","#ddd6fe","#fed7aa"];
                const textColors = ["#14532d","#1e3a8a","#78350f","#7f1d1d","#4c1d95","#7c2d12"];
                return (
                  <div key={m.id} className="member-card">
                    <div className="avatar" style={{ background: colors[i % 6], color: textColors[i % 6] }}>
                      {m.name[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{m.name}</span>
                        <span style={{ background: "#f1f5f9", color: "#64748b", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 6 }}>{m.position}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{m.grade} ・ 保護者: {m.parent}</div>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>📞 {m.phone}</div>
                    </div>
                    <div style={{ fontSize: 18 }}>{m.paid ? "✅" : "⏳"}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === "news" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {announcements.map(a => (
              <div key={a.id} className="card" style={{ cursor: "pointer", borderLeft: a.important ? "4px solid #ef4444" : "4px solid #e2e8f0" }}
                onClick={() => setSelectedAnnouncement(selectedAnnouncement?.id === a.id ? null : a)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 5 }}>
                      {a.important && <span style={{ background: "#fce4ec", color: "#c62828", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999 }}>重要</span>}
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>{a.date}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{a.title}</div>
                  </div>
                  <span style={{ color: "#94a3b8", fontSize: 18, marginLeft: 8 }}>{selectedAnnouncement?.id === a.id ? "▲" : "▼"}</span>
                </div>
                {selectedAnnouncement?.id === a.id && (
                  <div style={{ marginTop: 12, fontSize: 13, color: "#475569", lineHeight: 1.7, borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
                    {a.body}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "schedule" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {events.map(e => {
              const d = new Date(e.date);
              const c = typeColors[e.type];
              const days = ["日","月","火","水","木","金","土"];
              return (
                <div key={e.id} className="card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ textAlign: "center", minWidth: 52 }}>
                    <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>{d.getMonth()+1}月</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: "#1e293b", lineHeight: 1 }}>{d.getDate()}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: d.getDay() === 0 ? "#ef4444" : d.getDay() === 6 ? "#3b82f6" : "#94a3b8" }}>（{days[d.getDay()]}）</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999 }}>{e.type}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{e.title}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>🕐 {e.time}　📍 {e.location}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "fees" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div className="card" style={{ background: "#e8f5e9" }}>
                <div style={{ fontSize: 11, color: "#2e7d32", fontWeight: 700 }}>集金済み</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#1a6b3c" }}>{paidCount}<span style={{ fontSize: 14 }}>名</span></div>
                <div style={{ fontSize: 12, color: "#2e7d32" }}>¥{totalAmount.toLocaleString()}</div>
              </div>
              <div className="card" style={{ background: "#fce4ec" }}>
                <div style={{ fontSize: 11, color: "#c62828", fontWeight: 700 }}>未集金</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#c62828" }}>{feeData.length - paidCount}<span style={{ fontSize: 14 }}>名</span></div>
                <div style={{ fontSize: 12, color: "#c62828" }}>¥{((feeData.length - paidCount) * 3000).toLocaleString()}</div>
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a6b3c", marginBottom: 4 }}>4月分 会費（¥3,000/名）</div>
              <div style={{ width: "100%", background: "#f1f5f9", borderRadius: 999, height: 8, marginBottom: 12 }}>
                <div style={{ width: `${(paidCount / feeData.length) * 100}%`, background: "linear-gradient(90deg, #1a6b3c, #2d9d5c)", height: "100%", borderRadius: 999, transition: "width 0.5s" }} />
              </div>
              {feeData.map((f, i) => (
                <div key={i} className="fee-row">
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{f.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, color: "#64748b" }}>¥{f.amount.toLocaleString()}</span>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
                      background: f.paid ? "#e8f5e9" : "#fce4ec",
                      color: f.paid ? "#1a6b3c" : "#c62828"
                    }}>{f.paid ? "✓ 済" : "未納"}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 420, background: "white", borderTop: "1px solid #e2e8f0", display: "flex", paddingBottom: 4 }}>
        {tabs.map(t => (
          <button key={t.id} className={`tab-btn${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
            <span className="tab-icon">{t.icon}</span>
            <span className="tab-label">{t.label}</span>
            {tab === t.id && <div style={{ width: 20, height: 3, background: "#1a6b3c", borderRadius: 999, marginTop: 2 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
