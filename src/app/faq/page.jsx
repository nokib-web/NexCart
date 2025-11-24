"use client";

import { useState } from "react";
import { ChevronDown, Mail, HelpCircle } from "lucide-react";

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            category: "General Information",
            subtitle: "Everything you need to know about NexCart",
            icon: <HelpCircle className="w-6 h-6" />,
            items: [
                {
                    q: "What is NexCart?",
                    a: "NexCart is a premium eCommerce destination offering curated clothing, accessories, and lifestyle products. We focus on quality, style, and a seamless shopping experience with fast delivery and secure payments."
                },
                {
                    q: "Do I need an account to shop?",
                    a: "Yes. An account is required to place orders, track shipments, manage wishlists, and access exclusive member benefits. We use Clerk for secure, hassle-free authentication."
                },
                {
                    q: "Where do you ship?",
                    a: "We currently ship to all major cities and regions nationwide. International shipping is coming in Q1 2026."
                },
            ]
        },
        {
            category: "Orders & Shipping",
            subtitle: "Placing and receiving your orders",
            icon: <Package className="w-6 h-6" />,
            items: [
                {
                    q: "How do I place an order?",
                    a: "Browse products → Select size/color → Click 'Add to Cart' → Review cart → Proceed to secure checkout and complete payment."
                },
                {
                    q: "Can I modify or cancel my order?",
                    a: "You can cancel or modify your order within 60 minutes of placement. After that, it enters processing and cannot be changed."
                },
                {
                    q: "How long does delivery take?",
                    a: "Standard delivery: 3–5 business days. Express delivery (1–2 days) is available at checkout in supported areas."
                },
            ]
        },
        {
            category: "Payments & Security",
            subtitle: "Safe and flexible payment options",
            icon: <Shield className="w-6 h-6" />,
            items: [
                {
                    q: "What payment methods are accepted?",
                    a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), digital wallets, and secure bank transfers via trusted gateways."
                },
                {
                    q: "Is my payment information secure?",
                    a: "Yes. All transactions are encrypted with 256-bit SSL. We never store your full card details — payments are processed through PCI DSS-compliant providers."
                },
                {
                    q: "Will I receive an invoice?",
                    a: "Absolutely. A detailed digital invoice is automatically emailed upon successful payment and available in your account."
                },
            ]
        },
        {
            category: "Returns & Refunds",
            subtitle: "Hassle-free return policy",
            icon: <RefreshCw className="w-6 h-6" />,
            items: [
                {
                    q: "What is your return policy?",
                    a: "We offer a 7-day return window from the date of delivery. Items must be unused, unwashed, and in original packaging with tags attached."
                },
                {
                    q: "How do I initiate a return?",
                    a: "Log in → Go to 'My Orders' → Select the order → Click 'Return Item' → Follow the guided process. We’ll arrange pickup or provide a drop-off address."
                },
                {
                    q: "When will I get my refund?",
                    a: "Refunds are processed within 3–5 business days after we receive and inspect the returned item. You’ll be notified via email."
                },
            ]
        },
    ];

    return (
        <section className="bg-gray-50 py-24">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Find quick answers to common questions about shopping, shipping, payments, and returns.
                    </p>
                </div>

                {/* FAQ Accordion Groups */}
                <div className="space-y-12">
                    {faqs.map((group, groupIdx) => (
                        <div key={groupIdx} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-linear-to-r from-orange-500 to-amber-500 p-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur">
                                        {group.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{group.category}</h3>
                                        <p className="text-orange-50">{group.subtitle}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {group.items.map((faq, idx) => {
                                    const faqIndex = `${groupIdx}-${idx}`;
                                    const isOpen = openIndex === faqIndex;

                                    return (
                                        <div key={idx} className="bg-white">
                                            <button
                                                onClick={() => toggleFaq(faqIndex)}
                                                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-orange-50 transition group"
                                            >
                                                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 pr-8">
                                                    {faq.q}
                                                </h4>
                                                <ChevronDown
                                                    className={`w-6 h-6 text-orange-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>

                                            <div
                                                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"
                                                    }`}
                                            >
                                                <div className="px-8 pb-6 pt-2">
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-20 text-center bg-linear-to-r from-orange-500 to-amber-400 text-white p-12 rounded-3xl shadow-2xl">
                    <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
                    <p className="text-xl mb-8 text-orange-100">
                        Our support team is here to help you 24/7
                    </p>
                    <a
                        href="mailto:nexcart@gmail.com"
                        className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition shadow-lg"
                    >
                        <Mail className="w-6 h-6" />
                        Email Us: nexcart.support@gmail.com
                    </a>
                </div>
            </div>
        </section>
    );
}

// Simple icons (you can replace with lucide-react imports)
function Package({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-1.5-1.5m-13 0L4 7m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0l-8 4m0 0l-8-4m8 4v10" />
        </svg>
    );
}

function Shield({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    );
}

function RefreshCw({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5m10 10v-5h-5m-9-7l4 4 4-4m2 12l-4-4-4 4" />
        </svg>
    );
}