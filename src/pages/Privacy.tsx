import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seoConstants";

const PRIVACY_TITLE = "Privacy Policy | FOM Podcast";
const PRIVACY_DESC = "Privacy policy for the Future of Marketing podcast website by Graphite Growth.";
const PRIVACY_URL = `${SITE_URL}/privacy`;

const Privacy = () => {
  return (
    <>
    <Helmet>
      <title>{PRIVACY_TITLE}</title>
      <meta name="description" content={PRIVACY_DESC} />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href={PRIVACY_URL} />
      <meta property="og:title" content={PRIVACY_TITLE} />
      <meta property="og:description" content={PRIVACY_DESC} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:url" content={PRIVACY_URL} />
      <meta property="og:site_name" content="Future of Marketing" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={PRIVACY_TITLE} />
      <meta name="twitter:description" content={PRIVACY_DESC} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
    </Helmet>
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto container-padding max-w-3xl">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-foreground/50 mb-12">Last Updated: Jul 04, 2025</p>

        <div className="space-y-10 text-foreground/70 text-[15px] leading-relaxed">
          <p>
            This Privacy Notice is designed to help you understand how Graphite Growth, Inc. ("Graphite," "we," "us," or "our") collects, uses, and shares your personal information, and to help you understand and exercise your privacy rights.
          </p>

          <div className="border-t border-foreground/10 pt-2">
            <p className="text-foreground/40 text-xs uppercase tracking-widest mb-6">Table of Contents</p>
            <ol className="list-decimal pl-6 space-y-1 text-foreground/50 text-sm">
              <li>Scope & Updates To This Privacy Policy</li>
              <li>Personal Information We Collect</li>
              <li>How We Use Your Information</li>
              <li>How We Disclose Your Information</li>
              <li>Your Privacy Choices And Rights</li>
              <li>International Data Transfers</li>
              <li>Retention of Personal Information</li>
              <li>Children's Information</li>
              <li>Other Provisions</li>
              <li>Contact Us</li>
            </ol>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">1. Scope & Updates To This Privacy Policy</h2>
            <p>
              This Privacy Policy applies to personal information processed by us, including on our websites, and other online or offline offerings. To make this Privacy Policy easier to read, our websites, and other offerings are collectively called "Services."
            </p>
            <p className="mt-4">
              <strong className="text-foreground">An Important Note:</strong> This Privacy Policy does not apply to any of the personal information that our customers may collect and process using our Services ("Customer Data"). Our customers' respective privacy policies govern their collection and use of Customer Data. Our processing of Customer Data is governed by the contracts that we have in place with our customers, not this Privacy Policy.
            </p>
            <p className="mt-4">
              <strong className="text-foreground">Changes to our Privacy Policy:</strong> We may revise this Privacy Policy from time to time in our sole discretion. If there are any material changes, we will notify you as required by applicable law. You understand and agree that you will be deemed to have accepted the updated Privacy Policy if you continue to use our Services after the new Privacy Policy takes effect.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">2. Personal Information We Collect</h2>
            <p>The categories of personal information we collect depend on how you interact with us, our Services, and the requirements of applicable law.</p>

            <h3 className="font-display text-lg font-semibold text-foreground mt-6 mb-3">A. Information You Provide to Us Directly</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Creation.</strong> We may collect information when you create an account, such as your name, email address, username, and password.</li>
              <li><strong>Billing Information.</strong> We may collect personal information and details associated with payment for our services.</li>
              <li><strong>Your Communications with Us.</strong> We may collect personal information, such as email address, phone number, business name and its mailing address, when you request information about our Services, register for our newsletter, request support, or otherwise communicate with us.</li>
              <li><strong>Surveys.</strong> We may contact you to participate in surveys. If you decide to participate, you may be asked to provide certain information, which may include personal information.</li>
              <li><strong>Interactive Features.</strong> We, and others who use our Services, may collect personal information that you submit or make available through our interactive features (e.g., commenting functionalities, forums, blogs, and social media pages).</li>
              <li><strong>Conferences, Trade Shows, and Other Events.</strong> We may collect personal information from individuals when we attend or host conferences, trade shows, and other events.</li>
              <li><strong>Business Development and Strategic Partnerships.</strong> We may collect personal information from individuals and third parties to assess and pursue potential business opportunities.</li>
              <li><strong>Job Applications.</strong> We may post job openings and opportunities on our Services. If you reply to one of these postings, we will collect and use this information to assess your qualifications.</li>
            </ul>

            <h3 className="font-display text-lg font-semibold text-foreground mt-6 mb-3">B. Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Automatic Data Collection.</strong> We may collect certain information automatically when you use our Services, such as your Internet protocol (IP) address, user settings, MAC address, cookie identifiers, mobile carrier, mobile advertising and other unique identifiers, browser or device information, location information, and Internet service provider.</li>
              <li><strong>Cookies, Pixel Tags/Web Beacons, and Other Technologies.</strong> We, as well as third parties that provide content, advertising, or other functionality on our Services, may use cookies, pixel tags, and other technologies to automatically collect information through your use of our Services.</li>
            </ul>
            <p className="mt-4">Our uses of these Technologies fall into the following general categories:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Operationally Necessary.</strong> Technologies that allow you access to our Services, required to identify irregular behavior, prevent fraudulent activity, improve security, or allow you to make use of our functionality.</li>
              <li><strong>Performance-Related.</strong> We may use Technologies to assess the performance of our Services, including as part of our analytic practices.</li>
              <li><strong>Functionality-Related.</strong> Technologies that allow us to offer you enhanced functionality when accessing or using our Services.</li>
              <li><strong>Advertising- or Targeting-Related.</strong> We may use first party or third-party Technologies to deliver content, including ads relevant to your interests.</li>
              <li><strong>Analytics.</strong> We may use Technologies and other third-party tools to process analytics information on our Services, including Google Analytics.</li>
            </ul>

            <h3 className="font-display text-lg font-semibold text-foreground mt-6 mb-3">C. Information Collected from Other Sources</h3>
            <p>
              We may obtain information about you from other sources, including through third-party services and organizations. For example, if you access our Services through a third-party application, such as an app store, a third-party login service, or a social networking site, we may collect information about you from that third-party application that you have made available via your privacy settings.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <p>We use your information for a variety of business purposes, including to provide our Services, for administrative purposes, and to market our products and Services.</p>

            <h3 className="font-display text-lg font-semibold text-foreground mt-6 mb-3">A. Provide Our Services</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Managing your information and accounts</li>
              <li>Providing access to certain areas, functionalities, and features of our Services</li>
              <li>Answering requests for customer or technical support</li>
              <li>Communicating with you about your account, activities on our Services, and policy changes</li>
              <li>Processing your financial information and other payment methods</li>
              <li>Processing applications if you apply for a job</li>
              <li>Allowing you to register for events</li>
            </ul>

            <h3 className="font-display text-lg font-semibold text-foreground mt-6 mb-3">B. Administrative Purposes</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pursuing legitimate interests such as direct marketing, research, and development</li>
              <li>Detecting security incidents, protecting against malicious or fraudulent activity</li>
              <li>Measuring interest and engagement in our Services</li>
              <li>Improving, upgrading, or enhancing our Services</li>
              <li>Developing new products and services</li>
              <li>Ensuring internal quality control and safety</li>
              <li>Authenticating and verifying individual identities</li>
              <li>Debugging to identify and repair errors</li>
              <li>Enforcing our agreements and policies</li>
              <li>Carrying out activities required to comply with our legal obligations</li>
            </ul>

            <h3 className="font-display text-lg font-semibold text-foreground mt-6 mb-3">C. Marketing and Advertising</h3>
            <p>
              We may use personal information to tailor and provide you with content and advertisements. We may provide you with these materials as permitted by applicable law, including through email campaigns, custom audiences advertising, and "interest-based" or "personalized advertising."
            </p>

            <h3 className="font-display text-lg font-semibold text-foreground mt-6 mb-3">D. Other Purposes</h3>
            <p>
              We may use personal information and other information about you to create de-identified and/or aggregated information. De-identified and/or aggregated information is not personal information, and we may use, disclose, and retain such information as permitted by applicable laws.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">4. How We Disclose Your Information</h2>

            <h3 className="font-display text-lg font-semibold text-foreground mt-6 mb-3">A. Disclosures to Provide our Services</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers.</strong> We may share your personal information with our third-party service providers and vendors that assist us with the provision of our Services.</li>
              <li><strong>Business Partners.</strong> We may share your personal information with business partners to provide you with a product or service you have requested.</li>
              <li><strong>Affiliates.</strong> We may share your personal information with our company affiliates.</li>
              <li><strong>Advertising Partners.</strong> We may share your personal information with third-party advertising partners for purposes of delivering personalized advertisements.</li>
              <li><strong>APIs/SDKs.</strong> We may use third-party Application Program Interfaces ("APIs") and Software Development Kits ("SDKs") as part of the functionality of our Services.</li>
            </ul>

            <h3 className="font-display text-lg font-semibold text-foreground mt-6 mb-3">B. Disclosures to Protect Us or Others</h3>
            <p>
              We may access, preserve, and disclose any information we store associated with you to external parties if we, in good faith, believe doing so is required or appropriate to: comply with law enforcement or national security requests and legal process; protect your, our, or others' rights, property, or safety; enforce our policies or contracts; collect amounts owed to us; or assist with an investigation or prosecution of suspected or actual illegal activity.
            </p>

            <h3 className="font-display text-lg font-semibold text-foreground mt-6 mb-3">C. Disclosure in the Event of Merger, Sale, or Other Asset Transfers</h3>
            <p>
              If we are involved in a merger, acquisition, financing due diligence, reorganization, bankruptcy, receivership, purchase or sale of assets, or transition of service to another provider, your information may be sold or transferred as part of such a transaction, as permitted by law and/or contract.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">5. Your Privacy Choices And Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Email Communications.</strong> If you receive an unwanted email from us, you can use the unsubscribe link found at the bottom of the email to opt out of receiving future emails.</li>
              <li><strong>Text Messages.</strong> You may opt out of receiving text messages from us by following the instructions in the text message you have received from us or by otherwise contacting us.</li>
              <li><strong>"Do Not Track."</strong> Please note that we do not respond to or honor DNT signals or similar mechanisms transmitted by web browsers.</li>
              <li><strong>Cookies and Interest-Based Advertising.</strong> You may stop or restrict the placement of Technologies on your device or remove them by adjusting your preferences as your browser or device permits.</li>
            </ul>
            <p className="mt-4">
              <strong className="text-foreground">Your Privacy Rights.</strong> In accordance with applicable law, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access Personal Information about you</li>
              <li>Request Correction of your personal information where it is inaccurate or incomplete</li>
              <li>Request Deletion of your personal information</li>
              <li>Request Restriction of or Object to our processing of your personal information</li>
              <li>Withdraw your Consent to our processing of your personal information</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">6. International Data Transfers</h2>
            <p>
              All personal information processed by us may be transferred, processed, and stored anywhere in the world, including, but not limited to, the United States or other countries, which may have data protection laws that are different from the laws where you live. We endeavor to safeguard your personal information consistent with the requirements of applicable laws.
            </p>
            <p className="mt-4">
              If we transfer personal information which originates in the European Economic Area, Switzerland, and/or the United Kingdom to a country that has not been found to provide an adequate level of protection under applicable data protection laws, one of the safeguards we may use to support such transfer is the EU Standard Contractual Clauses.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">7. Retention of Personal Information</h2>
            <p>
              We store the personal information we collect as described in this Privacy Notice for as long as you use our Services, or as necessary to fulfill the purpose(s) for which it was collected, provide our Services, resolve disputes, establish legal defenses, conduct audits, pursue legitimate business purposes, enforce our agreements, and comply with applicable laws.
            </p>
            <p className="mt-4">
              To determine the appropriate retention period for personal information, we may consider applicable legal requirements, the amount, nature, and sensitivity of the personal information, certain risk factors, the purposes for which we process your personal information, and whether we can achieve those purposes through other means.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">8. Children's Information</h2>
            <p>
              The Services are not directed to children under 13 (or other age as required by local law), and we do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has uploaded personal information to our site without your consent, you may contact us as described in "Contact Us" below.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">9. Other Provisions</h2>
            <p>
              <strong className="text-foreground">Supervisory Authority.</strong> If your personal information is subject to the applicable data protection laws of the European Economic Area, Switzerland, or the United Kingdom, you have the right to lodge a complaint with the competent supervisory authority if you believe our processing of your personal information violates applicable law.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about our privacy practices or this Privacy Policy, or to exercise your rights as detailed in this Privacy Policy, please contact us at: <a href="mailto:privacy@graphitehq.com" className="underline hover:text-foreground transition-colors">privacy@graphitehq.com</a>.
            </p>
            <p className="mt-4">
              If you believe you've discovered a potential vulnerability, please let us know by emailing us at <a href="mailto:sec@graphitehq.com" className="underline hover:text-foreground transition-colors">sec@graphitehq.com</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
    </>
  );
};

export default Privacy;
