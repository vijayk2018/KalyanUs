import {useState} from 'react';
import {Link} from 'react-router';
import type {Route} from './+types/privacy-policy';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Privacy Policy'}];
};

type PrivacySection = {
  title: string;
  content: string[];
};

const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: 'Enjoy secure shopping',
    content: [
      'We use encryption technology, digital certificates, secure commerce servers, and authentication to ensure that your personal information is secure online.',
    ],
  },
  {
    title: 'Information collection and use',
    content: [
      'We collect and store any information that you may enter on any of our websites or provide to us in some other way. For example, when you place an order and/or sign-up for email communications and updates, we collect and store personal information so that we may provide the products and services that you have ordered or requested. Such information may include your name, address, age, date of birth, gender, education level, email address, telephone and fax numbers, credit card information and information about your interests and activities. You can choose not to provide certain types of information, but that may result in you being unable to use certain features of our website. We may also collect and store information about other people that you provide to us. For example, you may submit a person\'s name and address if you wish us to ship a product as a gift to a friend.',
      '"You agree and consent to receive all communications at the mobile number provided, even if this mobile number is registered under DND/NCPR list under TRAI regulations"',
      "We may also automatically collect and store certain types of non-personally identifiable information whenever you visit any of our web pages. For example, like most commercial shopping websites, we use 'cookies' and we obtain certain types of information whenever your web browser accesses Candere.com. Such information may include the type of web browser you are using, the operating system of your computer and the domain name of your internet service provider. Most browsers accept cookies automatically but allow you to disable them. We recommend that you leave cookies 'turned on' so that we can offer you a better shopping experience. Utilities are available from third parties to help you visit websites anonymously, but the use of such utilities may also prevent us from providing you with the best shopping experience at Candere.",
      'All personal information that we collect from our customers is used to improve our relevance to you and to improve your shopping experience with us.',
      'We use the information that you provide so that we may deliver the products and services that you have ordered or requested. In addition, we may send you (via email or other means) offerings of products or services which we think may be of interest to you or we may ask you to participate in activities such as special surveys. At any time, you can choose to no longer receive any non-transactional emails from Candere by accessing http://www.candere.com/remove and entering the email address to which the email was originally addressed. You may also unsubscribe from other campaigns that you have previously opted to receive by following the instructions on the bottom of the specific campaign.',
      'We will not share the personal information which you provide to us except (i) for the purposes that you provided it to us, (ii) with your prior consent, (iii) as may be required by law as we reasonably deem necessary to protect Candere or others from injury or loss, or (iv) with other persons or entities with whom we contract to provide services in connection with our website or other business activities. If we do share such personal information with a third party, we will, to the extent practical, require that the recipient protect that information in a manner consistent with this Privacy Policy. However, we cannot guarantee how such a third party will use personal information.',
      'We sometimes use non-personally identifiable, summary or aggregate information that we collect to improve the design and content of our website and to enable us to further enhance your shopping experience with Candere. We may also share such aggregate information with third parties for that purpose.',
      'The personal information which you provide to Candere is an asset of the company and may be included in the assets transferred to an acquirer if Candere is acquired by a third party. In the event of such a transfer, any personal information transferred shall remain subject to the terms and promises contained in this Privacy Policy.',
    ],
  },
  {
    title: 'SMS Policy',
    content: [
      "SMS notifications are sent only to those who have subscribed to Candere's newsletters or updates. Subscribers' or customers' information will not be shared elsewhere; we respect your privacy.",
    ],
  },
  {
    title: 'Security',
    content: [
      'At Candere we believe to have in place appropriate procedures to protect the security of personal information transmitted to us or by us. We have designed our web site to encrypt such information during transmission using Secure Sockets Layer software.',
    ],
  },
  {
    title: 'Access to correction',
    content: [
      'Candere gives you access to the personal information that we have collected about you and the ability to correct any errors in such information. For instructions on how to access and/or make corrections to your personal information please contact our offices at +91 22 6106 6262.',
    ],
  },
  {
    title: "Children's privacy",
    content: [
      'Our website is not directed towards children and Candere does not sell products for purchase by children. We do not knowingly collect information from anyone under the age of eighteen.',
    ],
  },
  {
    title: 'Phishing',
    content: [
      "Identity theft and the practice currently known as 'phishing' are of great concern to Platform. Safeguarding information to help protect you from identity theft is a top priority. We do not and will not, at any time, request your credit card information or national identification numbers in a non-secure or unsolicited e-mail or telephone communication.",
    ],
  },
  {
    title: 'Changes in privacy policy',
    content: [
      'From time to time we may update this Privacy Policy. Your continued subscription to our services constitutes an acceptance of the then-current Privacy Policy and Terms of Use so we encourage you to visit this page periodically to review any changes.',
    ],
  },
  {
    title: 'Terms of use, Notices and Revisions',
    content: [
      'If you visit Candere website, your visit and any dispute concerning privacy will be subject to this Privacy Notice and our Terms of Use. Our business continues to develop and evolve and this Privacy Notice and our Terms of Use will accordingly change from time to time.',
      'We may send you reminders of our privacy policies and terms from time to time, by email or otherwise, unless you have told us not to do so. However, you should check our website from time to time to inform yourself of any changes. The form of our Privacy Policy in effect from time to time will apply to all information that we have collected.',
    ],
  },
  {
    title: 'Contact us',
    content: [
      'If you have any questions about this Privacy Policy, you can contact us via the links at the bottom of the page.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState(PRIVACY_SECTIONS[0]?.title ?? '');

  return (
    <div className="min-h-screen bg-white pb-16 pt-6 font-sans text-[#222]">
      <div className="mx-auto w-[90%] max-w-[1200px]">
        <div className="mb-6 text-[12px] text-[#666]">
          <Link to="/" className="text-[#555] hover:underline">
            Home
          </Link>
          <span className="mx-2">{'>'}</span>
          <span className="text-[#222]">Privacy Policy</span>
        </div>

        <h1 className="mb-8 text-center text-[42px] font-normal text-[#2a2a2a]">
          Privacy Policy
        </h1>

        <div className="space-y-4 text-[14px] leading-7 text-[#333]">
          <p>
            Thank you for visiting Candere.com. Candere respects your privacy and we
            understand and share your concern about the privacy of your personal
            information. This notice describes our privacy policies. By visiting Candere
            website, you are confirming your agreement to the privacy policies described
            in this Privacy Policy, if you do not agree to these terms, exit this page
            and not access or use the website.
          </p>

          <div className="pt-2">
            {PRIVACY_SECTIONS.map((section) => {
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
