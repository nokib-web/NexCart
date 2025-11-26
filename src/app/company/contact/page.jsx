export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-10">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          We would love to hear from you. Reach out anytime.
        </p>

        {/* Grid layout */}
        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Left side (form UI only) */}
          <div className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full rounded-xl"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full rounded-xl"
            />

            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full h-32 rounded-xl"
            />

            <button className="btn w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 rounded-xl shadow-lg hover:opacity-90">
              Send Message
            </button>
          </div>

          {/* Right side (contact info card) */}
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-8 shadow-inner flex flex-col justify-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Get In Touch</h2>

            <p className="text-gray-700">
              Our support team is available 24/7 to help you.
            </p>

            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-gray-600">support@nexcart.com</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800">Phone</p>
              <p className="text-gray-600">+880 1234 567 890</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800">Address</p>
              <p className="text-gray-600">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
