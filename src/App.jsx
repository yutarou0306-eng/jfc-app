import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";

const typeColors = {
  練習: { bg: "#e8f5e9", text: "#2e7d32" },
  試合: { bg: "#fce4ec", text: "#c62828" },
  イベント: { bg: "#e3f2fd", text: "#1565c0" },
  会議: { bg: "#fff8e1", text: "#e65100" },
};

export default function JFCApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("home");
  const [members, setMembers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [fees, setFees] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loading, setLoading] = useState(false);

  const ADMIN_ID = "jfc2026";
  const ADMIN_PASS = "soccer123";

  const tabs = [
    { id: "home", label: "ホーム", icon: "⚽" },
    { id: "members", label: "名簿", icon: "👥" },
    { id: "news", label: "お知らせ", icon: "📢" },
    { id: "schedule", label: "日程", icon: "📅" },
    { id: "fees", label: "会費", icon: "💴" },
  ];

  useEffect(() => {
    if (loggedIn) fetchAll();
  }, [loggedIn]);

  async function fetchAll() {
    setLoading(true);
    const [m, a, e, f] = await Promise.all([
      supabase.from("members").select("*"),
      supabase.from("announcements").select("*"),
      supabase.from("events").select("*").order("event_date"),
      supabase.from("fees").select("*"),
    ]);
    if (m.data) setMembers(m.data);
    if (a.data) setAnnouncements(a.data);
    if (e.data) setEvents(e.data);
    if (f.data) setFees(f.data);
    setLoading(false);
  }

  function handleLogin() {
    if (loginId === ADMIN_ID && loginPass === ADMIN_PASS) {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("IDまたはパスワードが違います");
    }
  }

  const filteredMembers = members.filter(m =>
    (m.name || "").includes(search) || (m.grade || "").includes(search)
  );

  const paidCount = fees.filter(f => f.paid).length;
  const totalAmount = paidCount * 3000;

  if (!loggedIn) {
    return (
      <div style={{ fontFamily: "'Noto Sans JP', sans-serif", background: "#f0f4f8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap');* { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
        <div style={{ background: "white", borderRadius: 20, padding: 32, width: "90%", maxWidth: 360, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 48 }}>⚽</div>
            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.1em", marginTop: 8 }}>JUNIOR FOOTBALL CLUB</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#1a6b3c", marginTop: 4 }}>JFC メンバーズ</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="text" placeholder="ID" value={loginId} onChange={e => setLoginId(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
            <input type="password" placeholder="パスワード" value={loginPass} onChange={e => setLoginPass(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ padding: "12px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
            {loginError && <div style={{ fontSize: 12, color: "#ef4444", textAlign: "center" }}>{loginError}</div>}
            <button onClick={handleLogin}
              style={{ background: "linear-gradient(135deg, #1a6b3c, #2d9d5c)", color: "white", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}>
              ログイン
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Noto Sans JP', sans-serif", background: "#f0f4f8", minHeight: "100vh", display: "flex", flexDirection: "column", maxWidth: 420, margin: "0 auto", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card { background: white; border-radius: 16px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .tab-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 10px 4px 8px; border: none; background: transparent; cursor: pointer; }
        .tab-btn.active { color: #1a6b3c; }
        .tab-btn:not(.active) { color: #94a3b8; }
        .tab-label { font-size: 10px; font-weight: 600; }
        .tab-icon { font-size: 20px; }
        .member-card { background: white; border-radius: 12px; padding: 14px 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); display: flex; align-items: center; gap: 14px; }
        .avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; flex-shrink: 0; }
        .fee-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
        input[type=text], input[type=password] { outline: none; font-family: inherit; }
      `}</style>

      <div style={{ background: "linear-gradient(135deg, #1a6b3c 0%, #2d9d5c 100%)", padding: "20px 20px 16px", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: "0.1em", fontWeight: 600 }}>JUNIOR FOOTBALL CLUB</div>
            <div style={{ fontSize: 22, fontWeight: 900 }}>JFC メンバーズ</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 36 }}>⚽</div>
            <button onClick={() => setLoggedIn(false)} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", fontSize: 11, fontWeight: 700, padding: "6px 10px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>ログアウト</button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px", paddingBottom: 80, display: "flex", flexDirection: "column", gap: 12 }}>
        {loading && <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>読み込み中...</div>}

        {!loading && tab === "home" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "登録メンバー", value: `${members.length}名`, icon: "👦", color: "#e8f5e9", accent: "#1a6b3c" },
                { label: "今月の集金", value: `${paidCount}/${fees.length}名`, icon: "💴", color: "#fff3e0", accent: "#e65100" },
                { label: "お知らせ", value: `${announcements.length}件`, icon: "📢", color: "#e3f2fd", accent: "#1565c0" },
                { label: "直近イベント", value: `${events.length}件`, icon: "📅", color: "#fce4ec", accent: "#c62828" },
              ].map((s, i) => (
                <div key={i} className="card" style={{ background: s.color }}>
                  <div style={{ fontSize: 22 }}>{s.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: s.accent, marginTop: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            {announcements.filter(a => a.important).map(a => (
              <div key={a.id} className="card" style={{ borderLeft: "4px solid #ef4444", background: "#fff5f5" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", marginBottom: 4 }}>🔴 重要</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{a.title}</div>
              </div>
            ))}
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a6b3c", marginBottom: 12 }}>📅 直近の予定</div>
              {events.slice(0, 3).map(e => {
                const d = new Date(e.event_date);
                const c = typeColors[e.type] || typeColors["練習"];
                return (
                  <div key={e.id} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                    <div style={{ minWidth: 48, textAlign: "center", background: "#f8fafc", borderRadius: 10, padding: "6px 4px" }}>
                      <div style={{ fontSize: 10, color: "#94a3b8" }}>{d.getMonth()+1}月</div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#1e293b" }}>{d.getDate()}</div>
                    </div>
                    <div>
                      <span style={{ background: c.bg, color: c.text, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999 }}>{e.type}</span>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginTop: 2 }}>{e.title}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>📍 {e.location}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!loading && tab === "members" && (
          <>
            <input type="text" placeholder="🔍  名前・学年で検索" value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, background: "white", color: "#1e293b" }} />
            <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{filteredMembers.length}名</div>
            {filteredMembers.map((m, i) => {
              const colors = ["#bbf7d0","#bfdbfe","#fde68a","#fecaca","#ddd6fe","#fed7aa"];
              const textColors = ["#14532d","#1e3a8a","#78350f","#7f1d1d","#4c1d95","#7c2d12"];
              return (
                <div key={m.id} className="member-card">
                  <div className="avatar" style={{ background: colors[i%6], color: textColors[i%6] }}>{(m.name||"?")[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{m.name_roman} ・ {m.grade}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>保護者: {m.parent_name}　📞 {m.emergency_phone}</div>
                  </div>
                  <div style={{ fontSize: 16 }}>{m.coach ? "🎽" : ""}{m.paid ? "✅" : "⏳"}</div>
                </div>
              );
            })}
          </>
        )}

        {!loading && tab === "news" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {announcements.map(a => (
              <div key={a.id} className="card" style={{ cursor: "pointer", borderLeft: a.important ? "4px solid #ef4444" : "4px solid #e2e8f0" }}
                onClick={() => setSelectedAnnouncement(selectedAnnouncement?.id === a.id ? null : a)}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    {a.important && <span style={{ background: "#fce4ec", color: "#c62828", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999, marginRight: 6 }}>重要</span>}
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{a.title}</span>
                  </div>
                  <span style={{ color: "#94a3b8" }}>{selectedAnnouncement?.id === a.id ? "▲" : "▼"}</span>
                </div>
                {selectedAnnouncement?.id === a.id && (
                  <div style={{ marginTop: 12, fontSize: 13, color: "#475569", lineHeight: 1.7, borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>{a.body}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && tab === "schedule" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {events.map(e => {
              const d = new Date(e.event_date);
              const c = typeColors[e.type] || typeColors["練習"];
              const days = ["日","月","火","水","木","金","土"];
              return (
                <div key={e.id} className="card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ textAlign: "center", minWidth: 52 }}>
                    <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>{d.getMonth()+1}月</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: "#1e293b", lineHeight: 1 }}>{d.getDate()}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: d.getDay()===0?"#ef4444":d.getDay()===6?"#3b82f6":"#94a3b8" }}>（{days[d.getDay()]}）</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999 }}>{e.type}</span>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", marginTop: 4 }}>{e.title}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>🕐 {e.event_time}　📍 {e.location}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && tab === "fees" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div className="card" style={{ background: "#e8f5e9" }}>
                <div style={{ fontSize: 11, color: "#2e7d32", fontWeight: 700 }}>集金済み</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#1a6b3c" }}>{paidCount}<span style={{ fontSize: 14 }}>名</span></div>
                <div style={{ fontSize: 12, color: "#2e7d32" }}>¥{totalAmount.toLocaleString()}</div>
              </div>
              <div className="card" style={{ background: "#fce4ec" }}>
                <div style={{ fontSize: 11, color: "#c62828", fontWeight: 700 }}>未集金</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#c62828" }}>{fees.length - paidCount}<span style={{ fontSize: 14 }}>名</span></div>
                <div style={{ fontSize: 12, color: "#c62828" }}>¥{((fees.length-paidCount)*3000).toLocaleString()}</div>
              </div>
            </div>
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a6b3c", marginBottom: 12 }}>会費一覧</div>
              {fees.map((f, i) => (
                <div key={i} className="fee-row">
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{f.member_name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, color: "#64748b" }}>{f.month}　¥{(f.amount||0).toLocaleString()}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: f.paid?"#e8f5e9":"#fce4ec", color: f.paid?"#1a6b3c":"#c62828" }}>{f.paid?"✓ 済":"未納"}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 420, background: "white", borderTop: "1px solid #e2e8f0", display: "flex", paddingBottom: 4 }}>
        {tabs.map(t => (
          <button key={t.id} className={`tab-btn${tab===t.id?" active":""}`} onClick={() => setTab(t.id)}>
            <span className="tab-icon">{t.icon}</span>
            <span className="tab-label">{t.label}</span>
            {tab===t.id && <div style={{ width: 20, height: 3, background: "#1a6b3c", borderRadius: 999, marginTop: 2 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
