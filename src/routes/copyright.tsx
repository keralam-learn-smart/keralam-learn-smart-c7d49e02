import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/copyright")({
  head: () => ({
    meta: [
      { title: "Copyright Policy — Traffic Tips" },
      {
        name: "description",
        content: "Copyright ownership and DMCA-style takedown process for Traffic Tips.",
      },
    ],
    links: [{ rel: "canonical", href: "https://keralam-learn-smart.lovable.app/copyright" }],
  }),
  component: () => (
    <LegalPage titleEn="Copyright Policy" titleMl="പകർപ്പവകാശ നയം">
      <p>
        All original text, design, layout, illustrations and code on Traffic Tips are ©{" "}
        {new Date().getFullYear()} Traffic Tips and protected by Indian and international copyright
        law.
      </p>
      <p>
        Traffic signs and signals shown on this site are based on publicly available Government of
        India standards (Motor Vehicles Act, IRC and Kerala MVD references) and remain the property
        of their respective owners.
      </p>
      <h2>Permitted use</h2>
      <ul>
        <li>Personal, non-commercial study for the Kerala RTO learner licence exam.</li>
        <li>Sharing links to our pages.</li>
      </ul>
      <h2>Not permitted</h2>
      <ul>
        <li>Copying our questions, explanations or content into another website or app.</li>
        <li>Removing watermarks or attributions.</li>
      </ul>
      <h2>Report infringement</h2>
      <p>
        If you believe content on Traffic Tips infringes your copyright, email us via the Contact
        page with the URL, a description of the work and proof of ownership. Verified claims are
        actioned within 7 working days.
      </p>
    </LegalPage>
  ),
});
