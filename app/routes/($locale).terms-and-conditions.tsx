import {useState} from 'react';
import {Link} from 'react-router';
import type {Route} from './+types/terms-and-conditions';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Terms & Conditions'}];
};

type TermsSection = {
  title: string;
  content: string[];
};

const TERMS_SECTIONS: TermsSection[] = [
  {
    title: 'Acceptance of Terms and Conditions',
    content: [
      "Your privacy is important to us and we will protect it. Candere.com collects, stores, processes and uses your information in accordance with Candere's Privacy Policy.",
      "By using the website and/ or by providing your information, you consent to the collection and use of the information you disclose on the website by Candere in accordance with Candere's Privacy Policy. Please review Candere's Privacy Policy.",
    ],
  },
  {
    title: 'Ownership and Copyright',
    content: [
      'This Candere.com web site is owned and operated by Enovate Lifestyles Private Limited.',
      'Unless otherwise noted, all design and content included on this web site, including text, graphics, logos, icons, images, artwork, products, audio and video clips and software is the property of Enovate Lifestyles Private Limited (or is used under license to Enovate Lifestyles Private Limited) and is protected by Indian Copyright Act, 1957 and international copyright laws.',
    ],
  },
  {
    title: 'Use of Website and License',
    content: [
      "Candere's website and content are intended solely for personal and non-commercial use by visitors and online shoppers.",
      'Any use of the Candere website or its content other than for personal and non-commercial purposes is prohibited. This is a revocable license and remains subject to restrictions mentioned in these terms.',
      'Our website users may experience difficulty in accessing the website from 0600 am to 0630 am due to website updates.',
    ],
  },
  {
    title: 'Usage Eligibility',
    content: [
      'Use of the website is available only to persons who can form legally binding contracts under Indian Contract Act, 1872 and any other applicable international law for this purpose.',
      'If you are under 18 years old, you may use candere.com only with the involvement of a parent or legal guardian.',
      'Candere reserves the right to refuse service, terminate accounts, remove or edit content or cancel orders at its sole discretion.',
    ],
  },
  {
    title: 'Your Account and Registration',
    content: [
      'If you access or use the Candere website, you are responsible for maintaining the confidentiality of your account and for restricting access to your computer.',
      'You agree to provide true, accurate, current and complete information and notify Candere immediately of any unauthorized use of your account or any other breach of security.',
      'You grant Candere a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, sub-licensable right to exercise rights you have in your information.',
    ],
  },
  {
    title: 'Product Description',
    content: [
      'Candere makes all reasonable efforts to display products as accurately as possible; however, monitor display and color capabilities may affect what you see.',
      'Candere does not warrant that product descriptions or other content are accurate, complete, reliable, current or error-free.',
      'In case of pricing or description errors, Candere reserves the right to cancel and refund the transaction in full.',
    ],
  },
  {
    title: 'Equipment',
    content: [
      "Website user shall be responsible for obtaining and maintaining all telephone, computer hardware and other equipment needed for access to and use of this website and all charges related thereto.",
      "Candere shall not be liable for any damages to the website visitor's equipment resulting from the use of this website.",
    ],
  },
  {
    title: 'Content you submit',
    content: [
      'Content submitted in blogs, forums, chats, and other online mediums is treated as public and non-confidential (except resumes for employment consideration).',
      'Candere is free to use contributed content on an unrestricted basis and may remove any submission at any time at its sole discretion.',
      'You represent and warrant that you own or have permission to submit such material.',
    ],
  },
  {
    title: 'No lawful or prohibited use',
    content: [
      'You agree not to upload or transmit any harmful, illegal, defamatory, infringing, or malicious content, including malware, spyware, viruses, and phishing material.',
      "You also agree not to impersonate others, send spam, attempt unauthorized access, interfere with website operations, or violate applicable law.",
    ],
  },
  {
    title: 'Disclaimer of warranty',
    content: [
      'THE MATERIALS AND INFORMATION PROVIDED BY CANDERE ON ITS WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.',
      'TO THE FULLEST EXTENT PERMISSIBLE BY LAW, CANDERE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.',
    ],
  },
  {
    title: 'Limitation of liability',
    content: [
      'Candere is not liable for damages caused by interruption, virus, communication failure, unauthorized access, or other incidents beyond reasonable control.',
      'In no event shall Candere aggregate liability exceed the amount paid by you for accessing Candere.com website.',
    ],
  },
  {
    title: 'Indemnity',
    content: [
      'You agree to defend, indemnify and hold harmless Candere and its affiliates, employees and agents from claims arising from your use of the website or breach of these terms.',
    ],
  },
  {
    title: 'Coupons terms and conditions',
    content: [
      'eCoupons are promotional privileges issued by Enovate Lifestyles Pvt. Ltd. and can be cancelled at any time at their sole discretion.',
      'eCoupons have no cash value, are non-transferable, and cannot be clubbed unless explicitly stated.',
      'One eCoupon is valid for one purchase; any unused value is forfeited.',
    ],
  },
  {
    title: 'Grievance officer',
    content: [
      'In accordance with Information Technology Act 2000 and related rules, the Grievance Officer is Rupesh Jain and can be reached at rupesh.jain@candere.com.',
    ],
  },
  {
    title: 'Government law',
    content: [
      'These terms and your usage of Candere.com are governed by the laws of India.',
      'Any unenforceable clause shall be limited to the extent enforceable; remaining clauses continue in full force.',
    ],
  },
  {
    title: 'Dispute resolution',
    content: [
      'Any dispute arising with respect to this Agreement shall be resolved by negotiation between the parties or, if necessary, by resort to an appropriate court located in Mumbai, India.',
    ],
  },
  {
    title: 'Modification',
    content: [
      'Candere may modify these terms at any time. Continued use of the website indicates acceptance of the latest version.',
      'Date of Last Update of these Terms of Use: June 1, 2015.',
    ],
  },
  {
    title: 'Delivery at Kalyan Store',
    content: [
      'Orders for Kalyan Store delivery require buyer address in billing address compulsorily.',
      'Payments at Kalyan store are accepted in cash only. Card or other modes are not accepted.',
      'Address change to Kalyan store delivery must be received 48 hours before shipping.',
    ],
  },
  {
    title: 'Purchase',
    content: [
      'Any user who wishes to purchase an item from the website can either:',
      'Add the selected jewellery directly to the shopping cart with customizable options available on the product page; or',
      'Customize jewellery by filling details of customization available under the trending tab; or',
      'Choose from the selection of jewellery available on the website and add the item to your shopping cart, or call our trained consultants on +91 22 61066262 to place an order.',
      'The user will receive the form for ordering via email based on their convenience.',
      "In the event of a user wishing to make a purchase and doesn't have an account on Candere.com, he/she will have to register onto the website after adding the item(s) to the shopping cart. The users shall also provide any other mandatory information required under law like Permanent Account Number (PAN) and/or GST number at the time of purchase.",
      'Orders are normally considered complete only after the payment has been received by Candere.com unless the order is on complete Cash on Delivery (COD)',
      'To confirm the orders, our jewellery consultants at Candere.com may call up the users who have placed orders through the website at any given time.',
    ],
  },
  {
    title: 'Transaction Status',
    content: [
      'If payment is declined or flagged as fraudulent by bank/gateway, Candere can refuse shipment without liability.',
      'Any paid amount in such cases is refunded via the same payment mode.',
    ],
  },
  {
    title: 'Product availability and pricing',
    content: [
      'Availability depends on inventory and supplier fulfilment; if unavailable, alternate options may be provided.',
      'Pricing can vary due to market conditions, design, seller factors, and technical errors. Candere reserves right to correct errors and revise prices without notice.',
    ],
  },
  {
    title: 'Product weight variance',
    content: [
      'Final manufactured product weight may vary. Differential amount is refunded for lower weight and additionally payable for higher weight.',
    ],
  },
  {
    title: 'Advance / Part payment',
    content: [
      'Candere may require advance payment. Balance is payable at delivery, failing which order may be treated as cancelled.',
      'Advance paid may be non-refundable on cancellation.',
    ],
  },
  {
    title: 'Usage of promo code issued by the company',
    content: [
      'Candere may refuse promo code usage at any time and may ask for proof of receipt.',
      'Promo codes are valid only as per stated eligibility, dates, and combinations.',
      'For offline payment mode, promo code is accepted only within its expiry date.',
    ],
  },
];

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState(TERMS_SECTIONS[0]?.title ?? '');

  return (
    <div className="min-h-screen bg-white pb-16 pt-6 font-sans text-[#222]">
      <div className="mx-auto w-[90%] max-w-[1200px]">
        <div className="mb-6 text-[12px] text-[#666]">
          <Link to="/" className="text-[#555] hover:underline">
            Home
          </Link>
          <span className="mx-2">{'>'}</span>
          <span className="text-[#222]">Terms And Conditions</span>
        </div>

        <h1 className="mb-8 text-center text-[42px] font-normal text-[#2a2a2a]">
          Terms & Conditions
        </h1>

        <div className="space-y-4 text-[14px] leading-7 text-[#333]">
          <p>
            Candere.com (&quot;Candere&quot; or &quot;website&quot; or &quot;we&quot; or
            &quot;our&quot;) is the shopping website of Enovate Lifestyles Private Limited
            that allows consumers to browse, select and purchase precious stones and or
            precious metal jewellery and accessories (&quot;Products&quot; or
            &quot;Goods&quot;) from the website.
          </p>

          <p>
            Candere.com provides services to you subject to the terms and conditions
            included in this Terms of Use and other customer service pages to help make
            your shopping experience with Candere as enjoyable and problem-free as
            possible. Please read them carefully. By visiting or using this website or
            service, you acknowledge that you have read and understood, and agree to be
            bound by, these Terms of Use. You also agree to comply with all applicable
            laws and regulations, including Copyright and Trademark laws.
          </p>

          <p>
            If you do not agree to these terms, please do not use candere.com web site.
          </p>

          <p>
            If you would like to provide feedback about candere.com web site, or
            recommend a way we can improve the buying experience, please write to{' '}
            <a
              href="mailto:support@candere.com"
              className="text-[#1e5aa8] underline underline-offset-2 hover:text-[#163f77]"
            >
              support@candere.com
            </a>
            .
          </p>

          <p>
            If you have any questions about these Terms and Conditions, please contact
            Candere on{' '}
            <a
              href="mailto:support@candere.com"
              className="text-[#1e5aa8] underline underline-offset-2 hover:text-[#163f77]"
            >
              support@candere.com
            </a>
            .
          </p>

          <div className="pt-2">
            {TERMS_SECTIONS.map((section) => {
              const isOpen = activeSection === section.title;
              return (
                <div key={section.title} className="">
                  <button
                    type="button"
                    onClick={() => setActiveSection(isOpen ? '' : section.title)}
                    className="w-full text-left text-[14px] font-medium text-[#222]"
                  >
                    <span>{section.title}</span>
                  </button>

                  {isOpen ? (
                    <div className="text-[14px] leading-7 text-[#333]">
                      {section.content.map((line, index) => (
                        <p key={`${section.title}-${index}`}>{line}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
