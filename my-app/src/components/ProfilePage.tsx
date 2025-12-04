import "../styles/ProfilePage.css"; //  🔥 NEW import – nothing else removed
import { Glass } from "./Glass";

export const ProfilePage = ({ children }: { children: React.ReactNode }) => (
  <div className="profile-page min-h-screen w-full flex flex-col gap-14">
    {children}
  </div>
);

ProfilePage.Section = ({ children, title, id }: { title?: string; children: React.ReactNode; id?: string; }) => (
  <section className="profile-section grid gap-4" id ={id}>
    {title && <h2 className="profile-title text-2xl font-semibold tracking-tight">{title}</h2>}
    <div className="profile-content text-[15px] leading-relaxed opacity-90">{children}</div>
  </section>
);

ProfilePage.List = ({ children }: { children: React.ReactNode }) => (
  <ul className="profile-list flex flex-col gap-2">{children}</ul>
);

ProfilePage.Item = ({ children }: { children: React.ReactNode }) => (
  <li className="profile-item opacity-90">{children}</li>
);

ProfilePage.Card = ({ title, children }: any) => (
  <Glass className="profile-card">
    <h3 className="text-[18px] font-semibold mb-2 tracking-tight">{title}</h3>
    <div className="opacity-90 leading-relaxed text-[15px]">{children}</div>
  </Glass>
);
