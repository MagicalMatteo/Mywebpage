// RotatingFieldForm.tsx

import RotatingCards from "../components/RotatingCard";

const items = [
  { title: "Overview", content: <div>Summary content…</div> },
  { title: "Details", content: <div>Details content…</div> },
  { title: "Next Steps", content: <div>Action items…</div> },
];


export default function RotatingFieldForm() {
  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <RotatingCards
        items={items}
        autoRotate
        rotateIntervalMs={4000}
        loop
        height={320}
      />
    </div>
  );
}
