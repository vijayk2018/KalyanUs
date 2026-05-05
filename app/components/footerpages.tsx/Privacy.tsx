import React from 'react';
import { Link } from 'react-router';

export default function Privacy() {
    return (
        <div className="bg-white min-h-screen pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 font-sans text-[#222]">
            <div className="w-[80%] mx-auto">
                <div className="mb-6 text-[12px] sm:text-[13px] text-[#666]">
                    <Link to="/" className="hover:underline text-[#555]">
                        Home
                    </Link>
                    <span className="mx-2">{'>'}</span>
                    <span className="text-[#222]">KALYAN JEWELLERS PRIVACY POLICY</span>
                </div>

                {/* Header */}
                <h1 className="text-[17px] sm:text-[19px] md:text-[21px] font-medium text-center uppercase tracking-wide mb-2">
                    KALYAN JEWELLERS PRIVACY POLICY
                </h1>
                <p className="text-center text-[12px] sm:text-[13px] text-[#666] mb-8">
                    Last Updated: 25.10.2024
                </p>

                {/* Intro Paragraph */}
                <div className="text-[12px] sm:text-[13px] md:text-[14px] leading-[1.7] mb-6 space-y-4 break-words">
                    <p>
                        This Privacy Policy describes the types of Personal Information that Kalyan Jewellers and its subsidiaries and affiliated companies (“Kalyan Jewellers,” “we,” “our,” or “us”) collects from and about you, how we may use and disclose such information, and your choices and legal rights with respect to such information. We ask that you carefully review this Privacy Policy, as it applies to the websites (each a “Site”) and mobile applications (each an “App”) as well as the services owned, operated, and/or provided by Kalyan Jewellers that display or link to this Privacy Policy, including our offline locations (collectively, our “Services”).
                    </p>
                    <p>
                        By using our Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree, please do not use our Services.
                    </p>
                    <p>
                        For purposes of this Privacy Policy, “Personal Information” refers to information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, to you, and includes “personal data” or similar terms as defined in applicable law.</p>
                </div>

                {/* Section 1 */}
                <div className="mb-8">
                    <h2 className="text-[15px] md:text-[17px] font-bold mb-4">
                        1. Notice at Collection of Personal Information
                    </h2>
                    <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-[1.7] mb-6">
                        We collect the categories of Personal Information listed below. We “sell” or “share” (as those terms are defined in applicable law) some for marketing and advertising purposes to third parties, such as data analytics providers, advertising technology vendors, third-party advertising networks, and social media platforms.
                    </p>

                    {/* Table */}
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full border-collapse border border-gray-300 text-[12px] sm:text-[12.5px] md:text-[13px] leading-[1.6]">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-300">
                                    <th className="font-bold text-left p-4 border-r border-gray-300 w-[50%] align-top">
                                        A.Category of Personal Information Collected:
                                    </th>
                                    <th className="font-bold text-left p-4 border-r border-gray-300 w-[25%] align-top">
                                        Do we disclose the
                                        category for business purposes?
                                    </th>
                                    <th className="font-bold text-left p-4 w-[25%] align-top">
                                        Do we sell or
                                        share the category?
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold mb-1">Identifiers</p>
                                        <p className="text-[#555]">Identifiers/biographical information,</p>
                                        <p className="text-[#555]">including name, postal and email address, phone number, online identifiers, Internet Protocol (“IP”) address, and other similar identifiers.</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top">Yes.
                                        • Service providers
                                        and payment processors.</td>
                                    <td className="p-4 align-top">Yes.
                                        • Advertising and analytics partners.
                                        • Social media platforms.</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold mb-1">Personal information categories listed in the
                                            Customer Records statute, such as your credit or debit card number.</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top">Yes.
                                        • Service providers and payment processors.</td>
                                    <td className="p-4 align-top"> No.</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold">Characteristics of protected classifications under California or federal law</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top">Yes.
                                        • Service providers..</td>
                                    <td className="p-4 align-top"> No.</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold mb-1">Commercial information</p>
                                        <p className="text-[#555]">including items purchased, obtained, or considered and other purchasing or consuming histories or tendencies.</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top">Yes.
                                        • Service providers and payment processors.</td>
                                    <td className="p-4 align-top">Yes.
                                        • Advertising and analytics partners.</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold">Visual information</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top">Yes.
                                        • Service providers and security vendors.</td>
                                    <td className="p-4 align-top"> No.</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold mb-1">Internet or other electronic network activity information</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top">Yes.
                                        • Service providers.</td>
                                    <td className="p-4 align-top">Yes.
                                        • Advertising and analytics partners.</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold">Geolocation data (non-precise)</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top">No.</td>
                                    <td className="p-4 align-top"> No.</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold mb-1">Visual information</p>

                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top">Yes.
                                        • Service providers and security vendors.</td>
                                    <td className="p-4 align-top">No.</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold">Sensitive Personal Information, </p>
                                        <p className="text-[#555]">consisting of social security, driver’s license, state identification card, or passport number in certain circumstances. We do not use or disclose such information for the purpose of inferring characteristics about you or for any purpose other than the limited permissible purposes set forth in the regulations implementing California law. Such purposes include providing our Services and verifying, maintaining the quality of, and improving our Services.</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top"> No.</td>
                                    <td className="p-4 align-top">No.</td>
                                </tr>

                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold mb-1">Inferences, </p>
                                        <p className="text-[#555]">meaning inferences drawn from the above-listed categories of Personal Information to create a consumer profile reflecting consumer preferences or characteristics</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top">Yes.
                                        • Service providers.</td>
                                    <td className="p-4 align-top">Yes.
                                        • Advertising and analytics partners.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-[12px] sm:text-[13px] md:text-[14px] leading-[1.7] mb-6">
                        <p className="mb-2">* Exclusions:</p>
                        <p>
                            We do not knowingly sell or share Personal Information about individuals under the age of 18. Please click here <Link to="/opt-out" className="text-blue-600 hover:underline">to opt out</Link> of the sale or sharing of your Personal Information, including targeted advertising. You may also choose to enable online, where available, a universal tool that automatically communicates your opt-out preferences, such as the Global Privacy Control (“GPC”). We will process the GPC signal as a request to opt out.
                        </p>
                    </div>
                </div>

                {/* Remaining sections */}
                <div className="space-y-8 text-[12px] sm:text-[13px] md:text-[14px] leading-[1.7] break-words">
                    {/* Section 2 */}
                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">B. The Business and Commercial Purposes for Which We Collect and Use Your Personal Information:</h2>

                        <ul className="list-disc pl-6 space-y-4 mb-4 marker:text-[#333]">
                            <li>
                                <ul className="list-[circle] pl-6 mt-2 space-y-2">
                                    <li>To provide you with our Services.</li>
                                    <li> To process your payments and fulfill your orders.</li>
                                    <li>To create, maintain, customize, and secure your account with us.</li>
                                    <li>To communicate with you, such as through bots, including to respond to your inquiries/requests and request feedback from you, and to send you important updates and messages about changes to our Services, this Privacy Policy, and/or other applicable terms and conditions.</li>
                                    <li>To review the usage and maintain the operation of our Services.</li>
                                    <li>To conduct analysis and develop and/or improve our products and Services.</li>
                                    <li>To monitor, protect, and maintain the security and integrity of our Services and our business, such as protecting against and preventing fraud, unauthorized transactions, claims and other liabilities.</li>
                                    <li>To comply with applicable laws and regulations and respond to lawful requests and communications from law enforcement and other government officials.</li>
                                    <li>To carry out sales and business transactions in which information held by us is among the assets transferred or is otherwise relevant to the evaluation, negotiation, or completion of the transaction.
                                    </li>
                                    <li>To protect our rights, privacy, safety, property and/or those of others.</li>
                                    <li>To fulfill any other purpose for which you provide your Personal Information or as explained to you at the point of information collection.</li>
                                    <li>To provide you with customized content or targeted offers.</li>
                                    <li>To administer a contest, promotion, survey or other Site feature.</li>
                                    <li>To send you information, newsletters, and marketing/promotional material from us and, or on behalf of, our marketing partners and affiliates.</li>
                                </ul>
                            </li>
                        </ul>
                    </section>


                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">C. Retention </h2>
                        <ul className="list-disc pl-6 space-y-4 mb-4 marker:text-[#333]">
                            <li>
                                <p className="mt-1">
                                    We will retain your Personal Information for as long as reasonably necessary to provide you with our Services that you request, for marketing purposes unless you opt out as described in our Privacy Policy, or otherwise where permitted or required in accordance with applicable law. We will retain and use your Personal Information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements. What this means in practice will vary between different types of information, and when we consider our approach we take into account ongoing business or legal needs for the information, for example in relation to tax, health and safety, and potential or actual disputes or investigations.
                                </p>
                            </li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">2. PERSONAL INFORMATION WE COLLECT</h2>
                        <p className="mb-4">There are several ways we may obtain Personal Information about you, including through (A) information you provide to us; (B) information we automatically collect; (C) information we receive from third parties; and (D) combining information from different sources. This includes data that identifies you personally whether directly or indirectly.</p>

                    </section>
                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">A. Information You Provide </h2>
                        <p className="mb-4">We collect Personal Information as listed in the above Notice at Collection from you as follows:

                        </p>

                        <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#333]">
                            <li><span className="font-bold">When You Use our Services.</span>We collect Personal Information from you when inquire about or create an account or register to use the Services. </li>
                            <li><span className="font-bold">When You Make a Purchase. </span>If you purchase services from us, we or our third-party payment processors collect a payment card number or other payment information. </li>
                            <li><span className="font-bold">When You Provide Information About a Third Party. </span> When you provide us with Personal Information about dependents and family members.</li>
                            <li><span className="font-bold">When You Respond to Surveys or Provide Feedback.</span> We periodically ask users to complete surveys asking about their experiences with features of the Services. We use survey information for evaluation and quality improvement purposes, including helping Kalyan Jewellers to improve information and services offered through the Site. In addition, users giving feedback may be individually contacted for follow-up due to concerns raised during the course of such evaluation.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">B. Information We Automatically Collect </h2>
                        <p className="mb-4">
                            When you visit and interact with our Services, we or our third-party advertising and analytics partners and service providers may use a variety of technologies, such as cookies, tags, SDKs or scripts, to collect certain information regarding your activity.
                        </p>
                        <p className="mb-4">
                            The specific types of information that we and our partners and service providers may automatically collect when you visit and interact with our Services include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#333]">
                            <li><span className="font-bold">Device and Browser Information.</span>This includes your device’s IP address and/or other unique identifiers, browser type, device type, internet service provider, and operating system. </li>
                            <li><span className="font-bold">Location Information.</span>When you access our Services from a mobile device, your device’s approximate location (derived from your device’s IP address or other signals) may be collected.  </li>
                            <li><span className="font-bold">Usage Information</span>When you interact with our Services, certain information may be collected, including the date and time of your visit, the pages you view immediately before and after you access our Services, the areas or pages of our Services that you visit, the amount of time you spend viewing or using our Services, recordings of chat sessions (including with the involvement of bots), and other Site usage information. We (or our third-party vendors) may use tools and software to monitor and record information (including screenshots and videos) about your interactions with our Services, including keystrokes, mouse movements, form field entries, and overall engagement with our Services.  </li>
                            <li><span className="font-bold">Marketing Information. </span>If you receive an email from us, information may be collected about your interactions with the message (e.g., whether you opened, forwarded, or clicked through to our Site). </li>
                            <li><span className="font-bold">Third-party analytics technologies.</span>We may use third-party analytics tools to better understand who is using our Services, how people are using them, and how to improve their effectiveness as well as the effectiveness of any related content. </li>

                        </ul>

                        <p className="mb-4">
                            Cookies and Other Similar Technologies: “Cookies” are text files that are placed on your browser by the websites that you visit. Cookies are used for various purposes, including to distinguish you from other users, make your site navigation more efficient, help remember your preferences, enhance your browsing experience, and improve the use and functionality of our Sites and related content. They can also enable the delivery of relevant and personalized advertisements to you across the Internet.
                        </p>

                        <p className="mb-4">
                            Please note that cookies (and other similar technologies) provided by third parties may be placed on our Sites and the providers of these technologies may combine information collected from your interaction(s) with our Services with information they collect from other sources and use the combined information for analytics and/or advertising purposes.
                        </p>   <p className="mb-4">
                            To learn more about your choices regarding the automatic collection and use of your information as you browse our Services, please see the Your Privacy Choices and Rights section below.

                        </p>   <p className="mb-4">
                            Google Analytics: We use tools, such as Google Analytics to measure and evaluate usage of our website. We also use these tools to help us improve our Services, our performance, and user experiences. The Personal Information collected through this technology may include online identifiers and browser information, and may be combined with other data related to you. You can learn about Google’s practices by going to www.google.com/policies/privacy/partners/ and exercise the opt-out provided by Google by downloading the Google Analytics opt-out browser add-on.
                        </p>

                    </section>
                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">C. Information We Receive from Third Parties</h2>
                        <p className="mb-4">
                            We may receive Personal Information from other sources, including online advertising networks and analytics providers, social media platforms, and companies such as data aggregators that supplement the data that we collect from you.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">D. Combination of Information</h2>
                        <p className="mb-4">
                            We may combine Personal Information that we receive from various sources. We use, disclose, and protect combined Personal Information as described in this Privacy Policy.
                        </p>
                    </section>




                    {/* Section 4 */}
                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">3. HOW WE DISCLOSE YOUR PERSONAL INFORMATION </h2>
                        <p className="mb-4">We may disclose each category of your Personal Information that we collect to the following categories of recipients:</p>
                        <p className="mb-4"><span className="font-bold">Our Service Providers.</span>We disclose your Personal Information to our service providers that provide business, professional, or technical support services to us, help us operate our business and the Services, or administer activities on our behalf. We require our service providers to only use your Personal Information in connection with providing services to Kalyan Jewellers.
                            In certain circumstances, we may disclose each category of your Personal Information to:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#333]">
                            <li><span className="font-bold">Competent Governmental, Regulatory, and Public Authorities</span> We may disclose your Personal Information to government and law enforcement authorities, in each case to comply with legal or regulatory obligations or requests. </li>
                            <li><span className="font-bold">Relevant Third Parties as Part of a Corporate Transaction. </span> In the event of a reorganization, merger, sale, joint venture, assignment, transfer, or other disposition of all or any portion of our business, assets, or stock (including in connection with a bankruptcy or similar proceeding), we may disclose or transfer your Personal Information to certain third parties, such as the acquiring entity and its advisers.</li>
                            <li><span className="font-bold">Other Third Parties.</span>We will disclose your Personal Information to other third parties at your direction or with your consent. Additionally, we will disclose your Personal Information as we believe necessary or appropriate to: (a) comply with applicable law; (b) enforce our terms and conditions; (c) protect our operations; (d) protect our rights, privacy, safety, or property, and/or those of you or others; and (e) allow us to pursue available remedies or limit damages that we may sustain. </li>

                        </ul>
                        <p>
                            We may disclose your Personal Information for other reasons that we will describe at the time of information collection or prior to disclosing your information.
                        </p><p>
                            Please note that we may de-identify or aggregate Personal Information so that it will no longer be considered Personal Information and disclose such information to other parties for purposes consistent with those described in this Privacy Policy.

                        </p>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">Sharing of Information by You</h2>
                        <p>The Services offer many ways to find, enjoy, and share content. Your activity in connection with the Services may include filling out surveys, reviewing and rating products or services, inquiring about or purchasing products or services, participation in online communities, “liking” or “sharing” our content to your social media accounts or pages or otherwise interacting with the Services. Any information you may disclose on our Site or App, in blogs, on message boards, in chat rooms, or on other public areas on the Site or App or other third-party websites, applications, or services that this Site or App may link to, becomes public information. Please exercise caution when disclosing Personal Information in these public areas.</p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">4. YOUR PRIVACY CHOICES AND RIGHTS</h2>
                        <p>
                            You have the ability to make certain choices about how we use your Personal Information, as follows:
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h3 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">A. Privacy Rights and Requests </h3>
                        <p className="mb-4">Depending on your U.S. state of residence, you may have certain rights in relation to your Personal Information, including:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#333]">
                            <li><span className="font-bold">Right to Know: </span>You may have the right to know what Personal Information we have collected about you, including the categories of sources from which the Personal Information is collected, the business or commercial purpose for collecting, selling, or sharing Personal Information, the categories of third parties to whom we disclose Personal Information (including the names of such third parties to the extent allowed by applicable law), the categories of Personal Information disclosed to third parties, and the specific pieces of Personal Information we have collected about you. Please note that we may not be required to respond to your requests “to know” or access specific pieces of Personal Information more than twice in any 12-month period</li>
                            <li><span className="font-bold">Right to Data Portability: </span>You may have the right to access your information in a portable format.
                            </li>
                            <li><span className="font-bold">Right to Delete</span>You may have the right to request that we delete Personal Information that we have collected from or about you, subject to certain exceptions.</li>
                            <li><span className="font-bold">Right to Correct:</span>You may have the right to correct inaccurate Personal Information that we may maintain about you, subject to appropriate verification.</li>
                            <li><span className="font-bold">Right to Opt Out of Certain Types of Personal Information Uses and Disclosures:</span>We use and disclose to third parties Personal Information for analytics and advertising purposes. Accordingly, you may have the right to opt out of the “sale” or "sharing” of your Personal Information, or the use and disclosure of your Personal Information for “targeted advertising” (as these terms are defined in applicable law).</li>
                        </ul>
                        <p>
                            Please note that, where permitted under applicable law, we may decline a request (other than for opt outs) if we are unable to verify your identity (or an agent’s authority to make the request) and confirm the Personal Information we maintain relates to you.
                        </p>
                        <p>If you are interested in exercising one or more of the rights outlined above, you can contact us at us.leads@kalyanjewellers.net  or +1 (732) 379-4395. Please put the statement “Your Privacy Rights” in the subject field of your email. We may take steps to verify your identity before responding to your request by asking you a series of questions about your previous interactions with us. Submitting a privacy rights request does not require you to create an account with us.</p>
                        <p>We will not discriminate against you if you decide to exercise your privacy rights.

                        </p>
                    </section>
                    {/* Section 7 - Rights */}
                    <section>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold">B. Agent Requests</h3>
                                <p>Only you, or someone legally authorized to act on your behalf, may submit a request related to your Personal Information.</p>
                                <p className="mt-2">Depending on your U.S. state of residence, you may authorize someone to make a privacy rights request on your behalf (an authorized agent). Authorized agents will need to demonstrate that you’ve authorized them to act on your behalf. Kalyan Jewellers retains the right to request confirmation directly from you confirming that the agent is authorized to make such a request, or to request additional information to confirm the agent’s identity.</p>
                            </div>

                            <div>
                                <h3 className="font-bold">C. Opt-Out Requests</h3>
                                <p>You may request to opt out of the sale or share of your Personal Information, or of targeted advertising, at any time by clicking the at the bottom of our Services’ homepages, or you can email us at <a href="mailto:us.leads@kalyanjewellers.net" className="text-blue-600 hover:underline">us.leads@kalyanjewellers.net</a>.</p>
                                <p>Submitting an opt-out request does not require you to create an account with us.
                                </p>
                                <p>Alternatively, you can use certain preference signals to exercise your sale and sharing opt-out right automatically with all businesses that you interact with online, including Kalyan Jewellers. If you enable a browser-based opt-out preference signal, such as Global Privacy Control (GPC), upon receipt or detection, we will treat the signal as a valid request to opt out of the sale or sharing of personal information linked to that browser and any consumer profile we have associated with that browser. Please note that if you use different browsers or browser profiles, you may need to enable the signal on each browser or profile.</p>
                                <p>Further, you may be able to opt out of receiving certain targeted or interest-based advertisements using the browser opt-out tools and consumer choice mechanisms provided by advertising industry self-regulatory groups by following the links below:</p>
                                <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#333]">
                                    <li>Network Advertising Alliance (NAI):
                                        <a href="https://optout.networkadvertising.org/?c=1" className="text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">https://optout.networkadvertising.org/?c=1</a>
                                    </li>

                                    <li>Digital Advertising Alliance (DAA):
                                        <a href="https://youradchoices.com/control" className="text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">https://youradchoices.com/control</a>
                                    </li>
                                </ul>
                                <p>
                                    You also can control whether you see interest-based advertisements on your mobile device(s) in the following ways:</p>
                                <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#333]">
                                    <li>The DAA offers a tool for opting out of the collection of cross-app data on mobile devices for interest-based advertising. To exercise your choices with respect to participating companies, please download the AppChoices tool at <a href="https://www.aboutads.info/appchoices" className="text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">www.aboutads.info/appchoices</a>.
                                    </li>
                                </ul>
                                <p className="mb-4">You will need to opt out separately on all of your browsers and devices, as each opt out will apply only to the specific browser or device from which you opt out. If you delete or reset your cookies or mobile identifiers, change browsers, or use a different device, any opt-out cookie or tool may no longer work and you will have to opt out again.</p>
                                <p className="mb-4">Even if you choose to opt out of receiving interest-based advertising, you may still receive advertising, but the advertisements may be less relevant.</p>
                                <p>Some of our partners may provide you with additional choices with respect to interest-based advertising. For example, certain social media platforms allow you to control your advertising preferences directly through their services. Please review the privacy policies of the third-party services you use for more information.</p>
                            </div>

                            <div>
                                <h3 className="font-bold">D. Right to Appeal</h3>
                                <p>Depending on your U.S. state of residence, you may have the right to appeal a decision we have made in connection with your privacy rights request. To appeal a decision, please contact us at <a href="mailto:us.leads@kalyanjewellers.net" className="text-blue-600 hover:underline">us.leads@kalyanjewellers.net</a> or +1 (732) 379-4395.</p>
                            </div>

                            <div>
                                <h3 className="font-bold">E. Unsubscribing from our Marketing and Promotional Communications</h3>
                                <p>From time to time, we may send you marketing and promotional communications, including special offers from us or our partners. If you no longer wish to receive promotional and marketing emails from us, you may opt out of such communications at any time by following the opt-out instructions included in any promotional or marketing email you receive from us.</p>
                            </div>

                            <div>
                                <h3 className="font-bold">F. Notice of Financial Incentive </h3>
                                <p>We may offer financial incentives to promote our products and services. These may include:</p>

                                <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#333]">
                                    <li>Discounts, coupons, and special offers when you sign up for our email list, participate in a marketing promotion or sweepstakes, or create an account.</li>
                                    <li>Points programs, where you earn points for certain purchases that can be redeemed for discounts or coupons. </li>
                                </ul>


                                <p>We may ask you to provide Personal Information in connection with these promotions, including the following Personal Information: <span className="font-bold"> which is shared with any third-party tools like Google, Meta etc. and the information which is shared with us through our registration/login and information that is provided for the occasional update [like the information are Name, mobile number, address(shared with any other platform), email, mobile number etc].</span> Because these promotions involve the collection of Personal Information, they may be interpreted as “financial incentive” programs under California law or “bonafide loyalty programs” under Colorado law. We use this information for the purposes described above under the section titled “Notice at Collection of Personal Information,” including for targeted advertising. We may share your Personal Information with third parties as described in our “Notice at Collection of Personal Information,” including data analytics providers, advertising technology vendors, and social media platforms.</p>

                                <p>Participation in any financial incentive is optional. To enroll, please click here <Link to="/promotions" className="text-blue-600 hover:underline">here</Link>. You may withdraw from the program at any time by emailing <a href="mailto:us.leads@kalyanjewellers.net" className="text-blue-600 hover:underline">us.leads@kalyanjewellers.net</a>. To stop receiving our coupons or discounts in your email, you may unsubscribe from our emails by clicking the “unsubscribe” button at the bottom of any such email. If you ask us to delete your Personal Information, we will not be able to provide you with access to these programs.</p>

                                <p>The value of any financial incentive we offer is reasonably related to the value of any Personal Information you provide to us. We estimate the value of your Personal Information by considering, without limitation, the expenses we incur from collecting your Personal Information and/or providing the financial incentive to you, the revenue generated by your use of the financial incentive, and any improvements we can make to our products and services based on aggregating information obtained through the financial incentive program.</p>
                                <p>Please note that we may provide additional terms that apply to a particular financial incentive. If applicable, those terms will be presented to you at sign up.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 7 - Minors (Numbering as per screenshot) */}
                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">5. EXTERNAL LINKS</h2>
                        <p>
                            Our Services may have links to third-party services, which may have privacy policies that differ from our own. We are not responsible for the practices of such sites.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">6. CHILDREN’S PRIVACY</h2>
                        <p className="mb-4">
                            Our Services are intended for a general audience. We do not direct our Services to individuals under eighteen (18), nor do we knowingly solicit or collect any Personal Information from minors.
                        </p>
                    </section>
                    <section>
                        <h2 className="font-bold mb-2">7. DATA SECURITY</h2>
                        <p>
                            We have implemented physical, administrative, and technical safeguards to maintain the security, confidentiality, and integrity of your information. However, as no transmission of information over the internet is absolutely secure, we cannot guarantee the safety of your information.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">8. REVISIONS TO THIS PRIVACY POLICY</h2>
                        <p>
                            We reserve the right, in our sole discretion, to change, modify, add, remove, or otherwise revise portions of this Privacy Policy at any time. When we do, we will post the change(s) to our Services. Your continued use of our Services following the posting of changes to these terms means you accept these changes. If we change the Privacy Policy in a material way, we will provide appropriate notice to you. Such notice may be provided via a temporary banner on our Site, an email sent to users for whom we have an email address, or by temporarily noting “UPDATED” next to the Privacy Policy link on the footer of our Site.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-[15px] md:text-[17px] font-bold mb-3 uppercase">9. HOW TO CONTACT US</h2>
                        <p>
                            If you have any questions or concerns about this Privacy Policy or the practices described herein, you may contact us at Kalyan Jewellers, 1337-1339 Oak Tree Road, Iselin New Jersey - 08830  or by mail to us.leads@kalyanjewellers.net or by phone at +1 (732) 379-4395
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
