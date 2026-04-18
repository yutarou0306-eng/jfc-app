import { useState } from "react";

const LOGO_URL = "/logo.jpg";

const members = [
  { id: 1, name: "田中 太郎", name_roman: "TANAKA TARO", grade: "小4", position: "FW", parent_name: "田中 一郎", emergency_phone: "090-1234-5678", coach: false, paid: true },
  { id: 2, name: "佐藤 健", name_roman: "SATO KEN", grade: "小5", position: "MF", parent_name: "佐藤 誠", emergency_phone: "090-2345-6789", coach: false, paid: true },
  { id: 3, name: "鈴木 翼", name_roman: "SUZUKI TSUBASA", grade: "小3", position: "GK", parent_name: "鈴木 浩二", emergency_phone: "090-3456-7890", coach: true, paid: false },
  { id: 4, name: "高橋 蓮", name_roman: "TAKAHASHI REN", grade: "小6", position: "DF", parent_name: "高橋 勇", emergency_phone: "090-4567-8901", coach: false, paid: true },
];

const announcements = [
  { id: 1, title: "今週土曜日の練習について", body: "雨天中止の可能性があります。当日朝7時にLINEグループにてご連絡します。", important: true },
  { id: 2, title: "ユニフォーム注文締切のお知らせ", body: "4月20日までにサイズをコーチ宛にご連絡ください。", important: false },
];

const events = [
  { id: 1, title: "通常練習", event_date: "2026-04-19", event_time: "09:00", location: "○○小学校グラウンド", type: "練習" },
  { id: 2, title: "春季大会", event_date: "2026-05-03", event_time: "08:00", location: "市営サッカー場", type: "試合" },
  { id: 3, title: "親子サッカー大会", event_date: "2026-05-10", event_time: "10:00", location: "○○小学校グラウンド", type: "イベント" },
  { id: 4, title: "保護者会", event_date: "2026-05-15", event_time: "19:00", location: "地域センター会議室", type: "会議" },
];

const fees = [
  { id: 1, member_name: "田中 太郎", month: "4月", amount: 3000, paid: true },
  { id: 2, member_name: "佐藤 健", month: "4月", amount: 3000, paid: true },
  { id: 3, member_name: "鈴木 翼", month: "4月", amount: 3000, paid: false },
  { id: 4, member_name: "高橋 蓮", month: "4月", amount: 3000, paid: true },
];

// 日本代表ブルー
const JPN_BLUE = "#1a3a8f";
const JPN_BLUE_DARK = "#102570";
const JPN_BLUE_LIGHT = "#e8eef8";
const JPN_RED = "#cc0000";
const JPN_GOLD = "#b8952a";

const typeConfig = {
  練習: { bg: JPN_BLUE, text: "white", label: "TRAINING" },
  試合: { bg: JPN_RED, text: "white", label: "MATCH" },
  イベント: { bg: JPN_GOLD, text: "white", label: "EVENT" },
  会議: { bg: "#555", text: "white", label: "MEETING" },
};

const posColors = {
  FW: JPN_RED,
  MF: JPN_BLUE,
  DF: JPN_BLUE_DARK,
  GK: JPN_GOLD,
};

