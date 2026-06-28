import { SectionReveal } from "@/components/ui";
import { PageHeader } from "@/components/layout/PageHeader";
import { Shield, Database, Cookie, Mail, Users, FileText } from "lucide-react";

const sections = [
  {
    icon: Shield,
    title: "Who We Are",
    content: (
      <p>
        Threeways Birdwatch Homeowners Association (NPC) is the data controller for the Threeways Birdwatch
        security enclosure website. We are registered as a non-profit company with duly appointed directors.
        Our enclosure is bounded by Plover Street, Jacana Street, and Kestrel Avenue, Fourways, Sandton.
      </p>
    ),
  },
  {
    icon: Database,
    title: "Information We Collect",
    content: (
      <div className="space-y-4">
        <p>We collect and process the following information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Contact form submissions:</strong> name, email address, subject, and message content when you use the contact form on our website.</li>
          <li><strong>Incident reports:</strong> incident type, title, description, and location when you submit a report via the Safety page.</li>
          <li><strong>Admin-generated content:</strong> articles, notices, alerts, business listings, and resident profiles submitted by authorised administrators.</li>
          <li><strong>Browser storage data:</strong> website content and settings are stored locally in your browser using localStorage to enable offline functionality and content management.</li>
          <li><strong>Session data:</strong> a session cookie is set when you log into the admin area to maintain your authenticated session.</li>
        </ul>
      </div>
    ),
  },
  {
    icon: FileText,
    title: "How We Use Your Information",
    content: (
      <div className="space-y-4">
        <p>Your information is used for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To respond to enquiries submitted via the contact form.</li>
          <li>To manage and communicate community safety alerts and incident reports.</li>
          <li>To publish community news, notices, and announcements.</li>
          <li>To maintain the community directory and business listings.</li>
          <li>To administer the enclosure governance and resident communications.</li>
          <li>To ensure the security of the admin area through session authentication.</li>
        </ul>
      </div>
    ),
  },
  {
    icon: Database,
    title: "Legal Basis for Processing",
    content: (
      <p>
        We process your personal data on the following legal bases: (a) <strong>Consent</strong> &mdash; when you submit a contact form or incident report; (b) <strong>Legitimate interests</strong> &mdash; for community safety, security, and governance communications within the enclosure; and (c) <strong>Legal obligation</strong> &mdash; where required by applicable law.
      </p>
    ),
  },
  {
    icon: Cookie,
    title: "Cookies and Local Storage",
    content: (
      <div className="space-y-4">
        <p><strong>Cookies:</strong> We use a single cookie, <em>admin_session</em>, which is set only when you log into the admin panel. This cookie is httpOnly, same-site restricted, and expires after 24 hours. No tracking or analytics cookies are used.</p>
        <p><strong>LocalStorage:</strong> The website stores content data (articles, notices, alerts, incidents, and media settings) in your browser&apos;s localStorage under keys prefixed with <em>3wbw_</em>. This data remains on your device and is not transmitted to our servers. You can clear this data at any time through your browser settings.</p>
      </div>
    ),
  },
  {
    icon: Users,
    title: "Data Sharing and Third Parties",
    content: (
      <div className="space-y-4">
        <p>We do not sell, trade, or share your personal data with third parties for marketing purposes.</p>
        <p>The contact page embeds a Google Maps iframe to display our location. When you visit this page, Google may collect information as described in their privacy policy. The embed uses <em>referrerPolicy: no-referrer-when-downgrade</em>, meaning Google receives the URL of the page you are visiting.</p>
        <p>No other third-party services, analytics platforms, or tracking scripts are used on this website.</p>
      </div>
    ),
  },
  {
    icon: Shield,
    title: "Data Security",
    content: (
      <p>
        We implement appropriate technical measures to protect your data. The admin area is password-protected, sessions are managed via httpOnly cookies, and access to administrative functions is restricted to authorised users. However, no internet transmission is completely secure. You are responsible for keeping your login credentials confidential.
      </p>
    ),
  },
  {
    icon: FileText,
    title: "Data Retention",
    content: (
      <p>
        Contact form submissions and incident reports are stored locally in your browser and persist until you clear your browser data. Admin-generated content (articles, notices, alerts) remains in localStorage until actively deleted by an administrator. The admin session cookie expires after 24 hours.
      </p>
    ),
  },
  {
    icon: Users,
    title: "Your Rights",
    content: (
      <div className="space-y-4">
        <p>You have the following rights regarding your personal data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Access:</strong> request a copy of the data we hold about you.</li>
          <li><strong>Correction:</strong> request that we correct inaccurate data.</li>
          <li><strong>Deletion:</strong> request deletion of your data. For data stored in localStorage, you may clear it at any time via your browser settings.</li>
          <li><strong>Objection:</strong> object to the processing of your data where we rely on legitimate interests.</li>
          <li><strong>Withdrawal of consent:</strong> withdraw consent at any time where processing is based on consent.</li>
        </ul>
        <p>To exercise any of these rights, please contact us using the details below.</p>
      </div>
    ),
  },
  {
    icon: Mail,
    title: "Contact Us",
    content: (
      <div className="space-y-4">
        <p>If you have any questions about this privacy policy or wish to exercise your rights, please contact us:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Billing: <a href="mailto:billing@threewaysbirdwatch.org.za" className="text-forest hover:underline">billing@threewaysbirdwatch.org.za</a></li>
          <li>Chairperson: <a href="mailto:chairperson@threewaysbirdwatch.org.za" className="text-forest hover:underline">chairperson@threewaysbirdwatch.org.za</a></li>
          <li>Compliance: <a href="mailto:compliance@threewaysbirdwatch.org.za" className="text-forest hover:underline">compliance@threewaysbirdwatch.org.za</a></li>
          <li>Secretary: <a href="mailto:secretary@threewaysbirdwatch.org.za" className="text-forest hover:underline">secretary@threewaysbirdwatch.org.za</a></li>
          <li>Support: <a href="mailto:support@threewaysbirdwatch.org.za" className="text-forest hover:underline">support@threewaysbirdwatch.org.za</a></li>
        </ul>
      </div>
    ),
  },
];

export default function Privacy() {
  return (
    <>
      <PageHeader
        label="Legal"
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
      />

      <section className="py-6 border-b border-border">
        <div className="container max-w-3xl">
          <p className="text-sm text-muted">
            Last updated: 28 June 2026
          </p>
        </div>
      </section>

      <SectionReveal className="py-16">
        <div className="container max-w-3xl">
          <div className="space-y-12">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                    <div className="text-text-secondary leading-relaxed text-[15px]">
                      {section.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
