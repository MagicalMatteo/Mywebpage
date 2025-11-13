import { ContactBar } from "./ContactBar";

export default function PortfolioHeader() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        padding: "2rem 1.5rem",
      }}
    >
   
        
      {/* Profile Image */}
      <img
        src="/your-image.jpg"
        alt="Profile"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      />

      {/* Title + Subtitle */}
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: 700,
          }}
        >
          Matteo Kronast
        </h1>
        <p
          style={{
            margin: "4px 0 0 0",
            opacity: 0.7,
            fontSize: "1rem",
          }}
        >
          Full-Stack Developer • React • TypeScript • Java
        </p>
      </div>
           <ContactBar/>
    </header>
  );
}
