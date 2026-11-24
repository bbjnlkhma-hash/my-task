const brands = {
  "Amazon Dashboard": ["#ff9900", "a"],
  Microsoft: ["#00a4ef", "M"],
  Apple: ["#000000", "A"],
  "Facebook Dashboard": ["#1877f2", "f"],
  Netflix: ["#e50914", "N"],
  Nvidia: ["#76b900", "N"],
  Behance: ["#0057ff", "Bē"],
  "Google Dashboard": ["#ea4335", "G"],
  "Grab Map App": ["#00b14f", "g"],
  Lego: ["#d01012", "L"],
};

export default function Logo({ name }) {
  let [bg, ch] = brands[name] || [null, name[0]?.toUpperCase() || "?"];
  if (!bg) {
    let h = 0;
    for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360;
    bg = `hsl(${h} 60% 45%)`;
  }
  return <span className="plogo" style={{ background: bg }}>{ch}</span>;
}