export default function JFCApp() {
  const [tab, setTab] = useState("home");
  const [search, setSearch] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [logoError, setLogoError] = useState(false);

  const tabs = [
    { id: "home", label: "HOME", icon: "🏠" },
    { id: "members", label: "部員", icon: "👥" },
    { id: "news", label: "NEWS", icon: "📢" },
    { id: "schedule", label: "日程", icon: "📅" },
    { id: "fees", label: "会費", icon: "💴" },
  ];

  const filteredMembers = members.filter(m =>
    m.name.includes(search) || m.grade.includes(search) || m.position.includes(search)
  );

  const paidCount = fees.filter(f => f.paid).length;

  return (
    <div style={{ fontFamily: "'Noto Sans JP', sans-serif", background: "#f4f6fb", minHeight: "100vh", display: "flex", flexDirection: "column", maxWidth: 420, margin: "0 auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Oswald:wght@600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: ${JPN_BLUE}; border-radius: 2px; }
        .card { background: white; border-radius: 8px; padding: 16px; box-shadow: 0 1px 6px rgba(26,58,143,0.07); }
        .tab-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 10px 2px 8px; border: none; background: transparent; cursor: pointer; transition: all 0.15s; }
        .tab-btn.active { color: ${JPN_BLUE}; }
        .tab-btn:not(.active) { color: #aab4cc; }
        .tab-label { font-size: 8px; font-weight: 700; letter-spacing: 0.06em; font-family: 'Oswald', sans-serif; }
        .tab-icon { font-size: 18px; }
        input[type=text] { outline: none; font-family: inherit; }
        .member-row { background: white; border-radius: 8px; padding: 14px 16px; box-shadow: 0 1px 6px rgba(26,58,143,0.07); display: flex; align-items: center; gap: 12px; border-left: 4px solid ${JPN_BLUE}; }
        .fee-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eef1f8; }
        .eng { font-family: 'Oswald', sans-serif; letter-spacing: 0.08em; }
        .stat-card { background: white; border-radius: 8px; padding: 16px; box-shadow: 0 1px 6px rgba(26,58,143,0.07); border-top: 3px solid ${JPN_BLUE}; }
      `}</style>

      {/* Header - 日本代表ブルーバナー */}
      <div style={{ background: JPN_BLUE, padding: "0 0 0 0", position: "relative", overflow: "hidden" }}>
        {/* ゴールドライン */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${JPN_GOLD}, ${JPN_GOLD} 80%, transparent)` }} />
        <div style={{ padding: "14px 20px 14px", display: "flex", alignItems: "center", gap: 14 }}>
          {/* ロゴ */}
          <div style={{ width: 52, height: 52, flexShrink: 0 }}>
            {!logoError ? (
              <img src={LOGO_URL} alt="JFC Logo" onError={() => setLogoError(true)}
                style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            ) : (
              <div style={{ width: 52, height: 52, background: "rgba(255,255,255,0.15)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>⚽</div>
            )}
          </div>
          {/* タイトル */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", fontWeight: 700, letterSpacing: "0.2em", fontFamily: "'Oswald', sans-serif" }}>MANILA JAPANESE FOOTBALL CLUB</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "white", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.05em", lineHeight: 1.1 }}>JFC MEMBERS</div>
          </div>
          {/* 日本国旗ミニ */}
          <div style={{ width: 32, height: 22, background: "white", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${JPN_GOLD}`, flexShrink: 0 }}>
            <div style={{ width: 10, height: 10, background: JPN_RED, borderRadius: "50%" }} />
          </div>
        </div>
        {/* サブナビ（タブ名表示） */}
        <div style={{ background: JPN_BLUE_DARK, padding: "8px 20px", display: "flex", gap: 4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ flex: 1, padding: "6px 2px", border: "none", borderRadius: 3, background: tab === t.id ? "white" : "transparent", color: tab === t.id ? JPN_BLUE : "rgba(255,255,255,0.5)", fontSize: 8, fontWeight: 700, fontFamily: "'Oswald', sans-serif", letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.15s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px", paddingBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>

        {/* HOME */}
        {tab === "home" && (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "部員", value: `${members.length}`, unit: "名", color: JPN_BLUE },
                { label: "部費", value: `${paidCount}/${fees.length}`, unit: "名", color: JPN_RED },
                { label: "NEWS", value: `${announcements.length}`, unit: "件", color: JPN_GOLD },
                { label: "試合情報", value: `${events.filter(e=>e.type==="試合").length}`, unit: "件", color: "#555" },
              ].map((s, i) => (
                <div key={i} style={{ background: "white", borderRadius: 8, padding: 16, boxShadow: "0 1px 6px rgba(26,58,143,0.07)", borderTop: `3px solid ${s.color}` }}>
                  <div className="eng" style={{ fontSize: 9, color: "#aab4cc", fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
                  <div className="eng" style={{ fontSize: 32, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}<span style={{ fontSize: 12, fontFamily: "'Noto Sans JP'" }}>{s.unit}</span></div>
                </div>
              ))}
            </div>

            {/* 重要お知らせ */}
            {announcements.filter(a => a.important).map(a => (
              <div key={a.id} style={{ background: "white", borderRadius: 8, padding: 14, borderLeft: `4px solid ${JPN_RED}`, boxShadow: "0 1px 6px rgba(26,58,143,0.07)" }}>
                <div className="eng" style={{ fontSize: 9, color: JPN_RED, fontWeight: 700, marginBottom: 4 }}>● IMPORTANT</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2a5a" }}>{a.title}</div>
              </div>
            ))}

            {/* 直近予定 */}
            <div className="card">
              <div className="eng" style={{ fontSize: 10, color: JPN_BLUE, fontWeight: 700, marginBottom: 12 }}>UPCOMING SCHEDULE</div>
              {events.slice(0, 3).map(e => {
                const d = new Date(e.event_date);
                const cfg = typeConfig[e.type] || typeConfig["練習"];
                return (
                  <div key={e.id} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "center" }}>
                    <div style={{ background: cfg.bg, minWidth: 44, height: 48, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div className="eng" style={{ fontSize: 20, fontWeight: 700, color: "white", lineHeight: 1 }}>{d.getDate()}</div>
                      <div className="eng" style={{ fontSize: 8, color: "rgba(255,255,255,0.8)" }}>{d.getMonth()+1}月</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="eng" style={{ fontSize: 9, color: cfg.bg, fontWeight: 700, marginBottom: 2 }}>{cfg.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2a5a" }}>{e.title}</div>
                      <div style={{ fontSize: 11, color: "#8899bb" }}>📍 {e.location}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* MEMBERS */}
        {tab === "members" && (
          <>
            <input type="text" placeholder="選手を検索..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: `1.5px solid ${JPN_BLUE_LIGHT}`, background: "white", fontSize: 14, color: "#1a2a5a", boxShadow: "0 1px 4px rgba(26,58,143,0.06)" }} />
            <div className="eng" style={{ fontSize: 9, color: "#aab4cc", fontWeight: 700 }}>{filteredMembers.length} PLAYERS</div>
            {filteredMembers.map((m, i) => (
              <div key={m.id} className="member-row" style={{ borderLeftColor: posColors[m.position] || JPN_BLUE }}>
                <div style={{ width: 42, height: 42, background: posColors[m.position] || JPN_BLUE, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="eng" style={{ fontSize: 16, fontWeight: 700, color: "white" }}>{String(i+1).padStart(2,"0")}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#1a2a5a" }}>{m.name}</span>
                    <span className="eng" style={{ background: posColors[m.position] || JPN_BLUE, color: "white", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3 }}>{m.position}</span>
                    {m.coach && <span className="eng" style={{ background: JPN_GOLD, color: "white", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3 }}>COACH</span>}
                  </div>
                  <div className="eng" style={{ fontSize: 10, color: "#8899bb" }}>{m.name_roman} · {m.grade}</div>
                  <div style={{ fontSize: 11, color: "#8899bb", marginTop: 2 }}>保護者: {m.parent_name}　📞 {m.emergency_phone}</div>
                </div>
                <div style={{ fontSize: 18 }}>{m.paid ? "✅" : "⏳"}</div>
              </div>
            ))}
          </>
        )}

        {/* NEWS */}
        {tab === "news" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {announcements.map(a => (
              <div key={a.id} onClick={() => setSelectedAnnouncement(selectedAnnouncement?.id === a.id ? null : a)}
                style={{ background: "white", borderRadius: 8, padding: 16, boxShadow: "0 1px 6px rgba(26,58,143,0.07)", borderLeft: `4px solid ${a.important ? JPN_RED : JPN_BLUE}`, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    {a.important && <div className="eng" style={{ fontSize: 9, color: JPN_RED, fontWeight: 700, marginBottom: 4 }}>● IMPORTANT</div>}
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2a5a" }}>{a.title}</div>
                  </div>
                  <span style={{ color: "#aab4cc", marginLeft: 8, fontSize: 14 }}>{selectedAnnouncement?.id === a.id ? "▲" : "▼"}</span>
                </div>
                {selectedAnnouncement?.id === a.id && (
                  <div style={{ marginTop: 12, fontSize: 13, color: "#4a5a7a", lineHeight: 1.8, borderTop: `1px solid ${JPN_BLUE_LIGHT}`, paddingTop: 12 }}>{a.body}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* SCHEDULE */}
        {tab === "schedule" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {events.map(e => {
              const d = new Date(e.event_date);
              const cfg = typeConfig[e.type] || typeConfig["練習"];
              const days = ["日","月","火","水","木","金","土"];
              return (
                <div key={e.id} style={{ background: "white", borderRadius: 8, padding: 14, boxShadow: "0 1px 6px rgba(26,58,143,0.07)", display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ background: cfg.bg, minWidth: 52, borderRadius: 6, padding: "10px 4px", textAlign: "center", flexShrink: 0 }}>
                    <div className="eng" style={{ fontSize: 24, fontWeight: 700, color: "white", lineHeight: 1 }}>{d.getDate()}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", fontWeight: 700 }}>（{days[d.getDay()]}）</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>{d.getMonth()+1}月</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="eng" style={{ fontSize: 9, color: cfg.bg, fontWeight: 700, marginBottom: 4 }}>{cfg.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1a2a5a" }}>{e.title}</div>
                    <div style={{ fontSize: 11, color: "#8899bb", marginTop: 2 }}>🕐 {e.event_time}　📍 {e.location}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FEES */}
        {tab === "fees" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ background: "white", borderRadius: 8, padding: 16, boxShadow: "0 1px 6px rgba(26,58,143,0.07)", borderTop: `3px solid ${JPN_BLUE}` }}>
                <div className="eng" style={{ fontSize: 9, color: "#aab4cc", fontWeight: 700, marginBottom: 4 }}>COLLECTED</div>
                <div className="eng" style={{ fontSize: 28, fontWeight: 700, color: JPN_BLUE, lineHeight: 1 }}>{paidCount}<span style={{ fontSize: 12, fontFamily: "'Noto Sans JP'" }}>名</span></div>
                <div style={{ fontSize: 11, color: JPN_BLUE, marginTop: 4 }}>¥{(paidCount*3000).toLocaleString()}</div>
              </div>
              <div style={{ background: "white", borderRadius: 8, padding: 16, boxShadow: "0 1px 6px rgba(26,58,143,0.07)", borderTop: `3px solid ${JPN_RED}` }}>
                <div className="eng" style={{ fontSize: 9, color: "#aab4cc", fontWeight: 700, marginBottom: 4 }}>PENDING</div>
                <div className="eng" style={{ fontSize: 28, fontWeight: 700, color: JPN_RED, lineHeight: 1 }}>{fees.length-paidCount}<span style={{ fontSize: 12, fontFamily: "'Noto Sans JP'" }}>名</span></div>
                <div style={{ fontSize: 11, color: JPN_RED, marginTop: 4 }}>¥{((fees.length-paidCount)*3000).toLocaleString()}</div>
              </div>
            </div>
            {/* プログレスバー */}
            <div style={{ background: "#eef1f8", borderRadius: 999, height: 6, overflow: "hidden" }}>
              <div style={{ width: `${(paidCount/fees.length)*100}%`, height: "100%", background: `linear-gradient(90deg, ${JPN_BLUE}, ${JPN_GOLD})`, borderRadius: 999, transition: "width 0.5s" }} />
            </div>
            <div className="card">
              <div className="eng" style={{ fontSize: 10, color: JPN_BLUE, fontWeight: 700, marginBottom: 12 }}>4月分 MEMBERSHIP FEE</div>
              {fees.map((f, i) => (
                <div key={i} className="fee-row">
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1a2a5a" }}>{f.member_name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: "#8899bb" }}>¥{f.amount.toLocaleString()}</span>
                    <span className="eng" style={{ fontSize: 9, fontWeight: 700, padding: "4px 10px", borderRadius: 3, background: f.paid ? JPN_BLUE_LIGHT : "#ffeaea", color: f.paid ? JPN_BLUE : JPN_RED, border: `1px solid ${f.paid ? JPN_BLUE : JPN_RED}` }}>{f.paid ? "PAID" : "PENDING"}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
