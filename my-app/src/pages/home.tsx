import { ProfilePage } from "../components/ProfilePage";
import { FadeIn } from "../components/FadeIn";
import { ImageBanner } from "../components/ImageBanner";
import chill from "../assets/programming-code-signs.png";

export const HomePage = () => {
  return (
    <ProfilePage>
      <ProfilePage.Section id="home">
        <ImageBanner text={
          <>
          <h1 className="text-4xl font-bold">Hi I'm Matteo</h1>
          <p className="text-lg opacity-80">Full-Stack Developer — React + Spring Boot</p>
          <p>Turning complex financial logic into clear, scalable architecture.</p>
          </>
        } imageUrl={chill} height="500px"/>

      </ProfilePage.Section>

      <ProfilePage.Section title="About Me" id="about">
        <FadeIn>I design software the same way I design UI—clean, modular, scalable.</FadeIn>
      </ProfilePage.Section>

      <ProfilePage.Section title="Core Strengths" id ="strengths">
        <ProfilePage.List>
          <ProfilePage.Item>Composite / config-driven component systems</ProfilePage.Item>
          <ProfilePage.Item>Domain-driven backend architecture</ProfilePage.Item>
          <ProfilePage.Item>Readable, scalable, long-life codebases</ProfilePage.Item>
          <ProfilePage.Item>UI/UX logic for high-complexity data flows</ProfilePage.Item>
        </ProfilePage.List>
      </ProfilePage.Section>

      <ProfilePage.Section title="Current Focus" >
        <pre className="bg-black/10 p-3 rounded-md text-sm">
{`🔍 Composite UI system for dynamic tables / lists
🛠 Collateral CRUD and Offer workflows
📦 Advanced React architecture patterns`}
        </pre>
      </ProfilePage.Section>

      <ProfilePage.Section title="Stack" id ="skills">
        <FadeIn>
         <div>
          Frontend: React, TS, MUI, RHF, Jotai <br/>
          Backend: Spring Boot, JPA, Liquibase <br/>
          DevOps: Docker, GitLab CI, Kubernetes
        </div>
        </FadeIn>
      </ProfilePage.Section>

      <ProfilePage.Section title="Contact" id="contact">
        GitHub • LinkedIn • Email
      </ProfilePage.Section>

    </ProfilePage>
  );
}