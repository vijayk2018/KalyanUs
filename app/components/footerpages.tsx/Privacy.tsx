import React from 'react';

export default function Privacy() {
    return (
        <div className="bg-white min-h-screen pt-16 pb-24 font-sans text-[#333]">
            <div className="max-w-[1240px] mx-auto px-4 md:px-8">
                {/* Header */}
                <h1 className="text-[20px] md:text-[24px] font-semibold text-center uppercase tracking-wide mb-2">
                    KALYAN JEWELLERS PRIVACY POLICY
                </h1>
                <p className="text-center text-[14px] text-[#666] mb-8">
                    Last Updated Version: 25.10.2024
                </p>

                {/* Intro Paragraph */}
                <div className="text-[14px] md:text-[15px] leading-relaxed mb-6 space-y-4">
                    <p>
                        This Privacy Policy of Kalyan Jewellers INC (herein after referred to as “Kalyan”, “we”, “our” or “us”) applies to all visitors, users, and others who reside in the State of California or accessing through our United States portal (hereinafter “Consumers” or “you”) and we adopt this policy to comply with the California Privacy Rights Act (“CPRA”), which amended the California Consumer Privacy Act of 2018 (“CCPA”) alongside other applicable United States Federal & State Privacy Laws. Any terms defined in CPRA, CCPA & or in our standard privacy policy will have the same meaning when used in this policy.
                    </p>
                    <p>
                        This states what kind of Personal Information we collect, how it is collected, used, shared & protected; what are your rights over the collected Personal information and process to exercise them.
                    </p>
                </div>

                {/* Section 1 */}
                <div className="mb-8">
                    <h2 className="text-[16px] md:text-[18px] font-bold mb-4">
                        1. Notice at Collection of Personal Information
                    </h2>
                    <p className="text-[14px] md:text-[15px] leading-relaxed mb-6">
                        We do not sell Personal Information. We collect the following categories of Personal Information from consumers. However, please note that all specific pieces of Personal information are not always collected about all consumers.
                    </p>

                    {/* Table */}
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full border-collapse border border-gray-300 text-[13px] md:text-[14px]">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-300">
                                    <th className="font-bold text-left p-4 border-r border-gray-300 w-[50%] align-top">
                                        Category of Personal Information
                                    </th>
                                    <th className="font-bold text-left p-4 border-r border-gray-300 w-[25%] align-top">
                                        Do we collect this category of personal Information?
                                    </th>
                                    <th className="font-bold text-left p-4 w-[25%] align-top">
                                        Do we sell this category?
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold mb-1">Identifiers</p>
                                        <p className="text-[#555]">(e.g., name, alias, address, unique personal identifier, online identifier, IP address, email address, account name, SSN, driver&apos;s license number, passport number, or similar identifiers)</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top text-center md:text-left">Yes,<br />collected from consumers</td>
                                    <td className="p-4 align-top text-center md:text-left">No,<br />however they are shared to service providers</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold mb-1">Personal information categories listed in California Customer Records statute (Cal. Civ. Code § 1798.80(e))</p>
                                        <p className="text-[#555]">(e.g., Name, signature, SSN, physical characteristics or description, address, telephone number, passport number, driver&apos;s license or state identification card number, insurance policy number, education, employment, employment history, bank account number, credit card number, debit card number, or any other financial information, medical information, or health insurance information)</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top text-center md:text-left">Yes,<br />collected from consumers/applications/enquiries.</td>
                                    <td className="p-4 align-top text-center md:text-left">No</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold">Characteristics of protected classifications under California or federal law</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top text-center md:text-left">No</td>
                                    <td className="p-4 align-top text-center md:text-left">No</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold mb-1">Commercial information</p>
                                        <p className="text-[#555]">(e.g., records of personal property, products or services purchased, obtained, or considered, or other purchasing or consuming histories or tendencies)</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top text-center md:text-left">Yes,<br />collected from consumers.</td>
                                    <td className="p-4 align-top text-center md:text-left">No,<br />however they are shared to service providers.</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold">Biometric information</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top text-center md:text-left">No</td>
                                    <td className="p-4 align-top text-center md:text-left">No</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold mb-1">Internet or other similar network activity</p>
                                        <p className="text-[#555]">(e.g., browsing history, search history, and information regarding a consumer&apos;s interaction with an internet website, application, or advertisement)</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top text-center md:text-left">Yes,<br />collected from consumers&apos; devices.</td>
                                    <td className="p-4 align-top text-center md:text-left">No</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold">Geolocation data</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top text-center md:text-left">Yes,<br />collected from consumers&apos; devices.</td>
                                    <td className="p-4 align-top text-center md:text-left">No</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold mb-1">Sensory data</p>
                                        <p className="text-[#555]">Audio, electronic, visual, thermal, olfactory, or similar information</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top text-center md:text-left">No</td>
                                    <td className="p-4 align-top text-center md:text-left">No</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold">Professional or employment-related information</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top text-center md:text-left">No</td>
                                    <td className="p-4 align-top text-center md:text-left">No</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold">Non-public education information (per the Family Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part 99))</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top text-center md:text-left">No</td>
                                    <td className="p-4 align-top text-center md:text-left">No</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4 border-r border-gray-300 align-top">
                                        <p className="font-bold mb-1">Inferences drawn from other personal information</p>
                                        <p className="text-[#555]">(Profile reflecting a person&apos;s preferences, characteristics, psychological trends, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes)</p>
                                    </td>
                                    <td className="p-4 border-r border-gray-300 align-top text-center md:text-left">Yes,<br />collected from consumers&apos; interaction with our website/application.</td>
                                    <td className="p-4 align-top text-center md:text-left">No,<br />however they are shared to service providers.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-[14px] md:text-[15px] leading-relaxed mb-6">
                        <p className="mb-2">* Exclusions:</p>
                        <p>
                            Personal Information does not include information that is publicly available from government records or de-identified or aggregated consumer information. Personal Information also does not include information excluded from the scope of CCPA/CPRA, including but not limited to health or medical information covered by the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and the California Medical Information Act (CMIA) or clinical trial data, or personal information covered by certain sector-specific privacy laws, including the Fair Credit Reporting Act (FRCA), the Gramm-Leach-Bliley Act (GLBA) or California Financial Information Privacy Act (FIPA), and the Driver&apos;s Privacy Protection Act of 1994.
                        </p>
                    </div>
                </div>

                {/* Remaining sections */}
                <div className="space-y-8 text-[14px] md:text-[15px] leading-relaxed">
                    {/* Section 2 */}
                    <section>
                        <h2 className="text-[16px] md:text-[18px] font-bold mb-3 uppercase">2. METHODS OF INFORMATION COLLECTION</h2>
                        <p className="mb-4">We may collect personal information directly from you when you provide it to us, automatically as you navigate through our website/app, or from third parties. Our methods of information collection may include (but not limited to)</p>
                        <ul className="list-disc pl-6 space-y-4 mb-4 marker:text-[#333]">
                            <li>
                                <span className="font-bold">Information you provide:</span>
                                <ul className="list-[circle] pl-6 mt-2 space-y-2">
                                    <li><span className="font-bold">Personal Details:</span> Full Name, Address, Phone number, Email address, Date of birth.</li>
                                    <li><span className="font-bold">Account Information:</span> Usernames, passwords, order history, communication preferences, and wish lists if you create an account.</li>
                                    <li><span className="font-bold">Financial Information:</span> Payment card details and billing address for processing transactions.</li>
                                    <li><span className="font-bold">Customer Service Interactions:</span> Records of your correspondence with our customer service team, including emails, chat logs, and phone call recordings.</li>
                                </ul>
                            </li>
                            <li>
                                <span className="font-bold">Information Collected Automatically (Cookies):</span>
                                <p className="mt-1">When you interact with our website/app, we may automatically gather information using cookies, tracking pixels, and similar technologies. This may include your IP address, browser type, device identifiers, browsing behavior, pages visited, referring URLs, and interaction with our marketing emails.</p>
                            </li>
                            <li>
                                <span className="font-bold">Information from Third Parties:</span>
                                <p className="mt-1">We may obtain information about you from external sources, such as our affiliates, service providers, social media platforms, or public databases. This might include demographic data, marketing insights, or updated contact information.</p>
                            </li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-[16px] md:text-[18px] font-bold mb-3 uppercase">3. HOW WE USE YOUR PERSONAL INFORMATION</h2>
                        <p className="mb-4">We may use the personal information collected for the following business purposes:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#333]">
                            <li><span className="font-bold">To Fulfil your Requests:</span> Process orders, deliver products, handle returns, process payments, and provide requested services or information.</li>
                            <li><span className="font-bold">Customer support:</span> Respond to your inquiries, concerns, or requests, and provide effective customer support.</li>
                            <li><span className="font-bold">Improve our Services:</span> Analyze user behavior and feedback to enhance the functionality, design, and user experience of our website/app.</li>
                            <li><span className="font-bold">Marketing and promotions:</span> Send you marketing communications, newsletters, promotions, and tailored offers. You possess the option to opt-out of these communications according to our <a href="#" className="text-blue-500 hover:underline">marketing/cookie policy</a>.</li>
                            <li><span className="font-bold">Personalization:</span> Customize your website/app experience, recommend products based on your preferences, and display relevant content or advertisements.</li>
                            <li><span className="font-bold">Legal Compliance:</span> Comply with applicable legal requirements, enforce our terms of service, and protect our rights, privacy, safety, or property, and that of our users or others.</li>
                        </ul>
                        <p className="mb-4">
                            For the purpose of CPRA/CCPA, please note we do not &quot;sell&quot; your personal information in the traditional sense. However, depending upon your interaction with our site and services, standard use of cookies may fall under the California definition of &quot;selling&quot; or &quot;sharing&quot; for targeted advertising.
                        </p>
                        <p className="mb-4">
                            We do not collect sensitive personal information. In case we collect your sensitive personal information, we only use it to provide our core services, not for inferring characteristics or targeted advertising. Thus, we don’t offer a specific tool to &quot;limit the use of my sensitive personal information&quot; beyond general opt-outs.
                        </p>
                        <p>
                            To opt out of the &quot;sale&quot; or &quot;sharing&quot; of your data (e.g., via cookies and trackers), click on the <a href="#" className="text-blue-500 hover:underline">“Do Not Sell or Share My Personal Information”</a> link in the website footer. We also process Global Privacy Control (GPC) signals as valid opt-out requests.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-[16px] md:text-[18px] font-bold mb-3 uppercase">4. SHARING AND DISCLOSURE OF INFORMATION</h2>
                        <p className="mb-4">We may share your Personal Information with third parties in the following circumstances:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#333]">
                            <li><span className="font-bold">Service providers:</span> We may share your information with trusted third-party service providers who assist us in operating our business, delivering orders, processing payments, analysing data, or conducting marketing activities. They are contractually obligated to keep your information secure and are only authorized to use it for designated services.</li>
                            <li><span className="font-bold">Affiliates:</span> We may share information with our affiliated entities for internal business purposes or to provide joint services and promotions.</li>
                            <li><span className="font-bold">Legal requirements:</span> We may disclose your personal information if required by law, regulation, legal process, or governmental request, or when we believe such disclosure is necessary to protect our rights, safety, investigate fraud, or respond to an emergency.</li>
                            <li><span className="font-bold">Business transfer:</span> If Kalyan Jewellers INC is involved in a merger, acquisition, restructuring, bankruptcy, or sale of all or a portion of its assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website/app of any change in ownership or use of your personal information.</li>
                        </ul>
                        <p>
                            We don&apos;t sell your personal information in standard meaning of the word &apos;sale&apos; but CPRA/CCPA considers use of few type of cookies or targeting advertising a &apos;sale&apos; or &apos;sharing&apos;. As per definition under statute, we limit our data sharing to specific service providers, thus technically we don&apos;t sell your information under CCPA/CPRA as well.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-[16px] md:text-[18px] font-bold mb-3 uppercase">5. SECURITY MEASURES</h2>
                        <p>
                            We implement reasonable and appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We regularly review and upgrade our security protocols. However, it&apos;s essential to understand that no data transmission over the internet or electronic storage system is completely secure. We cannot guarantee absolute security.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-[16px] md:text-[18px] font-bold mb-3 uppercase">6. RETENTION OF PERSONAL INFORMATION</h2>
                        <p className="mb-4">We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Our retention periods are determined by:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#333]">
                            <li>The length of time we have an ongoing relationship with you and provide you with our services.</li>
                            <li>Whether there is a legal obligation to which we are subject.</li>
                            <li>Whether retention is advisable considering our legal position (such as, for statutes of limitations, litigation, or regulatory investigations).</li>
                        </ul>
                        <p>
                            When we have no ongoing legitimate business need to process your personal information, we will either securely delete, destroy, or anonymize it. If this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                        </p>
                    </section>

                    {/* Section 7 - Rights */}
                    <section>
                        <h2 className="text-[16px] md:text-[18px] font-bold mb-3 uppercase">7. YOUR CPRA/ CCPA RIGHTS</h2>
                        <p className="mb-4">Under CPRA/CCPA, consumers in California/USA have specific rights regarding their Personal Information. We endeavour to uphold following rights for our consumers:</p>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold">Right to know & to Access:</h3>
                                <p>Consumers have the right to request access to their personal information, including the categories of personal information collected, the sources from which it was collected, the business or commercial purposes for collecting or selling the information, the categories of third parties with whom the information is shared, and the specific pieces of personal information collected about them. Also, consumers have right to know information about &quot;sale&quot; or &quot;share&quot; of their PI.</p>
                                <p className="mt-2">You have the right to request that we disclose certain information to you about our collection and use of your Personal Information over the past 12 months.</p>
                            </div>

                            <div>
                                <h3 className="font-bold">Right to Request Deletion:</h3>
                                <p>Consumers have the right to request the deletion of their personal information held by a business, subject to certain exceptions. We may deny your deletion request if retaining the information is necessary for us or our service provider(s) to: Complete the transaction for which we collected the personal information, provide a good or service that you requested, take actions reasonably anticipated within the context of our ongoing business relationship with you, fulfill the terms of a written warranty or product recall conducted in accordance with federal law, or otherwise perform our contract with you. Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, or prosecute those responsible for such activities. Give response to subpoenas/warrant or any other legal/regulatory requirement etc.</p>
                            </div>

                            <div>
                                <h3 className="font-bold">Right to Opt-Out</h3>
                                <p>Consumers have the right to opt-out of the legal sale or sharing of their personal information to third parties. Given our operational nature, we neither &apos;sell&apos; nor &apos;share&apos; your personal information in ordinary meaning/transaction. Given the statutory parameters in CPRA/CCPA which may categorise utilisation of certain cookies & or target advertising as a &apos;sale&apos; or &apos;sharing&apos;. As per definition under statute, we limit our data sharing to specific service providers, thus technically we don&apos;t sell your information under CCPA/CPRA as well. Thus, consumer doesn&apos;t require to invoke this right, still we provide the option to you according to our policy/settings.</p>
                            </div>

                            <div>
                                <h3 className="font-bold">Right to Non-Discrimination:</h3>
                                <p>Businesses cannot discriminate against consumers who exercise their CPRA rights, such as denying goods or services, charging different prices, or providing a lower quality of goods or services.</p>
                            </div>

                            <div>
                                <h3 className="font-bold">Right to Correct Inaccurate Personal Information:</h3>
                                <p>Consumers have the right to request correction of inaccurate Personal information that a business maintains about them.</p>
                            </div>

                            <div>
                                <h3 className="font-bold">Right to Limit Use & Disclosure of Sensitive Personal Information</h3>
                                <p>Consumers have the right to direct a business to limit its use of sensitive personal information to that use which is necessary to perform the services or provide the goods reasonably expected by an average consumer. Given our operational nature, we only use your sensitive personal information (if collected) to execute services requested by you. Hence, you don&apos;t require to invoke this right, still we provide the option to you according to our policy/settings.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 7 - Minors (Numbering as per screenshot) */}
                    <section>
                        <h2 className="text-[16px] md:text-[18px] font-bold mb-3 uppercase">7. MINORS</h2>
                        <p>
                            Our website/app is not intended for consumers under the age of 16. We do not knowingly collect personal information from consumers under sixteen (16) years of age.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-[16px] md:text-[18px] font-bold mb-3 uppercase">8. EXERCISING YOUR CPRA RIGHTS</h2>
                        <p className="mb-4">
                            To exercise your right to access, delete, or opt-out, please submit a verifiable consumer request to us by either emailing us at <a href="mailto:usa@kalyanjewellers.net" className="text-blue-500 hover:underline font-bold">usa@kalyanjewellers.net</a>, or sending us post on &apos;Kalyan Jewellers, 9070 Irvine Centre Drive, #195, Irvine, CA - 92618&apos;. Or You can also do it yourself by changing privacy settings on web site.
                        </p>
                        <p className="mb-4">
                            Only you or your authorized agent can make a verifiable consumer request related to your Personal Information.<br />
                            Your verifiable consumer request must:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#333]">
                            <li>Provide sufficient information that allows us to reasonably verify you are the person about whom we collected Personal Information or an authorized representative, which may include providing documents/details including but not limited to SSN, ID Card, Date of Birth.</li>
                            <li>Describe your request with sufficient detail that allows us to properly understand, evaluate, and respond to it.</li>
                        </ul>
                        <p className="mb-4">
                            We cannot respond to your request or provide you with Personal Information if we cannot verify your identity or authority to make the request and confirm the Personal Information relates to you.
                        </p>
                        <h3 className="font-bold mb-2">Response Time:</h3>
                        <p>
                            We aim to respond to a verifiable consumer request within forty-five (45) days of its receipt. If we require more time, we will inform you of the reason and extension period (up to 90 days) in writing.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-[16px] md:text-[18px] font-bold mb-3 uppercase">9. CHANGES TO PRIVACY POLICY</h2>
                        <p>
                            We reserve the right to amend this Policy at our discretion and at any time. When we make changes, we will post the updated notice on our website and update the effective date.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-[16px] md:text-[18px] font-bold mb-3 uppercase">10. CONTACT INFORMATION</h2>
                        <p>
                            If you have any questions or comments about this Privacy Policy, the ways in which we collect and use your Personal Information, your choices and rights regarding such use, or wish to exercise your rights under CPRA/CCPA, please do not hesitate to contact us at: Email: <a href="mailto:usa@kalyanjewellers.net" className="text-blue-500 hover:underline font-bold">usa@kalyanjewellers.net</a>, Address: Kalyan Jewellers INC, 9070 Irvine Center Drive, #195, Irvine, CA-92618.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
