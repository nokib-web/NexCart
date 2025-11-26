"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-neutral-100 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-orange-200/50 p-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary">Terms & Conditions</h1>
          <p className="text-neutral-600 mt-2">
            Please read our terms carefully before using Nexcart.
          </p>

          {/* Decorative Line */}
          <div className="mt-4 w-24 mx-auto h-1 bg-linear-to-r from-orange-400 to-amber-500 rounded-full"></div>
        </div>

        {/* Content Section */}
        <div className="space-y-10 text-neutral-700 leading-relaxed">

          <section className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Nexcart, you agree to be bound by these Terms & Conditions. 
              If you do not agree, please stop using our platform immediately.
            </p>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-3">2. Use of Our Service</h2>
            <p>
              You agree to use Nexcart only for lawful purposes. Any misuse, abusive behavior, 
              or attempt to harm the service may result in restricted access.
            </p>
          </section>

          <section className="bg-orange-100 border border-orange-300 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-3">3. Accounts & Security</h2>
            <p>
              You are responsible for maintaining the confidentiality of your login credentials. 
              Nexcart will not be liable for unauthorized access caused by your actions.
            </p>
          </section>

          <section className="bg-amber-100 border border-amber-300 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-3">4. Product Information</h2>
            <p>
              We aim to ensure that product details are accurate, but occasional errors may occur. 
              Prices, availability, and descriptions may change without notice.
            </p>
          </section>

          <section className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-3">5. Limitations of Liability</h2>
            <p>
              Nexcart is not responsible for any indirect, incidental, or consequential damages 
              resulting from the use of our platform.
            </p>
          </section>

          <section className="bg-neutral-100 border border-neutral-300 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-3">6. Modifications</h2>
            <p>
              Nexcart reserves the right to modify or update these terms at any time. 
              Your continued use of the service indicates acceptance of the new terms.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-neutral-500 text-sm">
          Last updated: November 2025  
        </div>

      </div>
    </div>
  );
}
